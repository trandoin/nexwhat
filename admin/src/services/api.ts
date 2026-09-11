import axios from 'axios'
import { Organization, SubscriptionPlan } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for token injection
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexwhat_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Default Subscription Plans
export const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 299,
    annualPrice: 239,
    description: 'Perfect for small shops, boutiques, and emerging startups.',
    popular: false,
    limits: {
      phoneNumbers: 1,
      contacts: 2500,
      agentSeats: 2,
      conversationsPerMonth: 5000
    },
    features: [
      { name: '1 WhatsApp Business Number', included: true },
      { name: '2,500 Contacts Storage', included: true },
      { name: '2 Team Agent Seats', included: true },
      { name: 'Broadcast Campaigns & CSV Import', included: true },
      { name: 'Direct Meta Billing (0% Markup)', included: true },
      { name: 'Visual Chatbot Builder', included: false },
      { name: 'Voice Calling & Cloud IVR', included: false },
      { name: 'Dedicated Webhook Endpoints', included: false }
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 599,
    annualPrice: 479,
    description: 'Engineered for scaling D2C, ecommerce, and fast-growing teams.',
    popular: true,
    limits: {
      phoneNumbers: 2,
      contacts: 25000,
      agentSeats: 5,
      conversationsPerMonth: 50000
    },
    features: [
      { name: '2 WhatsApp Business Numbers', included: true },
      { name: '25,000 Contacts Storage', included: true },
      { name: '5 Team Agent Seats', included: true },
      { name: 'Broadcast Campaigns & CSV Import', included: true },
      { name: 'Direct Meta Billing (0% Markup)', included: true },
      { name: 'Visual Chatbot Flow Builder', included: true },
      { name: 'WhatsApp Voice Calling & IVR', included: true },
      { name: 'Dedicated Webhook Endpoints', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Pro Max',
    monthlyPrice: 999,
    annualPrice: 799,
    description: 'Maximum power & scale for enterprise agencies and multi-branch operations.',
    popular: false,
    limits: {
      phoneNumbers: 5,
      contacts: 100000,
      agentSeats: 15,
      conversationsPerMonth: 250000
    },
    features: [
      { name: '5 WhatsApp Business Numbers', included: true },
      { name: 'Unlimited Contacts & Broadcasts', included: true },
      { name: '15 Team Agent Seats', included: true },
      { name: 'Broadcast Campaigns & CSV Import', included: true },
      { name: 'Direct Meta Billing (0% Markup)', included: true },
      { name: 'Visual Chatbot Flow Builder', included: true },
      { name: 'WhatsApp Voice Calling & IVR', included: true },
      { name: 'Dedicated Webhook Endpoints & RBAC Matrix', included: true }
    ]
  }
]

// Seed sample organizations for state management
export const INITIAL_ORGS: Organization[] = [
  {
    id: 'org_nex01',
    name: 'Vegito Fresh Organics',
    slug: 'vegito-fresh',
    status: 'active',
    plan_tier: 'growth',
    created_at: '2026-08-14T10:00:00Z',
    members_count: 4,
    contacts_count: 14200,
    messages_sent: 48920,
    phone_numbers_count: 2,
    waba_id: 'waba_904820194829',
    phone_number_id: 'phone_104829104820'
  },
  {
    id: 'org_nex02',
    name: 'Apex D2C Apparel',
    slug: 'apex-apparel',
    status: 'active',
    plan_tier: 'pro',
    created_at: '2026-08-20T14:30:00Z',
    members_count: 12,
    contacts_count: 68400,
    messages_sent: 194200,
    phone_numbers_count: 4,
    waba_id: 'waba_339104820192',
    phone_number_id: 'phone_778192049102'
  },
  {
    id: 'org_nex03',
    name: 'Urban Luxe Salon',
    slug: 'urban-luxe',
    status: 'trial',
    plan_tier: 'starter',
    created_at: '2026-09-02T09:15:00Z',
    members_count: 2,
    contacts_count: 1840,
    messages_sent: 3200,
    phone_numbers_count: 1,
    waba_id: 'waba_119284019284',
    phone_number_id: 'phone_559281048291'
  },
  {
    id: 'org_nex04',
    name: 'SwiftLogistics India',
    slug: 'swift-logistics',
    status: 'active',
    plan_tier: 'growth',
    created_at: '2026-08-28T16:45:00Z',
    members_count: 5,
    contacts_count: 22100,
    messages_sent: 54100,
    phone_numbers_count: 2,
    waba_id: 'waba_884920184729',
    phone_number_id: 'phone_992810482910'
  },
  {
    id: 'org_nex05',
    name: 'ByteTech Solutions',
    slug: 'bytetech',
    status: 'suspended',
    plan_tier: 'starter',
    created_at: '2026-07-11T12:00:00Z',
    members_count: 1,
    contacts_count: 850,
    messages_sent: 1200,
    phone_numbers_count: 1,
    waba_id: 'waba_773910284019',
    phone_number_id: 'phone_339182049102'
  }
]
