export interface User {
  id: string
  email: string
  name: string
  role: string
  is_super_admin: boolean
  organization_id: string
}

export interface Organization {
  id: string
  name: string
  slug?: string
  status: 'active' | 'suspended' | 'trial'
  plan_tier: 'starter' | 'growth' | 'pro'
  created_at: string
  members_count?: number
  contacts_count?: number
  messages_sent?: number
  phone_numbers_count?: number
  waba_id?: string
  phone_number_id?: string
}

export interface SubscriptionPlan {
  id: 'starter' | 'growth' | 'pro'
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  popular?: boolean
  limits: {
    phoneNumbers: number
    contacts: number
    agentSeats: number
    conversationsPerMonth: number
  }
  features: {
    name: string
    included: boolean
  }[]
}

export interface PermissionRule {
  resource: string
  description: string
  read: boolean
  write: boolean
  delete: boolean
  roles: ('super_admin' | 'admin' | 'manager' | 'agent')[]
}
