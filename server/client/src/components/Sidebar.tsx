import React from "react";
import { BotConfig } from "../types";

interface Props {
  bots: BotConfig[];
  selectedBotId: string | null;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<Props> = ({ bots, selectedBotId, onSelect }) => {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-advitoBg/80">
      <div className="px-3 pt-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Assistants
      </div>
      <nav className="space-y-1 px-2 pb-3">
        {bots.map((bot) => {
          const active = bot.id === selectedBotId;
          return (
            <button
              key={bot.id}
              onClick={() => onSelect(bot.id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                active
                  ? "bg-advitoCard text-slate-50"
                  : "bg-transparent text-slate-300 hover:bg-slate-900"
              }`}
            >
              <div className="font-medium">{bot.name}</div>
              <div className="line-clamp-1 text-xs text-slate-500">
                {bot.description}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
