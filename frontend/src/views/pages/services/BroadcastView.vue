<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Send,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Zap,
  BarChart3,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-white flex flex-col font-sans">
    <!-- Header -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-white/[0.08]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5 group">
          <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
            <div class="h-full w-full bg-[#0b0f17] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-all">
              <MessageSquare class="h-4 w-4 text-emerald-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <span class="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            NexWhat
          </span>
        </RouterLink>

        <div class="flex items-center gap-4">
          <RouterLink
            to="/"
            class="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft class="h-3.5 w-3.5" />
            Back to Home
          </RouterLink>
          <RouterLink
            to="/register"
            class="hidden sm:inline-flex px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
          >
            Start Broadcasting
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <main class="flex-1">
      <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <Send class="h-3.5 w-3.5" />
          <span>High-Converting WhatsApp Broadcasts</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Send 100,000+ WhatsApp Messages in Minutes with 98% Open Rates.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          Reach opted-in customers directly in their favorite messaging app. Personalize dynamic variables, attach interactive buttons and catalogs, and monitor real-time read receipts with zero message markups.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/register"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Create Your First Campaign
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <RouterLink
            to="/login"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/[0.08] transition-all"
          >
            Explore Dashboard
          </RouterLink>
        </div>
      </section>

      <!-- Key Capabilities -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <Zap class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Smart CSV & Segment Import</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Upload spreadsheets with custom fields (`first_name`, `product_id`, `discount_code`). Automatically segment lists by tags, purchase history, or customer attributes.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6">
              <Sparkles class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Interactive WhatsApp Buttons</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Attach Quick Reply and Call-to-Action buttons (e.g. "Buy Now", "Track Order", "Visit Website") to double your click-through and engagement rates.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <BarChart3 class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Live Funnel Analytics</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Track sent, delivered, read, and button clicked metrics in real-time. Identify bounces and failed deliveries instantly via webhook telemetry.
            </p>
          </div>
        </div>
      </section>

      <!-- Comparison Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div class="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-2xl font-bold text-white mb-4 text-center">Why NexWhat Broadcasts Beat Other Platforms</h2>
          <div class="space-y-4 mt-6">
            <div class="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10">
              <CheckCircle2 class="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 class="text-sm font-semibold text-white">Direct Meta Cloud API Rates</h4>
                <p class="text-xs text-slate-400 mt-0.5">Other tools charge ₹0.15–₹0.30 surcharge per message on top of Meta fees. NexWhat charges 0% markup.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10">
              <CheckCircle2 class="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 class="text-sm font-semibold text-white">High Throughput Rate Throttling</h4>
                <p class="text-xs text-slate-400 mt-0.5">Our Golang scheduler distributes messages according to Meta's phone quality tier guidelines to protect your phone number from bans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/[0.06] bg-[#05070a] py-8 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 NexWhat Inc. All rights reserved.</span>
        <div class="flex gap-4">
          <RouterLink to="/privacy" class="hover:text-slate-300">Privacy Policy</RouterLink>
          <RouterLink to="/terms" class="hover:text-slate-300">Terms of Service</RouterLink>
          <RouterLink to="/refund" class="hover:text-slate-300">Refund Policy</RouterLink>
          <RouterLink to="/about" class="hover:text-slate-300">About Us</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
