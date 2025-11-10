import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../utils/env"
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts"; 
import { Answer, Question } from '../interface/interface';

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  temperature: 0.3,
  apiKey: env.GEMINI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful, accurate, and concise assistant. Answer the user's question directly in clear language."],
  ["human", "{question}"],
]);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

export async function askQuestion(input: Question): Promise<Answer> {
  if (!input.question.trim()) {
    throw new Error("Question cannot be empty");
  }

  try {
    const answer = await chain.invoke({
      question: input.question.trim(),
    });

    return {
      answer: answer.trim(),
    };
  } catch (error) {
    console.error("Gemini QA Chain Error:", error);
    throw new Error(`Failed to generate answer: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}