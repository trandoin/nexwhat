import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  DollarSign,
  Users,
  Send,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { INITIAL_ORGS, DEFAULT_PLANS } from '../services/api'

export const Dashboard: React.FC = () => {
  // Compute metrics from sample/stored data
  const totalOrgs = INITIAL_ORGS.length
  const activeOrgs = INITIAL_ORGS.filter(o => o.status === 'active').length

  // Calculate MRR based on plans
  const starterCount = INITIAL_ORGS.filter(o => o.plan_tier === 'starter').length
  const growthCount = INITIAL_ORGS.filter(o => o.plan_tier === 'growth').length
  const proCount = INITIAL_ORGS.filter(o => o.plan_tier === 'pro').length

  const mrr = (starterCount * 299) + (growthCount * 599) + (proCount * 999)
  const totalContacts = INITIAL_ORGS.reduce((acc, curr) => acc + (curr.contacts_count || 0), 0)
  const totalMessages = INITIAL_ORGS.reduce((acc, curr) => acc + (curr.messages_sent || 0), 0)

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-[#0d121c] to-teal-950/30 border border-emerald-500/20 overflow-hidden shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Platform Operations & Tenant Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SaaS Multi-Tenant Overview
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Real-time monitoring across customer organizations, subscription MRR, direct Meta Cloud API consumption, and RBAC policies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/organizations"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Manage Tenants</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/plans"
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-xs border border-white/[0.08] transition-all"
            >
              Configure Plans
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Monthly Recurring Revenue (MRR)"
          value={`₹${mrr.toLocaleString('en-IN')}`}
          change="+24% mo/mo"
          trend="up"
          subtitle="Direct SaaS subscription revenue"
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Registered Customer Orgs"
          value={totalOrgs}
          change={`${activeOrgs} Active`}
          trend="up"
          subtitle="1 on 14-day free trial"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Total Managed Contacts"
          value={totalContacts.toLocaleString('en-IN')}
          change="+18.4%"
          trend="up"
          subtitle="Across all customer address books"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="WhatsApp Messages Dispatched"
          value={totalMessages.toLocaleString('en-IN')}
          change="0% markup"
          trend="up"
          subtitle="Meta direct billing volume"
          icon={Send}
          color="amber"
        />
      </div>

      {/* Plan Distribution & Billing Model Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tier Distribution */}
        <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              Subscription Tier Split
            </h3>
            <span className="text-[11px] text-slate-400">Max ₹999/mo</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Starter (₹299/mo)</span>
                <span className="text-emerald-400 font-bold">{starterCount} orgs ({Math.round(starterCount/totalOrgs*100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(starterCount/totalOrgs)*100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Growth (₹599/mo) • Most Popular</span>
                <span className="text-teal-400 font-bold">{growthCount} orgs ({Math.round(growthCount/totalOrgs*100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full" style={{ width: `${(growthCount/totalOrgs)*100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Pro Max (₹999/mo)</span>
                <span className="text-cyan-400 font-bold">{proCount} orgs ({Math.round(proCount/totalOrgs*100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(proCount/totalOrgs)*100}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-slate-400">Annual Billing Discount:</span>
            <span className="text-emerald-400 font-semibold">20% Off Applied</span>
          </div>
        </div>

        {/* Model 1 Direct Meta Billing Card */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                Model 1: Direct Meta Billing Architecture
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                Active Architecture
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              NexWhat charges 100% pure SaaS subscription profit without holding message credits or taking on financial risk. Clients link their credit card inside Meta Business Manager, and Meta charges them directly for WhatsApp conversations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block mb-1">NexWhat Surcharge</span>
                <span className="text-xl font-black text-emerald-400">0%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Zero per-message markup</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block mb-1">Financial Float Risk</span>
                <span className="text-xl font-black text-white">None</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">No pre-paid wallet escrow</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block mb-1">Customer Margins</span>
                <span className="text-xl font-black text-teal-400">100%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Retained as software profit</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs">
            <span className="text-slate-400">Meta Cloud API Quality Rating:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              All Tenant Numbers Healthy (Green Tier)
            </span>
          </div>
        </div>
      </div>

      {/* Recent Customer Organizations Table */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Customer Organizations</h3>
            <p className="text-xs text-slate-400 mt-0.5">Registered tenants actively routing WhatsApp traffic</p>
          </div>
          <Link
            to="/organizations"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All Tenants</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-slate-400 bg-white/[0.01]">
                <th className="py-3.5 px-6 font-semibold">Tenant Organization</th>
                <th className="py-3.5 px-6 font-semibold">Subscription Plan</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Contacts</th>
                <th className="py-3.5 px-6 font-semibold">Messages Sent</th>
                <th className="py-3.5 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {INITIAL_ORGS.map((org) => (
                <tr key={org.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        {org.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{org.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{org.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize font-semibold text-white">
                      {org.plan_tier}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {org.plan_tier === 'starter' ? '₹299/mo' : org.plan_tier === 'growth' ? '₹599/mo' : '₹999/mo'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      org.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : org.status === 'trial'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-medium">
                    {org.contacts_count?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-medium">
                    {org.messages_sent?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to="/organizations"
                      className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
