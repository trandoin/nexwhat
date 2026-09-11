import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Layers,
  ShieldAlert,
  MessageSquare,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CreditCard
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuth()

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/organizations', label: 'Customer Orgs', icon: Building2 },
    { to: '/plans', label: 'Plan Management', icon: Layers },
    { to: '/permissions', label: 'Permission Matrix', icon: ShieldAlert }
  ]

  return (
    <aside className="w-64 bg-[#090b11] border-r border-white/[0.08] flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="h-full w-full bg-[#0d111c] rounded-[11px] flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">NexWhat</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SaaS
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block font-medium">Super Admin Portal</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Platform Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-300 border-l-2 border-emerald-400 shadow-md shadow-emerald-950/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          External Quick Links
        </div>

        <a
          href="https://nexwhat.vegitofresh.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <span className="flex items-center gap-2">
            <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
            NexWhat Live App
          </span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>

        <a
          href="https://business.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            Meta Business Manager
          </span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-white/[0.06] bg-[#07080d]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-emerald-400 font-mono truncate">{user?.role || 'super_admin'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
