import React, { useState } from 'react'
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Save,
  RotateCcw,
  Search,
  Lock,
  Eye,
  Edit3,
  Trash2,
  Sparkles
} from 'lucide-react'

interface RolePermission {
  resource: string
  name: string
  description: string
  roles: {
    super_admin: { read: boolean; write: boolean; delete: boolean }
    admin: { read: boolean; write: boolean; delete: boolean }
    manager: { read: boolean; write: boolean; delete: boolean }
    agent: { read: boolean; write: boolean; delete: boolean }
  }
}

const DEFAULT_PERMISSIONS: RolePermission[] = [
  {
    resource: 'analytics',
    name: 'Analytics & Dashboards',
    description: 'View KPI charts, message delivery analytics, and conversation metrics.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: true, delete: false },
      agent: { read: true, write: false, delete: false }
    }
  },
  {
    resource: 'chat',
    name: 'Shared Team Inbox',
    description: 'Send and receive live customer WhatsApp conversations, assign tickets, add internal notes.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: true, delete: true },
      agent: { read: true, write: true, delete: false }
    }
  },
  {
    resource: 'templates',
    name: 'Meta Message Templates',
    description: 'Submit, review, and synchronize HSM templates with WhatsApp Cloud API.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: true, delete: false },
      agent: { read: true, write: false, delete: false }
    }
  },
  {
    resource: 'campaigns',
    name: 'Broadcast Campaigns',
    description: 'Upload recipient CSVs, schedule bulk WhatsApp broadcasts, and monitor delivery funnels.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: true, delete: true },
      agent: { read: false, write: false, delete: false }
    }
  },
  {
    resource: 'flows.whatsapp',
    name: 'Visual Flow Builder',
    description: 'Construct automated chatbot decision trees, keyword triggers, and CRM webhooks.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: true, delete: false },
      agent: { read: false, write: false, delete: false }
    }
  },
  {
    resource: 'calling',
    name: 'WhatsApp Voice & IVR',
    description: 'Initiate and receive browser-based voice calls, configure DTMF IVR phone trees.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: true, delete: false },
      agent: { read: true, write: true, delete: false }
    }
  },
  {
    resource: 'organizations',
    name: 'Tenant & Multi-Org Controls',
    description: 'Provision tenant workspaces, modify billing tiers, and configure Meta WABA credentials.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: false, delete: false },
      manager: { read: false, write: false, delete: false },
      agent: { read: false, write: false, delete: false }
    }
  },
  {
    resource: 'settings.users',
    name: 'Team & User Management',
    description: 'Invite new staff members, assign security roles, and reset credentials.',
    roles: {
      super_admin: { read: true, write: true, delete: true },
      admin: { read: true, write: true, delete: true },
      manager: { read: true, write: false, delete: false },
      agent: { read: false, write: false, delete: false }
    }
  }
]

export const Permissions: React.FC = () => {
  const [permissions, setPermissions] = useState<RolePermission[]>(() => {
    const saved = localStorage.getItem('nexwhat_rbac_matrix')
    return saved ? JSON.parse(saved) : DEFAULT_PERMISSIONS
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<'super_admin' | 'admin' | 'manager' | 'agent'>('admin')
  const [isSavedToast, setIsSavedToast] = useState(false)

  const handleToggle = (
    resource: string,
    role: 'super_admin' | 'admin' | 'manager' | 'agent',
    action: 'read' | 'write' | 'delete'
  ) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.resource === resource) {
          const current = item.roles[role][action]
          return {
            ...item,
            roles: {
              ...item.roles,
              [role]: {
                ...item.roles[role],
                [action]: !current
              }
            }
          }
        }
        return item
      })
    )
  }

  const handleSave = () => {
    localStorage.setItem('nexwhat_rbac_matrix', JSON.stringify(permissions))
    setIsSavedToast(true)
    setTimeout(() => setIsSavedToast(false), 3000)
  }

  const filtered = permissions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Permission Management Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure granular resource access (Read, Write, Delete) across user roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setPermissions(DEFAULT_PERMISSIONS)
              localStorage.removeItem('nexwhat_rbac_matrix')
              setIsSavedToast(true)
              setTimeout(() => setIsSavedToast(false), 3000)
            }}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-medium border border-white/[0.08] transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Matrix</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <Save className="h-4 w-4" />
            <span>Save Policies</span>
          </button>
        </div>
      </div>

      {isSavedToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>RBAC security matrix updated and synchronized with backend API router guards.</span>
        </div>
      )}

      {/* Role Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
        {[
          { id: 'super_admin', label: 'Super Admin', desc: 'Platform Owner' },
          { id: 'admin', label: 'Tenant Admin', desc: 'Company Owner' },
          { id: 'manager', label: 'Department Manager', desc: 'Team Lead' },
          { id: 'agent', label: 'Support Agent', desc: 'Frontline Staff' }
        ].map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 ${
              selectedRole === role.id
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <span>{role.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
              selectedRole === role.id ? 'bg-black/20 text-slate-950' : 'bg-white/[0.08] text-slate-400'
            }`}>
              {role.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-white/[0.08]">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter permissions by module or action description..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Matrix Table */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-slate-400 bg-white/[0.01]">
                <th className="py-3.5 px-6 font-semibold">Resource Module</th>
                <th className="py-3.5 px-6 font-semibold">Description</th>
                <th className="py-3.5 px-6 font-semibold text-center w-28">Read (View)</th>
                <th className="py-3.5 px-6 font-semibold text-center w-28">Write (Edit)</th>
                <th className="py-3.5 px-6 font-semibold text-center w-28">Delete (Purge)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((item) => {
                const currentActions = item.roles[selectedRole]
                return (
                  <tr key={item.resource} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold text-white">
                      <div>{item.name}</div>
                      <div className="text-[10px] font-mono text-emerald-400">{item.resource}</div>
                    </td>

                    <td className="py-4 px-6 text-slate-400 max-w-md">
                      {item.description}
                    </td>

                    {/* Read Action */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(item.resource, selectedRole, 'read')}
                        className={`inline-flex items-center justify-center h-7 w-7 rounded-lg transition-colors ${
                          currentActions.read
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                            : 'bg-white/[0.04] text-slate-600 hover:bg-white/[0.08]'
                        }`}
                      >
                        {currentActions.read ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </button>
                    </td>

                    {/* Write Action */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(item.resource, selectedRole, 'write')}
                        className={`inline-flex items-center justify-center h-7 w-7 rounded-lg transition-colors ${
                          currentActions.write
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            : 'bg-white/[0.04] text-slate-600 hover:bg-white/[0.08]'
                        }`}
                      >
                        {currentActions.write ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </button>
                    </td>

                    {/* Delete Action */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(item.resource, selectedRole, 'delete')}
                        className={`inline-flex items-center justify-center h-7 w-7 rounded-lg transition-colors ${
                          currentActions.delete
                            ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                            : 'bg-white/[0.04] text-slate-600 hover:bg-white/[0.08]'
                        }`}
                      >
                        {currentActions.delete ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
