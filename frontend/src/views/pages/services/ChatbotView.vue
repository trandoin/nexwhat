<script setup lang="ts">
import PublicFooter from '@/components/layout/PublicFooter.vue'
import { RouterLink } from 'vue-router'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import {
  Bot,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  GitBranch,
  Workflow,
  Cpu,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-white flex flex-col font-sans">
    <!-- Rich Public Navbar with Dropdowns -->
    <PublicNavbar />

    <!-- Hero -->
    <main class="flex-1">
      <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <Bot class="h-3.5 w-3.5" />
          <span>Visual No-Code Chatbot Builder</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Automate 80% of WhatsApp Inquiries 24/7 with Zero Coding.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          Design interactive WhatsApp conversational funnels in minutes. Qualify leads, collect orders, trigger CRM webhooks, and hand over complex inquiries to live agents seamlessly.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/register"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Launch Visual Flow Builder
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <RouterLink
            to="/login"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/[0.08] transition-all"
          >
            Watch Demo
          </RouterLink>
        </div>
      </section>

      <!-- Grid -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <GitBranch class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Drag & Drop Flow Canvas</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Connect condition nodes, button menus, media cards, and API requests effortlessly on an infinite visual node canvas.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6">
              <Cpu class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Smart Keyword Triggers</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Match exact words, regex patterns, or synonyms (e.g. "price", "order status", "booking") to immediately trigger corresponding automation branches.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <Clock class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Human Agent Handover</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              When a customer clicks "Talk to Agent" or requests custom assistance, the bot automatically assigns the chat to an active team member.
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <PublicFooter />
  </div>
</template>
