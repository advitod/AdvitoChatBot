import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-advitoBg text-slate-50">
      <header className="border-b border-slate-800 bg-advitoBg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-advitoAccent/15 text-advitoAccent text-lg font-bold">
              A
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                AdvitoChatBot Studio
              </div>
              <div className="text-xs text-slate-400">
                Multi-assistant AI platform by Advito Global
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            Powered by OpenAI • Internal MVP
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-4">{children}</main>
    </div>
  );
};

export default Layout;
