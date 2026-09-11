<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Users,
  MessageSquare,
  ArrowLeft,
  Zap,
  ShieldCheck,
  Globe2,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  ArrowRight
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
            Start Free Trial
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="flex-1">
      <section class="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <HeartHandshake class="h-3.5 w-3.5" />
          <span>Democratizing WhatsApp for Business</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          We Believe Great WhatsApp Marketing Shouldn't Cost a Fortune.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Traditional WhatsApp marketing vendors exploit businesses with bloated monthly retainers and extortionate per-message markups. NexWhat was born to disrupt this model with direct Meta Cloud API connectivity and transparent software pricing starting at just ₹299/month.
        </p>
      </section>

      <!-- Core Values -->
      <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
              <ShieldCheck class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Zero Markup Guarantee</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              We never take a percentage of your message traffic. Meta conversation fees are billed directly to your corporate card by Meta Platforms at exact raw cost.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
              <Zap class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">High-Performance Engine</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Built on Golang and modern reactive frontends, NexWhat easily dispatches 100,000+ broadcast messages per hour with real-time webhooks and millisecond response speeds.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
              <Users class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Empowering SMBs & Startups</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Whether you are an emerging D2C brand, an ed-tech startup, or a fast-scaling agency, our ₹299 to ₹999 tiers provide enterprise capabilities within an honest budget.
            </p>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-b border-white/[0.06] my-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div class="text-3xl sm:text-4xl font-black text-emerald-400">10M+</div>
            <div class="text-xs text-slate-400 mt-1">Messages Delivered</div>
          </div>
          <div>
            <div class="text-3xl sm:text-4xl font-black text-white">99.9%</div>
            <div class="text-xs text-slate-400 mt-1">Platform Uptime</div>
          </div>
          <div>
            <div class="text-3xl sm:text-4xl font-black text-teal-400">0%</div>
            <div class="text-xs text-slate-400 mt-1">Message Markup</div>
          </div>
          <div>
            <div class="text-3xl sm:text-4xl font-black text-white">1,500+</div>
            <div class="text-xs text-slate-400 mt-1">Businesses Powered</div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16 px-4 text-center">
        <div class="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08]">
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Join the Revolution?</h2>
          <p class="text-slate-400 text-sm mb-6 max-w-lg mx-auto">
            Experience the freedom of WhatsApp Cloud API with full automation, broadcast power, and multi-agent inboxes.
          </p>
          <RouterLink
            to="/register"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
          >
            Create Your Account
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
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
        </div>
      </div>
    </footer>
  </div>
</template>
