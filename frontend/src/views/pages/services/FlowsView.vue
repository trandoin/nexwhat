<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import {
  FileText,
  CheckCircle2,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  BarChart3
} from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-white flex flex-col font-sans">
    <!-- Rich Public Navbar -->
    <PublicNavbar />

    <!-- Hero Section -->
    <main class="flex-1">
      <section class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <FileText class="h-3.5 w-3.5" />
          <span>Meta WhatsApp Flows & Native Forms</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
          Capture Rich Data with Native Forms Inside WhatsApp. Zero Web Redirection.
        </h1>

        <p class="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Build multi-screen appointment bookings, loan applications, lead capture questionnaires, and customer surveys that open instantly inside the WhatsApp app.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <RouterLink
            to="/register"
            class="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            Build WhatsApp Flows Free
          </RouterLink>
          <RouterLink
            to="/#pricing"
            class="px-8 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-sm transition-all border border-white/10"
          >
            Explore Pricing (From ₹299/mo)
          </RouterLink>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
            <div class="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
              <Smartphone class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Native In-App Experience</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Customers never leave WhatsApp. Forms open with seamless native transitions, driving 3x higher completion rates compared to external landing page links.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
            <div class="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
              <Layers class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Multi-Screen Logic</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Create dynamic multi-step question trees with date pickers, dropdown selects, radio buttons, and text fields that adapt dynamically to user inputs.
            </p>
          </div>

          <div class="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all">
            <div class="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
              <Zap class="h-6 w-6" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Instant CRM Webhooks</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Every completed form instantly triggers real-time webhooks, feeding customer responses directly into your CRM, database, or Google Sheets with zero delay.
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/[0.08] bg-[#05060a] py-12 text-xs text-slate-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <NexWhatLogo size="sm" :showBadge="false" />
          <span>© 2026 NexWhat. All rights reserved.</span>
        </div>
        <div class="flex items-center gap-6">
          <RouterLink to="/privacy" class="hover:text-emerald-400">Privacy Policy</RouterLink>
          <RouterLink to="/terms" class="hover:text-emerald-400">Terms of Service</RouterLink>
          <RouterLink to="/refund" class="hover:text-emerald-400">Refund Policy</RouterLink>
          <RouterLink to="/about" class="hover:text-emerald-400">About Us</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
