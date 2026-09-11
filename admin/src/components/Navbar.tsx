import React from 'react'
import { Bell, Search, ShieldCheck, Sparkles } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#07090e]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tenant orgs, WABA IDs, or subscription tiers..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Model 1: Direct Meta Billing (0% Markup)</span>
        </div>

        <button className="h-9 w-9 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors relative">
          <Bell className="h-4 w-4" />
          <span className="h-2 w-2 rounded-full bg-emerald-400 absolute top-2 right-2 ring-2 ring-[#07090e]" />
        </button>
      </div>
    </header>
  )
}
