<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import {
  Users,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Shield,
  Clock,
  ArrowRight,
  Zap,
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
          <Users class="h-3.5 w-3.5" />
          <span>Shared Multi-Agent Team Inbox</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          One WhatsApp Number. Unlimited Agents. Zero Collisions.
        </h1>

        <p class="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          Empower your support and sales team to collaborate on customer conversations from a unified workspace. Assign tickets, add internal private notes, and trigger canned macros with lightning speed.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/register"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            Invite Your Support Team
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <RouterLink
            to="/login"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/[0.08] transition-all"
          >
            Sign In
          </RouterLink>
        </div>
      </section>

      <!-- Key Capabilities -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <Shield class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Agent Collision Detection</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Real-time indicators show when another agent is actively viewing or typing a response to prevent duplicate customer replies.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6">
              <Tag class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Internal Notes & Mentions</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Leave private notes inside conversation threads visible only to team members to share context or tag senior supervisors for approvals.
            </p>
          </div>

          <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <Zap class="h-6 w-6" />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Canned Quick Replies</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Answer common questions in 1-click using shortcut commands (e.g. `/hours`, `/refund`, `/shipping`) with dynamic customer name tags.
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/[0.06] bg-[#05070a] py-8 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <NexWhatLogo size="sm" :showBadge="false" />
          <span>© 2026 NexWhat Inc. All rights reserved.</span>
        </div>
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
