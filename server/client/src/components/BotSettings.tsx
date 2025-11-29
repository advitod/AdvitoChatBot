import React from "react";
import { BotConfig } from "../types";

interface Props {
  bot: BotConfig | null;
  onUpdate: (bot: BotConfig) => void;
}

const BotSettings: React.FC<Props> = ({ bot, onUpdate }) => {
  if (!bot) {
    return (
      <div className="text-xs text-slate-500">
        Select a bot to edit its settings.
      </div>
    );
  }

  const change = (field: keyof BotConfig, value: string) => {
    onUpdate({ ...bot, [field]: value });
  };

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-advitoCard/90 p-3 text-xs">
      <div className="font-semibold text-slate-200">Assistant Settings</div>
      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">Name</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-advitoBg px-2 py-1 text-xs text-slate-100 outline-none focus:border-advitoAccent/60"
          value={bot.name}
          onChange={(e) => change("name", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">Description</label>
        <textarea
          className="h-16 w-full resize-none rounded-md border border-slate-700 bg-advitoBg px-2 py-1 text-xs text-slate-100 outline-none focus:border-advitoAccent/60"
          value={bot.description}
          onChange={(e) => change("description", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="block text-[11px] text-slate-400">
          System Prompt (behavior)
        </label>
        <textarea
          className="h-28 w-full resize-none rounded-md border border-slate-700 bg-advitoBg px-2 py-1 text-[11px] text-slate-100 outline-none focus:border-advitoAccent/60"
          value={bot.systemPrompt}
          onChange={(e) => change("systemPrompt", e.target.value)}
        />
      </div>
      <div className="text-[10px] text-slate-500">
        This prompt controls how the assistant speaks and what it focuses on.
      </div>
    </div>
  );
};

export default BotSettings;
