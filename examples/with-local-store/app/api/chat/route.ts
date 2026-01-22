import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

const MODEL_NAME = "whatever";
const provider = createOpenAI({
  baseURL: "http://host.docker.internal:1234/v1", // LM Studio
  apiKey: "whatever",
}).chat;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: provider(MODEL_NAME),
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
