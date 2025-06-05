# Migrating AI Chat to REST API ("Second Brain")

## Overview

This document describes the changes required to migrate the chat UI from direct AI provider/SDK usage to a REST API that acts as the "second brain" for all chat interactions.

---

## 1. How AI Interactions Currently Work

- The UI uses the `useChat` hook from `@ai-sdk/react` to manage chat state, message submission, and streaming responses.
- When a user sends a message, the UI (via `useChat`) sends a request to a Next.js API route (`/api/chat`), which interacts with the AI provider (e.g., OpenAI) and streams the response back to the UI.
- The UI renders messages as they stream in, showing a loading indicator (`ThinkingMessage`) while waiting for a response.

---

## 2. Switching to a REST API ("Second Brain")

You want to replace the AI provider logic with a REST API endpoint that:
- Accepts a chat request (user message, chat context, etc.)
- Returns a response (assistant message)
- Optionally, does not stream (returns the full response at once)

### REST API Contract Example

**Endpoint:** `POST /api/second-brain/chat`

**Request Body:**
```json
{
  "id": "chat-uuid",
  "message": {
    "id": "message-uuid",
    "createdAt": "2024-06-01T12:00:00Z",
    "role": "user",
    "content": "Hello, how are you?",
    "parts": [{ "type": "text", "text": "Hello, how are you?" }]
  },
  "selectedChatModel": "chat-model",
  "selectedVisibilityType": "private"
}
```

**Response Body:**
```json
{
  "id": "assistant-message-uuid",
  "role": "assistant",
  "createdAt": "2024-06-01T12:00:01Z",
  "parts": [{ "type": "text", "text": "I'm good, how can I help you today?" }]
}
```

---

## 3. UI Changes Required

### A. Replace `useChat` with Custom Hook or Logic
- **Current:** `useChat` manages state, streaming, and message submission.
- **New:** Write a custom hook (e.g., `useRestChat`) or inline logic that:
  - Manages chat state (`messages`, `input`, etc.)
  - On submit, sends a POST request to your REST API endpoint
  - Updates the UI with the assistant's response when received

**Example:**
```ts
async function sendMessageToRestAPI(message, chatId, model, visibility) {
  const response = await fetch('/api/second-brain/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: chatId,
      message,
      selectedChatModel: model,
      selectedVisibilityType: visibility,
    }),
  });
  if (!response.ok) throw new Error('API error');
  return await response.json();
}
```
- Replace all usages of `useChat` in `components/chat.tsx` and related files with this new logic.

### B. Message Submission
- In your input component (e.g., `MultimodalInput`), replace `handleSubmit` and `append` with a function that:
  1. Adds the user message to the local state
  2. Calls the REST API
  3. Adds the assistant's response to the local state

### C. Loading State
- When waiting for a response, show the `ThinkingMessage` component.
- Once the response is received, replace the loading indicator with the assistant's message.

### D. Remove/Adapt Streaming Logic
- If your REST API does **not** stream, you can remove all streaming-related logic and state.
- Only show a loading indicator while waiting for the full response.

---

## 4. Backend Changes (API "Second Brain")
- Implement a REST API endpoint that accepts the above request and returns a response in the specified format.
- The endpoint should encapsulate all model/tool logic, so the UI is agnostic to model changes.

---

## 5. Artifacts and Tool Calls
- If your chat UI supports tool calls (e.g., document creation, weather), your REST API should handle these and return the appropriate message parts.
- The UI should simply render whatever is returned in the `parts` array of the assistant's message.

---

## 6. Summary Table of Required Changes

| Area                | Current Approach                | New Approach (REST API)                |
|---------------------|---------------------------------|----------------------------------------|
| Message Handling    | `useChat` from `@ai-sdk/react`  | Custom hook or logic, fetch to REST API|
| Streaming           | Supported via SDK               | Remove, use loading indicator only     |
| Message Submission  | `handleSubmit`, `append`        | Custom function, POST to REST API      |
| Message Rendering   | `messages` from `useChat`       | Local state, updated from REST API     |
| Tool Calls          | SDK/Provider logic              | REST API handles tool logic            |
| Artifacts           | SDK/Provider logic              | REST API returns artifact messages     |

---

## 7. Example: UI Message Submission Flow (Non-Streaming)

1. User types a message and submits.
2. UI adds the user message to the chat.
3. UI shows `ThinkingMessage` (loading).
4. UI sends POST request to REST API.
5. On response, UI replaces loading indicator with assistant's message.

---

## 8. Checklist for Migration

- [ ] Implement REST API endpoint (`/api/second-brain/chat`)
- [ ] Replace `useChat` with custom state and fetch logic
- [ ] Update message submission to use REST API
- [ ] Remove streaming logic and use loading indicator
- [ ] Ensure tool calls/artifacts are handled by REST API
- [ ] Test chat flow end-to-end

---

## 9. File/Code Changes Summary

- `components/chat.tsx`: Replace `useChat` and related logic
- `components/multimodal-input.tsx`: Update submission logic
- `components/messages.tsx`: No major changes, but ensure it works with new state
- `lib/ai/providers.ts`, `app/(chat)/api/chat/route.ts`: No longer needed for UI, logic moves to REST API
- Add new REST API handler (backend) 