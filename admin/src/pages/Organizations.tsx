import React, { useState } from 'react'
import {
  Building2,
  Search,
  Filter,
  Plus,
  MoreVertical,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Phone,
  Users,
  MessageSquare,
  AlertTriangle,
  X,
  Copy,
  Sparkles
} from 'lucide-react'
import { Organization } from '../types'
import { INITIAL_ORGS, DEFAULT_PLANS } from '../services/api'

export const Organizations: React.FC = () => {
  const [orgs, setOrgs] = useState<Organization[]>(INITIAL_ORGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [isNewOrgModalOpen, setIsNewOrgModalOpen] = useState(false)
  const [newOrgName, setNewOrgName] = useState('')
  const [newOrgPlan, setNewOrgPlan] = useState<'starter' | 'growth' | 'pro'>('growth')

  // Filter organizations
  const filteredOrgs = orgs.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.waba_id?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || org.status === statusFilter
    const matchesPlan = planFilter === 'all' || org.plan_tier === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  // Handle plan change
  const handlePlanChange = (orgId: string, newPlan: 'starter' | 'growth' | 'pro') => {
    setOrgs((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, plan_tier: newPlan } : o))
    )
    if (selectedOrg && selectedOrg.id === orgId) {
      setSelectedOrg((prev) => (prev ? { ...prev, plan_tier: newPlan } : null))
    }
  }

  // Handle status toggle
  const handleStatusToggle = (orgId: string) => {
    setOrgs((prev) =>
      prev.map((o) => {
        if (o.id === orgId) {
          const nextStatus = o.status === 'active' ? 'suspended' : 'active'
          return { ...o, status: nextStatus }
        }
        return o
      })
    )
    if (selectedOrg && selectedOrg.id === orgId) {
      setSelectedOrg((prev) =>
        prev ? { ...prev, status: prev.status === 'active' ? 'suspended' : 'active' } : null
      )
    }
  }

  // Create new organization
  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newOrgName.trim()) return

    const slug = newOrgName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const newOrg: Organization = {
      id: `org_${Date.now().toString(36)}`,
      name: newOrgName,
      slug,
      status: 'active',
      plan_tier: newOrgPlan,
      created_at: new Date().toISOString(),
      members_count: 1,
      contacts_count: 0,
      messages_sent: 0,
      phone_numbers_count: 1,
      waba_id: `waba_${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      phone_number_id: `phone_${Math.floor(100000000000 + Math.random() * 900000000000)}`
    }

    setOrgs([newOrg, ...orgs])
    setNewOrgName('')
    setIsNewOrgModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Customer Organizations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage registered customer tenants, assign subscription plans, and configure Meta WABA limits.
          </p>
        </div>

        <button
          onClick={() => setIsNewOrgModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Provision Tenant Org</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name, slug, or WABA ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all" className="bg-[#090b11]">All Statuses</option>
            <option value="active" className="bg-[#090b11]">Active</option>
            <option value="trial" className="bg-[#090b11]">Free Trial</option>
            <option value="suspended" className="bg-[#090b11]">Suspended</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-300 focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all" className="bg-[#090b11]">All Plans</option>
            <option value="starter" className="bg-[#090b11]">Starter (₹299)</option>
            <option value="growth" className="bg-[#090b11]">Growth (₹599)</option>
            <option value="pro" className="bg-[#090b11]">Pro Max (₹999)</option>
          </select>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-slate-400 bg-white/[0.01]">
                <th className="py-3.5 px-6 font-semibold">Tenant Organization</th>
                <th className="py-3.5 px-6 font-semibold">Subscription Plan</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Team Seats</th>
                <th className="py-3.5 px-6 font-semibold">WhatsApp Numbers</th>
                <th className="py-3.5 px-6 font-semibold">Contacts</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredOrgs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No customer organizations match your search filters.
                  </td>
                </tr>
              ) : (
                filteredOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                          {org.name[0]}
                        </div>
                        <div>
                          <button
                            onClick={() => setSelectedOrg(org)}
                            className="font-bold text-white hover:text-emerald-400 text-left transition-colors"
                          >
                            {org.name}
                          </button>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <span>ID: {org.id}</span>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{org.waba_id || 'Meta WABA Pending'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={org.plan_tier}
                        onChange={(e) => handlePlanChange(org.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        <option value="starter" className="bg-[#090b11]">Starter • ₹299</option>
                        <option value="growth" className="bg-[#090b11]">Growth • ₹599</option>
                        <option value="pro" className="bg-[#090b11]">Pro Max • ₹999</option>
                      </select>
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
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        <span>{org.members_count || 1} Agents</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{org.phone_numbers_count || 1} WABA Line</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-300 font-medium">
                      {org.contacts_count?.toLocaleString('en-IN')}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrg(org)}
                          className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => handleStatusToggle(org.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            org.status === 'active'
                              ? 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                          }`}
                        >
                          {org.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Details Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/[0.1] shadow-2xl relative">
            <button
              onClick={() => setSelectedOrg(null)}
              className="absolute top-6 right-6 h-8 w-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                {selectedOrg.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedOrg.name}</h3>
                <p className="text-xs text-slate-400">Tenant Slug: {selectedOrg.slug} • ID: {selectedOrg.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block mb-1">Plan Tier</span>
                <span className="capitalize font-bold text-emerald-400 text-sm">{selectedOrg.plan_tier}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block mb-1">Status</span>
                <span className="capitalize font-bold text-white text-sm">{selectedOrg.status}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block mb-1">Contacts</span>
                <span className="font-bold text-white text-sm">{selectedOrg.contacts_count?.toLocaleString()}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block mb-1">Messages</span>
                <span className="font-bold text-white text-sm">{selectedOrg.messages_sent?.toLocaleString()}</span>
              </div>
            </div>

            {/* Meta Cloud Details */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4 space-y-2.5 text-xs">
              <h4 className="font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Meta Cloud API Linkage
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  Official WABA
                </span>
              </h4>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Meta WABA ID:</span>
                <span className="font-mono text-slate-200">{selectedOrg.waba_id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Phone Number ID:</span>
                <span className="font-mono text-slate-200">{selectedOrg.phone_number_id}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Direct Meta Billing:</span>
                <span className="text-emerald-400 font-semibold">Active (Client Pays Meta Directly)</span>
              </div>
            </div>

            {/* Assisted Number Provisioning & Green Tick Panel */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-teal-950/20 border border-emerald-500/20 mb-6 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  Assisted Concierge Linking for Tenant
                </span>
                <span className="text-[10px] text-teal-400 font-semibold">Done-For-You Mode</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Help this customer link their WhatsApp number without requiring them to use Facebook developer tools.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => alert(`Generated 1-Click WhatsApp linking magic link for ${selectedOrg.name}: https://nexwhat.vegitofresh.com/onboarding?token=tkn_${selectedOrg.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-semibold text-xs border border-emerald-500/30 transition-colors flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  Generate 1-Click Setup Link
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Official Green Tick verification request initiated with Meta for ${selectedOrg.name}!`)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs border border-white/[0.08] transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  Request Green Tick Verification
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => handleStatusToggle(selectedOrg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  selectedOrg.status === 'active'
                    ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                }`}
              >
                {selectedOrg.status === 'active' ? 'Suspend Organization' : 'Restore Organization'}
              </button>

              <button
                onClick={() => setSelectedOrg(null)}
                className="px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provision New Organization Modal */}
      {isNewOrgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/[0.1] shadow-2xl relative">
            <button
              onClick={() => setIsNewOrgModalOpen(false)}
              className="absolute top-6 right-6 h-8 w-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-2">Provision Tenant Organization</h3>
            <p className="text-xs text-slate-400 mb-6">
              Create a new customer workspace with seeded role permissions.
            </p>

            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="e.g. Acme Ecommerce Ltd"
                  className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Assigned Subscription Plan
                </label>
                <select
                  value={newOrgPlan}
                  onChange={(e) => setNewOrgPlan(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="starter" className="bg-[#090b11]">Starter • ₹299 / month</option>
                  <option value="growth" className="bg-[#090b11]">Growth • ₹599 / month (Recommended)</option>
                  <option value="pro" className="bg-[#090b11]">Pro Max • ₹999 / month (Enterprise)</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewOrgModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                >
                  Provision Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
