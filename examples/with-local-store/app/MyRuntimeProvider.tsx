"use client";

import {
  AssistantRuntimeProvider,
  useAssistantState,
  // ChatModelAdapter,
  // ThreadHistoryAdapter,
  // useLocalRuntime,
} from "@assistant-ui/react";
import { type ReactNode } from "react";

import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";

function MyHook() {
  const messages = useAssistantState(({ thread }) => thread.messages);
  console.log(messages);
  return null;
}

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
      <MyHook />
    </AssistantRuntimeProvider>
  );
}
