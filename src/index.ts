import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

app.use(cors());
app.use(express.json());

interface BotConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

const bots: BotConfig[] = [
  {
    id: "bot-neralu",
    name: "Neralu Assistant",
    description: "Answers queries about Neralu Farms and managed farmland.",
    systemPrompt:
      "You are a warm, clear, professional assistant for Neralu Farms. Use simple English, be polite, slightly friendly, and explain things confidently."
  },
  {
    id: "bot-mandovi",
    name: "Mandovi Service Bot",
    description: "Helps customers with car service queries for Mandovi Motors.",
    systemPrompt:
      "You are a helpful service advisor. Answer step-by-step in simple English with a human tone."
  },
  {
    id: "bot-paaras",
    name: "Paaras Grocery Helper",
    description:
      "Helps users with Indian grocery questions and product suggestions.",
    systemPrompt:
      "You help users pick Indian groceries and answer questions about products. Keep answers friendly and crisp."
  }
];

// Health check
app.get("/", (_req, res) => {
  res.send("AdvitoChatBot server is running.");
});

// List all bots
app.get("/api/bots", (_req, res) => {
  res.json(bots);
});

// Update a bot
app.put("/api/bots/:id", (req, res) => {
  const { id } = req.params;
  const index = bots.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ error: "Bot not found" });

  const { name, description, systemPrompt } = req.body as Partial<BotConfig>;
  bots[index] = {
    ...bots[index],
    ...(name && { name }),
    ...(description && { description }),
    ...(systemPrompt && { systemPrompt })
  };

  res.json(bots[index]);
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { botId, messages } = req.body as {
    botId: string;
    messages: { role: "user" | "assistant"; content: string }[];
  };

  const bot = bots.find((b) => b.id === botId);
  if (!bot) return res.status(400).json({ error: "Invalid botId" });

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: bot.systemPrompt }, ...messages],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      openaiRes.data.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response right now.";

    res.json({ reply });
  } catch (err: any) {
    console.error("OpenAI error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: "Failed to generate reply. Please try again later." });
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
