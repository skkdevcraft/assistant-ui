"use client";

import {
  AssistantRuntimeProvider,
  ThreadMessage,
  useAssistantState,
  // ChatModelAdapter,
  // ThreadHistoryAdapter,
  // useLocalRuntime,
} from "@assistant-ui/react";
import { useEffect, useRef, type ReactNode } from "react";

import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";

const getCopyText = (message: ThreadMessage) => {
  return message.content
    .map((part) => {
      if ("text" in part && typeof part.text === "string") {
        return part.text;
      }
      return "";
    })
    .join("\n");
};

function MyHook() {
  const idRef = useRef("");

  const messages = useAssistantState(({ thread }) => thread.messages);
  const isRunning = useAssistantState(({ thread }) => thread.isRunning);

  useEffect(() => {
    if (isRunning) {
      return;
    }
    const msgIds = messages.map((m) => m.id).join(";");
    if (idRef.current === msgIds) {
      return;
    }

    idRef.current = msgIds;
    const text = messages.map(getCopyText).join("\n--------\n");
    console.log(text);
  }, [messages, isRunning]);

  return null;
}

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  console.log("---");
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
