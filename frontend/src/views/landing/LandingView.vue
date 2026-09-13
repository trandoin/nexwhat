<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import { usePlansStore } from '@/stores/plans'
import {
  MessageSquare,
  Sparkles,
  Zap,
  Users,
  Send,
  Bot,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Percent,
  DollarSign,
  ChevronDown,
  Globe,
  ExternalLink
} from 'lucide-vue-next'

const router = useRouter()
const plansStore = usePlansStore()

onMounted(() => {
  plansStore.refreshPlans()
})

// Pricing Billing Cycle & Currency Toggle
const isAnnual = ref(true)
const currency = ref<'INR' | 'USD'>('INR')

function getPlanPrice(plan: any) {
  const isUsd = currency.value === 'USD'
  const inrPrice = isAnnual.value ? plan.annualPrice : plan.monthlyPrice
  if (isUsd) {
    return (inrPrice / 75).toFixed(1)
  }
  return inrPrice
}

// Interactive ROI Calculator State
const contactCount = ref(15000)
const messagesPerMonth = ref(45000)

// Cost calculations based on average industry rates (Meta direct vs Markup SaaS)
const competitorCost = computed(() => {
  // Typical Wati / AiSensy plan + conversation surcharge
  const basePlan = 5500
  const markupPerMessage = 0.18 // 18 paise markup per conversation
  return Math.round(basePlan + (messagesPerMonth.value * markupPerMessage))
})

const nexwhatCost = computed(() => {
  // NexWhat fixed subscription (Growth tier) + direct Meta (zero markup)
  const basePlan = isAnnual.value ? 479 : 599
  return basePlan
})

const monthlySavings = computed(() => {
  const competitorMarkupOnly = Math.round(messagesPerMonth.value * 0.18) + (3500 - (isAnnual.value ? 479 : 599))
  return Math.max(0, competitorMarkupOnly)
})

const annualSavings = computed(() => monthlySavings.value * 12)

// Interactive WhatsApp Simulator State
type ChatMsg = {
  id: number
  sender: 'user' | 'bot'
  text: string
  time: string
  buttons?: string[]
}

const chatMessages = ref<ChatMsg[]>([
  {
    id: 1,
    sender: 'user',
    text: 'Hi! I want to check my order status #NX-8942 📦',
    time: '10:42 AM'
  },
  {
    id: 2,
    sender: 'bot',
    text: 'Hello Rahul! 👋 Your order #NX-8942 is out for delivery with our courier partner. Expected arrival by 4:00 PM today.',
    time: '10:42 AM',
    buttons: ['Track Live Location', 'Modify Delivery Time', 'Talk to Agent']
  }
])

const activeSimButton = ref<string | null>(null)

const handleSimButtonClick = (btn: string) => {
  activeSimButton.value = btn
  chatMessages.value.push({
    id: Date.now(),
    sender: 'user',
    text: btn,
    time: '10:43 AM'
  })

  setTimeout(() => {
    if (btn === 'Track Live Location') {
      chatMessages.value.push({
        id: Date.now() + 1,
        sender: 'bot',
        text: '📍 Delivery Partner: Rajesh Kumar (+91 98765 43210) is 2.4 km away from your location.',
        time: '10:43 AM'
      })
    } else if (btn === 'Modify Delivery Time') {
      chatMessages.value.push({
        id: Date.now() + 1,
        sender: 'bot',
        text: '⏰ No problem! Please select your preferred delivery window below:',
        time: '10:43 AM',
        buttons: ['Before 2 PM', '4 PM - 7 PM', 'Tomorrow Morning']
      })
    } else {
      chatMessages.value.push({
        id: Date.now() + 1,
        sender: 'bot',
        text: '👨‍💼 Support agent Priya has joined the conversation to assist you further.',
        time: '10:43 AM'
      })
    }
  }, 600)
}

// FAQ Accordion State
const openFaq = ref<number | null>(0)
const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

const faqs = [
  {
    q: 'How does Direct Meta Billing (Model 1) save us money?',
    a: 'Unlike Wati, AiSensy, or Interakt which add a 20%–35% markup on top of every WhatsApp conversation, NexWhat connects directly to your Meta Cloud API. You attach your own payment method inside Meta Business Manager and pay Meta wholesale official rates directly. You get 1,000 free service conversations/month and pay zero markup fees to us.'
  },
  {
    q: 'Do I need a verified Facebook Business Manager to get started?',
    a: 'You can start immediately with unverified status (allowing up to 250 conversations/day for testing). For scaling up to 1,000, 10,000, or unlimited daily conversations, Meta requires standard Facebook Business verification, which our team helps you complete in 24–48 hours.'
  },
  {
    q: 'Can multiple team members use the same WhatsApp number?',
    a: 'Yes! NexWhat includes a collaborative Multi-Agent Shared Inbox. You can add agents, assign chats, create team departments, write internal notes, and use canned slash commands (/shortcuts) to answer customers fast.'
  },
  {
    q: 'Can I migrate my existing WhatsApp number to NexWhat?',
    a: 'Yes. If your number is already on the WhatsApp Business App or another BSP (like Wati, Twilio, or AiSensy), you can easily migrate it to your own Meta Cloud API WABA account without losing your phone number.'
  },
  {
    q: 'Does NexWhat support WhatsApp Voice Calls and Interactive IVR?',
    a: 'Yes! NexWhat is one of the only platforms with native support for WhatsApp Business Voice Calling, allowing incoming and outgoing calls, interactive DTMF IVR menus, call transfers, and audio recording.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#070709] text-white selection:bg-emerald-500/30 selection:text-emerald-300 font-sans antialiased overflow-x-hidden">
    <!-- Ambient Background Glows -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px]" />
      <div class="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px]" />
      <div class="absolute top-[75%] -right-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px]" />
    </div>

    <!-- Navigation Header -->
    <PublicNavbar />

    <!-- Main Content -->
    <main class="relative z-10">
      <!-- Hero Section -->
      <section class="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <!-- Hero Pill Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-emerald-400 mb-8 backdrop-blur-md shadow-inner">
          <Sparkles class="h-3.5 w-3.5 text-emerald-400" />
          <span>The Open-Source Wati & AiSensy Alternative • 0% Message Markup</span>
        </div>

        <!-- Hero Headline -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Supercharge WhatsApp Marketing & Support at
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Direct Meta Rates
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Run personalized bulk campaigns, automate 24/7 visual chatbot flows, and scale team customer support. Pay Meta wholesale conversation rates directly with <strong class="text-white font-semibold">zero platform markup</strong>.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <RouterLink
            to="/register"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:brightness-110 active:scale-95 transition-all duration-150"
          >
            Start 14-Day Free Trial
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <a
            href="#simulator"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] active:scale-95 transition-all duration-150"
          >
            <Zap class="h-4 w-4 text-emerald-400" />
            Try Interactive Simulator
          </a>
        </div>

        <!-- Trust Badges / Stats Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div class="p-2 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">98%</div>
            <div class="text-xs text-white/50 uppercase tracking-wider font-medium">Message Open Rate</div>
          </div>
          <div class="p-2 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1">0%</div>
            <div class="text-xs text-white/50 uppercase tracking-wider font-medium">Platform Markup</div>
          </div>
          <div class="p-2 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-1">3.8x</div>
            <div class="text-xs text-white/50 uppercase tracking-wider font-medium">Higher ROI vs SMS</div>
          </div>
          <div class="p-2 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-emerald-300 mb-1">5 Mins</div>
            <div class="text-xs text-white/50 uppercase tracking-wider font-medium">Meta Cloud Setup</div>
          </div>
        </div>
      </section>

      <!-- Interactive WhatsApp Simulator Section -->
      <section id="simulator" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Experience the WhatsApp Flow Live
          </h2>
          <p class="text-white/60 text-base max-w-2xl mx-auto">
            Click the interactive buttons on the phone mockup below to test how automated chatbot branching works in real time.
          </p>
        </div>

        <!-- Phone Simulator Mockup -->
        <div class="max-w-md mx-auto rounded-[40px] border-[6px] border-neutral-800 bg-[#0c1317] shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <!-- WhatsApp Top Bar -->
          <div class="bg-[#202c33] px-4 py-3.5 flex items-center justify-between border-b border-white/[0.06]">
            <div class="flex items-center gap-3">
              <div class="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-sm shadow">
                N
              </div>
              <div class="text-left">
                <div class="text-sm font-semibold text-white flex items-center gap-1.5">
                  NexWhat Assistant
                  <CheckCircle2 class="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                </div>
                <div class="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Official Business Account
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-white/60">
              <PhoneCall class="h-4 w-4" />
            </div>
          </div>

          <!-- WhatsApp Chat Body -->
          <div class="p-4 space-y-4 min-h-[380px] max-h-[460px] overflow-y-auto bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
            <div
              v-for="msg in chatMessages"
              :key="msg.id"
              :class="[
                'flex flex-col max-w-[85%]',
                msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              ]"
            >
              <div
                :class="[
                  'px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm',
                  msg.sender === 'user'
                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                    : 'bg-[#202c33] text-white/90 rounded-tl-none'
                ]"
              >
                {{ msg.text }}
                <div class="text-[9px] text-white/40 mt-1 text-right">{{ msg.time }}</div>
              </div>

              <!-- Interactive Buttons on Bot Message -->
              <div v-if="msg.buttons && msg.buttons.length" class="mt-2 flex flex-col gap-1.5 w-full">
                <button
                  v-for="btn in msg.buttons"
                  :key="btn"
                  @click="handleSimButtonClick(btn)"
                  class="w-full text-center px-3 py-2 rounded-lg bg-[#202c33] hover:bg-[#2a3942] border border-white/[0.08] text-emerald-400 text-xs font-medium active:scale-[0.98] transition-all"
                >
                  ⚡ {{ btn }}
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Simulated Input -->
          <div class="bg-[#202c33] p-2.5 flex items-center gap-2 border-t border-white/[0.06]">
            <div class="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-xs text-white/40 text-left">
              Type a message or click buttons above...
            </div>
            <div class="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow">
              <Send class="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      <!-- Direct Meta Billing (Model 1) Breakdown -->
      <section id="direct-billing" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            Pure SaaS Transparency
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Model 1: Direct Meta Billing
          </h2>
          <p class="text-white/60 text-lg max-w-2xl mx-auto">
            Why pay 25%–35% hidden markups to third-party providers when you can pay Meta wholesale conversation rates directly?
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Competitors (Wati, AiSensy, Interakt) -->
          <div class="p-8 rounded-3xl bg-neutral-900/40 border border-red-500/20 relative overflow-hidden backdrop-blur-md">
            <div class="text-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Traditional Providers (Wati / AiSensy)</div>
            <h3 class="text-2xl font-bold text-white mb-4">Prepaid Wallet + 25% Markup</h3>
            <ul class="space-y-3.5 text-sm text-white/70 mb-6">
              <li class="flex items-start gap-2.5">
                <span class="text-red-400 font-bold">✕</span>
                <span>Requires constant upfront wallet recharges (locking your working capital).</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-400 font-bold">✕</span>
                <span>Heavy per-message surcharges on top of official Meta conversation pricing.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-400 font-bold">✕</span>
                <span>Expensive per-agent / seat fees when adding team members.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-400 font-bold">✕</span>
                <span>If their billing service experiences downtime, your WhatsApp stops delivering.</span>
              </li>
            </ul>
            <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">
              Result: You pay up to ₹40,000–₹80,000+ extra every year just in hidden markups.
            </div>
          </div>

          <!-- NexWhat Model -->
          <div class="p-8 rounded-3xl bg-gradient-to-b from-emerald-950/30 to-neutral-900/40 border border-emerald-500/30 relative overflow-hidden backdrop-blur-md shadow-xl shadow-emerald-500/5">
            <div class="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">
              <Sparkles class="h-4 w-4" />
              NexWhat Direct Architecture
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Direct Meta Card + Zero Markup</h3>
            <ul class="space-y-3.5 text-sm text-white/80 mb-6">
              <li class="flex items-start gap-2.5">
                <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>You attach your credit card directly in Meta Business Manager.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Pay 100% official Meta rates with <strong class="text-emerald-300">0% platform markup</strong>.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Get your first <strong class="text-white font-semibold">1,000 service conversations free</strong> from Meta every month.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Predictable flat-rate NexWhat software subscription with zero financial surprises.</span>
              </li>
            </ul>
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
              Result: Maximum reliability, lowest conversation cost on earth, and 100% data ownership.
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive ROI & Cost Savings Calculator -->
      <section id="calculator" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="p-8 sm:p-12 rounded-3xl bg-neutral-900/50 border border-white/[0.08] backdrop-blur-xl">
          <div class="max-w-3xl mx-auto text-center mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
              Interactive ROI Calculator
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              See How Much You Save Every Month
            </h2>
            <p class="text-white/60 text-sm sm:text-base">
              Slide to adjust your expected monthly audience and campaign volume.
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <!-- Sliders -->
            <div class="space-y-8 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/[0.05]">
              <!-- Slider 1: Contacts -->
              <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-white/80 font-medium">Audience / Active Contacts</span>
                  <span class="text-emerald-400 font-bold text-base">{{ contactCount.toLocaleString() }} Contacts</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  v-model.number="contactCount"
                  class="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div class="flex justify-between text-[11px] text-white/40">
                  <span>2,000</span>
                  <span>50,000</span>
                  <span>100,000+</span>
                </div>
              </div>

              <!-- Slider 2: Monthly Messages -->
              <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-white/80 font-medium">Monthly Broadcast Messages</span>
                  <span class="text-emerald-400 font-bold text-base">{{ messagesPerMonth.toLocaleString() }} Messages</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  v-model.number="messagesPerMonth"
                  class="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div class="flex justify-between text-[11px] text-white/40">
                  <span>5,000</span>
                  <span>100,000</span>
                  <span>200,000+</span>
                </div>
              </div>
            </div>

            <!-- Calculated Savings Card -->
            <div class="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 text-center flex flex-col items-center justify-center">
              <div class="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">Estimated Annual Savings</div>
              <div class="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                ₹{{ annualSavings.toLocaleString() }}
              </div>
              <div class="text-sm text-emerald-300 font-medium mb-6">
                (~₹{{ monthlySavings.toLocaleString() }} saved every single month)
              </div>

              <div class="w-full grid grid-cols-2 gap-3 pt-6 border-t border-white/[0.08] text-xs text-left mb-6">
                <div>
                  <span class="text-white/50 block">Competitor Monthly Cost:</span>
                  <span class="text-red-400 font-semibold text-sm">~₹{{ competitorCost.toLocaleString() }}</span>
                </div>
                <div>
                  <span class="text-white/50 block">NexWhat Platform Fee:</span>
                  <span class="text-emerald-400 font-semibold text-sm">₹{{ nexwhatCost.toLocaleString() }}</span>
                </div>
              </div>

              <RouterLink
                to="/register"
                class="w-full py-3 px-6 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-lg shadow-emerald-500/20 transition-all text-center"
              >
                Claim Your Savings — Start Free Trial
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Features Grid -->
      <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            Everything You Need
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Enterprise WhatsApp Suite, Zero Complexity
          </h2>
          <p class="text-white/60 text-lg max-w-2xl mx-auto">
            Engineered from the ground up for high deliverability, seamless agent collaboration, and smart conversational automation.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Feature 1 -->
          <div class="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/30 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Send class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5">Bulk Broadcast Campaigns</h3>
            <p class="text-sm text-white/60 leading-relaxed">
              Launch targeted broadcasts to thousands of contacts with personalized custom variables, dynamic buttons, and automated delivery retry logic.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-teal-500/30 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
              <Bot class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5">Visual Flow Builder & Bots</h3>
            <p class="text-sm text-white/60 leading-relaxed">
              Create multi-step conversation flows with keyword triggers, quick-reply buttons, interactive catalogs, and AI-powered auto responses.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/30 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Users class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5">Multi-Agent Shared Inbox</h3>
            <p class="text-sm text-white/60 leading-relaxed">
              Unify team customer support with live WebSockets, chat assignment, internal team notes, tag categorization, and canned slash commands.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/30 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <PhoneCall class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5">WhatsApp Voice & IVR</h3>
            <p class="text-sm text-white/60 leading-relaxed">
              Receive and make official WhatsApp VoIP calls. Set up interactive DTMF menus, hold music, team call routing, and audio call recordings.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-teal-500/30 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5">Multi-Tenant Architecture</h3>
            <p class="text-sm text-white/60 leading-relaxed">
              Manage multiple client organizations, subsidiaries, or business units with completely isolated databases, credentials, and custom roles.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/30 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Globe class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5">Global Meta Cloud API</h3>
            <p class="text-sm text-white/60 leading-relaxed">
              Direct connection to Meta's enterprise infrastructure. Enjoy instantaneous message throughput and guaranteed 99.9% uptime.
            </p>
          </div>
        </div>
      </section>

      <!-- SaaS Pricing Plans Section -->
      <section id="pricing" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            Simple, Transparent Pricing
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Zero Markup. Pay Only for Software.
          </h2>
          <p class="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your business scale. All plans include 14 days free trial.
          </p>

          <!-- Billing Cycle & Currency Toggles -->
          <div class="flex flex-wrap items-center justify-center gap-3">
            <!-- Monthly / Annual Toggle -->
            <div class="inline-flex items-center p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
              <button
                @click="isAnnual = false"
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
                  !isAnnual ? 'bg-emerald-500 text-neutral-950 shadow' : 'text-white/60 hover:text-white'
                ]"
              >
                Monthly Billing
              </button>
              <button
                @click="isAnnual = true"
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5',
                  isAnnual ? 'bg-emerald-500 text-neutral-950 shadow' : 'text-white/60 hover:text-white'
                ]"
              >
                Annual Billing
                <span class="px-1.5 py-0.5 rounded-full bg-emerald-300 text-neutral-950 text-[10px] font-bold">Save 20%</span>
              </button>
            </div>

            <!-- Currency Switcher Toggle -->
            <div class="inline-flex items-center p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
              <button
                @click="currency = 'INR'"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                  currency === 'INR' ? 'bg-teal-500 text-neutral-950 shadow' : 'text-white/60 hover:text-white'
                ]"
              >
                ₹ INR
              </button>
              <button
                @click="currency = 'USD'"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                  currency === 'USD' ? 'bg-teal-500 text-neutral-950 shadow' : 'text-white/60 hover:text-white'
                ]"
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <div
            v-for="plan in plansStore.plans"
            :key="plan.id"
            :class="[
              'p-8 rounded-3xl flex flex-col justify-between transition-all relative',
              plan.popular
                ? 'bg-gradient-to-b from-emerald-500/10 to-transparent border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10'
                : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
            ]"
          >
            <div
              v-if="plan.popular"
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-neutral-950 font-bold text-[10px] uppercase tracking-wider shadow"
            >
              Most Popular
            </div>

            <div>
              <div class="text-lg font-bold text-white mb-2">{{ plan.name }}</div>
              <p class="text-xs text-white/50 mb-6 min-h-[32px]">{{ plan.description }}</p>

              <div class="flex items-baseline gap-1 mb-6">
                <span class="text-4xl font-extrabold text-white">
                  {{ currency === 'USD' ? '$' : '₹' }}{{ getPlanPrice(plan) }}
                </span>
                <span class="text-xs text-white/40">/ month</span>
              </div>

              <ul class="space-y-3 text-xs text-white/80 mb-8">
                <li
                  v-for="(feat, idx) in plan.features"
                  :key="idx"
                  class="flex items-center gap-2"
                  :class="feat.included ? 'text-white/80' : 'text-white/30'"
                >
                  <CheckCircle2 v-if="feat.included" class="h-4 w-4 text-emerald-400 shrink-0" />
                  <span v-else class="h-4 w-4 rounded-full border border-white/20 flex items-center justify-center text-[9px] text-white/40 shrink-0">✕</span>
                  <span>{{ feat.name }}</span>
                </li>
              </ul>
            </div>

            <RouterLink
              :to="`/register?plan=${plan.id}`"
              :class="[
                'w-full text-center text-xs font-semibold rounded-xl transition-all',
                plan.popular
                  ? 'py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-95 font-bold'
                  : 'py-2.5 px-4 bg-white/[0.06] hover:bg-white/[0.12] text-white'
              ]"
            >
              Start 14-Day Trial
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
          <p class="text-white/60 text-sm">Everything you need to know about NexWhat, WhatsApp Cloud API, and direct billing.</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden transition-colors"
          >
            <button
              @click="toggleFaq(idx)"
              class="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
            >
              <span>{{ faq.q }}</span>
              <ChevronDown
                :class="[
                  'h-4 w-4 text-white/50 transition-transform duration-200',
                  openFaq === idx ? 'rotate-180 text-emerald-400' : ''
                ]"
              />
            </button>
            <div
              v-if="openFaq === idx"
              class="px-5 pb-5 text-xs text-white/60 leading-relaxed border-t border-white/[0.04] pt-3"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </section>

      <!-- Final Call to Action -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-teal-950/40 border border-emerald-500/20 text-center relative overflow-hidden">
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Cut Your WhatsApp Marketing Costs by 30%?
          </h2>
          <p class="text-white/60 text-base max-w-2xl mx-auto mb-8">
            Join forward-thinking businesses scaling customer relationships on WhatsApp with zero message markups.
          </p>
          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all"
          >
            Start Your 14-Day Free Trial
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <div class="mt-4 text-xs text-white/40">No credit card required for trial • Cancel anytime</div>
        </div>
      </section>
    </main>

    <!-- Modern Multi-Column Footer -->
    <footer class="border-t border-white/[0.08] bg-[#050507] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div class="col-span-2">
          <div class="mb-4">
            <NexWhatLogo size="md" />
          </div>
          <p class="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
            The modern WhatsApp Business Cloud API engagement platform with zero conversation markup. Empowering SMBs, D2C brands, and agile teams worldwide.
          </p>
          <div class="text-[11px] text-emerald-400 font-mono">
            Direct Meta Cloud API Integration • Model 1 Billing
          </div>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-3">Industries</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><RouterLink to="/industries/ecommerce" class="hover:text-emerald-400 transition-colors">E-Commerce & D2C</RouterLink></li>
            <li><RouterLink to="/industries/education" class="hover:text-emerald-400 transition-colors">Education & EdTech</RouterLink></li>
            <li><RouterLink to="/industries/real-estate" class="hover:text-emerald-400 transition-colors">Real Estate & PropTech</RouterLink></li>
            <li><RouterLink to="/industries/finance" class="hover:text-emerald-400 transition-colors">Finance & Banking</RouterLink></li>
            <li><RouterLink to="/industries/healthcare" class="hover:text-emerald-400 transition-colors">Healthcare & Clinics</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-3">Features</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><RouterLink to="/services/broadcast" class="hover:text-emerald-400 transition-colors">Broadcast Campaigns</RouterLink></li>
            <li><RouterLink to="/services/chatbot" class="hover:text-emerald-400 transition-colors">Visual Flow Builder</RouterLink></li>
            <li><RouterLink to="/services/calling" class="hover:text-emerald-400 transition-colors">Voice Calling & IVR</RouterLink></li>
            <li><RouterLink to="/services/inbox" class="hover:text-emerald-400 transition-colors">Shared Team Inbox</RouterLink></li>
            <li><RouterLink to="/services/flows" class="hover:text-emerald-400 transition-colors">WhatsApp Native Flows</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-3">Company</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><RouterLink to="/about" class="hover:text-emerald-400 transition-colors">About NexWhat</RouterLink></li>
            <li><a href="#direct-billing" class="hover:text-emerald-400 transition-colors">Direct Meta Billing</a></li>
            <li><a href="#pricing" class="hover:text-emerald-400 transition-colors">Subscription Pricing</a></li>
            <li><a href="#faq" class="hover:text-emerald-400 transition-colors">Platform FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-3">Legal & Security</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><RouterLink to="/privacy" class="hover:text-emerald-400 transition-colors">Privacy Policy</RouterLink></li>
            <li><RouterLink to="/terms" class="hover:text-emerald-400 transition-colors">Terms of Service</RouterLink></li>
            <li><RouterLink to="/refund" class="hover:text-emerald-400 transition-colors">Refund & Cancellation</RouterLink></li>
            <li><RouterLink to="/login" class="hover:text-emerald-400 transition-colors">Account Sign In</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <span>© 2026 NexWhat Inc. All rights reserved. Built with Meta Cloud API.</span>
        <div class="flex gap-6">
          <RouterLink to="/privacy" class="hover:text-slate-400">Privacy</RouterLink>
          <RouterLink to="/terms" class="hover:text-slate-400">Terms</RouterLink>
          <RouterLink to="/refund" class="hover:text-slate-400">Refunds</RouterLink>
          <RouterLink to="/about" class="hover:text-slate-400">About Us</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
