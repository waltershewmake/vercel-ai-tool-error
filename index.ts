import { generateText, tool } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

generateText({
  model: ollama('llama3.1'),
  maxToolRoundtrips: 5,
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }: { location: string }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  prompt: 'What is thse weather in San Francisco?',
}).then((res) => {
  console.log(res.text);
});
