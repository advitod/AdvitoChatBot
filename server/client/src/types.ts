export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

export interface BotConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}
