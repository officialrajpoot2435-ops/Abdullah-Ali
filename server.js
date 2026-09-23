import express from "express";
 dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

app.post("/api/ai", async (req, res) => {
  try {
    if (!client) {
      return res.json({
        reply:
          "AI is not connected yet. Add your OpenAI API key in Render environment variables."
      });
    }

    const { message, test } = req.body;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `
You are EntryPrep AI.

Student test: ${test}

Rules:
- Explain in simple English.
- Help with ECAT, BCAT and MDCAT preparation.
- Make MCQs when asked.
- Give study plans when asked.
- Keep answers short and clear.

Question:
${message}
      `
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error)
