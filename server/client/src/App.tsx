import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import BotSettings from "./components/BotSettings";
import { BotConfig } from "./types";

const API_BASE = "http://localhost:4000";

const App: React.FC = () => {
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBots = async () => {
      const res = await fetch(`${API_BASE}/api/bots`);
      const data = await res.json();
      setBots(data);
      if (data.length && !selectedBotId) setSelectedBotId(data[0].id);
    };
    fetchBots();
  }, [selectedBotId]);

  const selectedBot =
    bots.find((b) => b.id === selectedBotId) ?? bots[0] ?? null;

  const updateBot = async (bot: BotConfig) => {
    setBots((prev) => prev.map((b) => (b.id === bot.id ? bot : b)));
    await fetch(`${API_BASE}/api/bots/${bot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bot)
    });
  };

  return (
    <Layout>
      <div className="mb-4 grid gap-3 rounded-2xl border border-slate-800 bg-gradient-to-br from-advitoBg via-advitoBg to-slate-900 px-4 py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-50">
            AdvitoChatBot Studio
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Build, test and manage AI assistants for your clients in one place.
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0 md:justify-end">
          <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300">
            💬 Multi-assistant workspace
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300">
            ⚙️ Custom system prompts
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300">
            🧠 OpenAI powered
          </span>
        </div>
      </div>

      <div className="flex h-[70vh] rounded-2xl border border-slate-800 bg-advitoBg/80">
        <Sidebar
          bots={bots}
          selectedBotId={selectedBot?.id ?? null}
          onSelect={setSelectedBotId}
        />
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex-1 border-b border-slate-800 md:border-b-0 md:border-r">
            <ChatWindow bot={selectedBot ?? null} />
          </div>
          <div className="w-full shrink-0 border-t border-slate-800 bg-advitoBg/90 p-3 md:w-80 md:border-t-0">
            <BotSettings bot={selectedBot ?? null} onUpdate={updateBot} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
