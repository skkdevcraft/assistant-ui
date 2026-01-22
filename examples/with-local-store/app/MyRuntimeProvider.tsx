"use client";

import {
  AssistantRuntimeProvider,
  ChatModelAdapter,
  ThreadHistoryAdapter,
  useLocalRuntime,
} from "@assistant-ui/react";
import type { ReactNode } from "react";

import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";

const MyModelAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    // TODO replace with your own API
    const result = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // forward the messages in the chat to the API
      body: JSON.stringify({
        messages,
      }),
      // if the user hits the "cancel" button or escape keyboard key, cancel the request
      signal: abortSignal,
    });

    const data = await result.json();
    return {
      content: [
        {
          type: "text",
          text: data.text,
        },
      ],
    };
  },
};

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const historyAdapter: ThreadHistoryAdapter = {
    async load() {
      debugger;
      return { messages: [] };
    },

    async append(message) {
      debugger;
      console.log(message);
    },
  };

  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  // debugger;
  // const runtime = useLocalRuntime(MyModelAdapter, {
  //   adapters: { history: historyAdapter },
  // });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
