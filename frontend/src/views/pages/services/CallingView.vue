<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  PhoneCall,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  PhoneForwarded,
  Mic,
  ShieldCheck,
  Headphones,
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
            Get Started
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <main class="flex-1">
      <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <PhoneCall class="h-3.5 w-3.5" />
          <span>WhatsApp Voice Calling & Cloud IVR</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Talk to Customers Directly via WhatsApp Voice in Your Browser.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          Enable high-definition, in-app WhatsApp voice calling without traditional telecom PBX hardware. Build multi-level IVR call routing and let agents answer calls directly in NexWhat.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/register"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Enable Voice Calling
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <RouterLink
            to="/login"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/[0.08] transition-all"
          >
            View Live Features
          </RouterLink>
        </div>
      </section>

      <!-- Key Capabilities -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <Headphones class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">WebRTC In-Browser Calling</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Agents place and receive crystal-clear WhatsApp voice calls right inside the NexWhat dashboard. No SIP softphones or mobile handsets required.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6">
              <PhoneForwarded class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Automated Cloud IVR Menus</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Create press "1 for Sales", "2 for Support", or route inbound callers directly to the account manager who last handled their case.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <Mic class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Call Recording & Quality Audits</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Review call recordings, caller queue wait times, duration, and disposition tags to maintain exceptional service standards.
            </p>
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
