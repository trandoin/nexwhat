import React, { useState } from 'react'
import {
  Layers,
  CheckCircle2,
  XCircle,
  Save,
  RotateCcw,
  Sparkles,
  Phone,
  Users,
  MessageSquare,
  Zap,
  ShieldCheck
} from 'lucide-react'
import { SubscriptionPlan } from '../types'
import { DEFAULT_PLANS } from '../services/api'

export const Plans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => {
    const saved = localStorage.getItem('nexwhat_plans_config')
    return saved ? JSON.parse(saved) : DEFAULT_PLANS
  })
  const [isSavedToast, setIsSavedToast] = useState(false)

  // Handle plan field edit
  const handlePriceChange = (planId: string, monthly: number, annual: number) => {
    setPlans(prev =>
      prev.map(p => (p.id === planId ? { ...p, monthlyPrice: monthly, annualPrice: annual } : p))
    )
  }

  const handleLimitChange = (planId: string, field: keyof SubscriptionPlan['limits'], value: number) => {
    setPlans(prev =>
      prev.map(p =>
        p.id === planId ? { ...p, limits: { ...p.limits, [field]: value } } : p
      )
    )
  }

  const handleToggleFeature = (planId: string, featureIdx: number) => {
    setPlans(prev =>
      prev.map(p => {
        if (p.id === planId) {
          const updatedFeatures = [...p.features]
          updatedFeatures[featureIdx] = {
            ...updatedFeatures[featureIdx],
            included: !updatedFeatures[featureIdx].included
          }
          return { ...p, features: updatedFeatures }
        }
        return p
      })
    )
  }

  const handleSave = () => {
    localStorage.setItem('nexwhat_plans_config', JSON.stringify(plans))
    setIsSavedToast(true)
    setTimeout(() => setIsSavedToast(false), 3000)
  }

  const handleResetDefaults = () => {
    setPlans(DEFAULT_PLANS)
    localStorage.removeItem('nexwhat_plans_config')
    setIsSavedToast(true)
    setTimeout(() => setIsSavedToast(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Disruptive SaaS Pricing Architecture</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Subscription Plan Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure monthly & annual subscription tiers, quota dials, and feature entitlements. Capped at ₹999/mo max.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-medium border border-white/[0.08] transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <Save className="h-4 w-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {isSavedToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between shadow-lg shadow-emerald-950/20 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Subscription plans updated successfully! Customer tenant orgs are now aligned with these quotas.</span>
          </div>
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-panel rounded-3xl p-6 sm:p-7 border flex flex-col justify-between relative ${
              plan.popular
                ? 'border-emerald-500/40 shadow-2xl shadow-emerald-500/10 bg-gradient-to-b from-[#101726] to-[#0a0d14]'
                : 'border-white/[0.08]'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                Most Popular Tier
              </div>
            )}

            <div>
              {/* Title & Description */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                  {plan.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6 min-h-[32px]">{plan.description}</p>

              {/* Pricing Controls */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Monthly Price:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-sm">₹</span>
                    <input
                      type="number"
                      value={plan.monthlyPrice}
                      onChange={(e) =>
                        handlePriceChange(plan.id, Number(e.target.value), Math.round(Number(e.target.value) * 0.8))
                      }
                      className="w-20 px-2 py-1 bg-white/[0.06] border border-white/[0.1] rounded-lg text-white font-bold text-right text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-slate-400 text-[11px]">/mo</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Annual (20% Off):</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 text-sm">₹</span>
                    <input
                      type="number"
                      value={plan.annualPrice}
                      onChange={(e) => handlePriceChange(plan.id, plan.monthlyPrice, Number(e.target.value))}
                      className="w-20 px-2 py-1 bg-white/[0.06] border border-white/[0.1] rounded-lg text-emerald-400 font-bold text-right text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-slate-400 text-[11px]">/mo</span>
                  </div>
                </div>
              </div>

              {/* Quota Limits */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tenant Quota Limits</h4>

                <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    WhatsApp Phone Numbers:
                  </span>
                  <input
                    type="number"
                    value={plan.limits.phoneNumbers}
                    onChange={(e) => handleLimitChange(plan.id, 'phoneNumbers', Number(e.target.value))}
                    className="w-16 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white font-semibold text-right text-xs"
                  />
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                    Contacts Allowed:
                  </span>
                  <input
                    type="number"
                    value={plan.limits.contacts}
                    onChange={(e) => handleLimitChange(plan.id, 'contacts', Number(e.target.value))}
                    className="w-20 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white font-semibold text-right text-xs"
                  />
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-purple-400" />
                    Team Agent Seats:
                  </span>
                  <input
                    type="number"
                    value={plan.limits.agentSeats}
                    onChange={(e) => handleLimitChange(plan.id, 'agentSeats', Number(e.target.value))}
                    className="w-16 px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-white font-semibold text-right text-xs"
                  />
                </div>
              </div>

              {/* Feature Entitlement Toggles */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Feature Entitlements</h4>
                {plan.features.map((feature, fIdx) => (
                  <button
                    key={fIdx}
                    type="button"
                    onClick={() => handleToggleFeature(plan.id, fIdx)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-xs transition-colors text-left"
                  >
                    <span className={feature.included ? 'text-slate-200' : 'text-slate-500 line-through'}>
                      {feature.name}
                    </span>
                    {feature.included ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-500 text-center">
              Direct Meta Billing applies to all outbound WhatsApp conversations
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
