import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

export const usePlansStore = defineStore('plans', () => {
  const plans = ref<SubscriptionPlan[]>(loadInitialPlans())
  const selectedPlanId = ref<'starter' | 'growth' | 'pro'>('growth')
  const billingInterval = ref<'monthly' | 'annual'>('annual')
  const currency = ref<'INR' | 'USD'>('INR')

  function loadInitialPlans(): SubscriptionPlan[] {
    try {
      const saved = localStorage.getItem('nexwhat_plans_config')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PLANS
  }

  function refreshPlans() {
    plans.value = loadInitialPlans()
  }

  const currentActivePlan = computed(() => {
    // Current org plan from localStorage or defaults to 'growth'
    const orgTier = localStorage.getItem('nexwhat_current_org_plan') || 'growth'
    return plans.value.find(p => p.id === orgTier) || plans.value[1] || DEFAULT_PLANS[1]
  })

  function setOrgPlan(planId: 'starter' | 'growth' | 'pro') {
    localStorage.setItem('nexwhat_current_org_plan', planId)
  }

  function getPlanById(id: string) {
    return plans.value.find(p => p.id === id) || plans.value[0]
  }

  return {
    plans,
    selectedPlanId,
    billingInterval,
    currency,
    currentActivePlan,
    refreshPlans,
    setOrgPlan,
    getPlanById
  }
})
