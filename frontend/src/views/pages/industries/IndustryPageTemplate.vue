<script setup lang="ts">
import PublicFooter from '@/components/layout/PublicFooter.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  Percent,
  Layers,
  Clock,
  PhoneCall,
  MessageSquare
} from 'lucide-vue-next'

export interface UseCase {
  title: string
  desc: string
  metric: string
  metricLabel: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface SimMessage {
  sender: 'user' | 'bot'
  text: string
  time: string
  buttons?: string[]
}

interface Props {
  industryKey: string
  title: string
  badgeText: string
  subtitle: string
  description: string
  heroMetricNumber: string
  heroMetricLabel: string
  useCases: UseCase[]
  chatSimulator: SimMessage[]
  faqs: FaqItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-white flex flex-col font-sans">
    <!-- Rich Public Navbar -->
    <PublicNavbar />

    <!-- Hero Section -->
    <main class="flex-1">
      <section class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <!-- Ambient Background Glows -->
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div class="absolute top-1/2 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div class="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div class="lg:col-span-7 space-y-6 text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold tracking-wide">
              <Sparkles class="h-3.5 w-3.5 text-emerald-400" />
              <span>{{ badgeText }}</span>
            </div>

            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {{ title }}
            </h1>

            <p class="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              {{ description }}
            </p>

            <!-- Hero Metric & Value Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div class="text-3xl font-extrabold text-emerald-400 tracking-tight">{{ heroMetricNumber }}</div>
                <div class="text-xs text-slate-400 mt-1">{{ heroMetricLabel }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div class="text-3xl font-extrabold text-white tracking-tight">0%</div>
                <div class="text-xs text-slate-400 mt-1">Conversation Markup</div>
              </div>
              <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] col-span-2 sm:col-span-1">
                <div class="text-3xl font-extrabold text-teal-400 tracking-tight">1,000</div>
                <div class="text-xs text-slate-400 mt-1">Free Service Convs/Mo</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-4 pt-4">
              <RouterLink
                :to="`/register?industry=${industryKey}`"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Launch for {{ badgeText.split(' ')[0] }}</span>
                <ArrowRight class="h-4 w-4" />
              </RouterLink>

              <RouterLink
                to="/#pricing"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white transition-all border border-white/10"
              >
                <span>View Plans (From ₹299/mo)</span>
              </RouterLink>
            </div>
          </div>

          <!-- Interactive WhatsApp Flow Simulator -->
          <div class="lg:col-span-5 relative">
            <div class="w-full max-w-[380px] mx-auto rounded-[36px] bg-[#0c1317] border-[6px] border-[#222e35] shadow-2xl shadow-emerald-950/40 overflow-hidden flex flex-col h-[520px]">
              <!-- Phone Header -->
              <div class="bg-[#1f2c34] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
                <div class="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
                  <div class="h-full w-full rounded-full bg-[#0c1317] flex items-center justify-center">
                    <NexWhatLogo size="xs" :showText="false" :showBadge="false" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-white flex items-center gap-1">
                    NexWhat Bot
                    <CheckCircle2 class="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div class="text-[11px] text-emerald-400">Official Cloud API • Active</div>
                </div>
              </div>

              <!-- Message Area with Industry Specific Dialogue -->
              <div class="flex-1 p-4 space-y-3 overflow-y-auto bg-[#0b141a] text-xs">
                <div
                  v-for="(msg, i) in chatSimulator"
                  :key="i"
                  :class="['flex flex-col max-w-[85%]', msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start']"
                >
                  <div
                    :class="[
                      'p-3 rounded-2xl leading-relaxed shadow',
                      msg.sender === 'user'
                        ? 'bg-[#005c4b] text-white rounded-tr-xs'
                        : 'bg-[#202c33] text-slate-200 rounded-tl-xs'
                    ]"
                  >
                    <div>{{ msg.text }}</div>
                    <div class="text-[9px] text-white/50 text-right mt-1">{{ msg.time }}</div>
                  </div>

                  <!-- Quick Action Buttons -->
                  <div v-if="msg.buttons && msg.buttons.length" class="mt-1.5 space-y-1 w-full">
                    <button
                      v-for="(btn, bIdx) in msg.buttons"
                      :key="bIdx"
                      class="w-full py-1.5 px-3 rounded-lg bg-[#202c33] hover:bg-[#2a3942] text-teal-300 font-semibold text-[11px] text-center border border-white/[0.06] transition-colors"
                    >
                      {{ btn }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Phone Footer -->
              <div class="bg-[#1f2c34] p-3 text-[11px] text-white/40 text-center border-t border-white/[0.06]">
                ⚡ Powered by Meta Official Cloud API
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Use Cases Grid -->
      <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            Real-World Impact
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Industry Leaders Win with NexWhat
          </h2>
          <p class="text-slate-400 text-base mt-3">
            Replace manual calls, fragmented email sequences, and high markup BSP bills with automated WhatsApp workflows.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(uc, idx) in useCases"
            :key="idx"
            class="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
          >
            <div>
              <div class="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm mb-4">
                0{{ idx + 1 }}
              </div>
              <h3 class="text-lg font-bold text-white mb-2">{{ uc.title }}</h3>
              <p class="text-xs text-slate-400 leading-relaxed">{{ uc.desc }}</p>
            </div>

            <div class="pt-6 mt-6 border-t border-white/[0.06]">
              <div class="text-2xl font-black text-emerald-400 tracking-tight">{{ uc.metric }}</div>
              <div class="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">{{ uc.metricLabel }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- The Zero Markup Advantage -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1420] via-[#091018] to-[#041c14] border border-emerald-500/20 shadow-2xl">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Meta Model 1 Direct Billing</div>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Why Pay 20% to 35% Surcharges to Middlemen?
              </h3>
              <p class="text-sm text-slate-300 mt-3 leading-relaxed">
                Companies using Wati, AiSensy, or Interakt pay an extra ₹0.15 to ₹0.35 on every single WhatsApp message. With NexWhat, you pay Meta directly at official rates. We take 0% conversation markup.
              </p>
            </div>
            <div class="space-y-3">
              <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 class="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div class="text-xs text-white"><strong>1,000 Free Service Chats:</strong> Get official free monthly quota directly from Meta.</div>
              </div>
              <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 class="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div class="text-xs text-white"><strong>No Wallet Locking:</strong> Attach credit card in Meta Business Manager. No advance deposit trap.</div>
              </div>
              <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 class="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div class="text-xs text-white"><strong>Full Software Power:</strong> Broadcasts, Chatbot Flows, Calling & Live Team Inbox from ₹299/mo.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQs -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.08]">
        <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, fIdx) in faqs"
            :key="fIdx"
            class="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
          >
            <h4 class="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <span class="text-emerald-400 font-bold">Q:</span>
              {{ faq.q }}
            </h4>
            <p class="text-xs sm:text-sm text-slate-400 pl-6 leading-relaxed">
              {{ faq.a }}
            </p>
          </div>
        </div>
      </section>

      <!-- Bottom High-Conversion CTA -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div class="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 shadow-2xl">
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Ready to Accelerate Your Business on WhatsApp?
          </h2>
          <p class="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Get started in 10 minutes with our self-serve Cloud API linking wizard, or request our free white-glove concierge setup.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <RouterLink
              :to="`/register?industry=${industryKey}`"
              class="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all"
            >
              Start 14-Day Free Trial
            </RouterLink>
            <RouterLink
              to="/#pricing"
              class="px-8 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-sm transition-all border border-white/10"
            >
              Explore Pricing Plans
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <PublicFooter />
  </div>
</template>
