import { askQuestion } from "./app/chains/chain";
import { env } from "./app/utils/env";

void env.GEMINI_API_KEY; // Ensure loaded

async function main() {
  const question = process.argv[2];
  if (!question) {
    console.log("Usage: npm start -- 'Your question?'");
    process.exit(1);
  }

  try {
    console.log(" Thinking with Gemini...\n");
    const response = await askQuestion({ question });
    console.log(" Answer:", response.answer);
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();