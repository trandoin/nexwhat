<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import { ExternalLink, Sparkles, ShieldCheck, Zap } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t border-white/[0.08] bg-[#050507] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
    <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
      <!-- Brand column -->
      <div class="col-span-2 space-y-4">
        <div class="flex items-center gap-3">
          <NexWhatLogo size="md" />
        </div>
        <p class="text-xs text-slate-400 max-w-sm leading-relaxed">
          The enterprise-grade WhatsApp Business Cloud API platform with zero conversation markup. Empowering SMBs, D2C brands, and growth teams worldwide.
        </p>

        <!-- Powered By Nexteir Badge -->
        <div class="pt-2">
          <a
            href="https://nexteir.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-all group shadow-sm hover:shadow-emerald-950/50"
          >
            <Sparkles class="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Powered by <strong class="text-white font-semibold group-hover:underline">Nexteir.com</strong></span>
            <ExternalLink class="w-3 h-3 text-emerald-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div class="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
          <span class="flex items-center gap-1"><ShieldCheck class="w-3.5 h-3.5 text-emerald-500" /> Meta Cloud API</span>
          <span>•</span>
          <span class="flex items-center gap-1"><Zap class="w-3.5 h-3.5 text-emerald-500" /> Model 1 Direct Billing</span>
        </div>
      </div>

      <!-- Industries -->
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

      <!-- Features -->
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

      <!-- Company & Legal -->
      <div>
        <h4 class="text-xs font-semibold text-white uppercase tracking-wider mb-3">Company & Legal</h4>
        <ul class="space-y-2 text-xs text-slate-400">
          <li><RouterLink to="/about" class="hover:text-emerald-400 transition-colors">About NexWhat</RouterLink></li>
          <li><a href="https://nexteir.com" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">Nexteir Company <ExternalLink class="w-2.5 h-2.5 opacity-70" /></a></li>
          <li><RouterLink to="/privacy" class="hover:text-emerald-400 transition-colors">Privacy Policy</RouterLink></li>
          <li><RouterLink to="/terms" class="hover:text-emerald-400 transition-colors">Terms of Service</RouterLink></li>
          <li><RouterLink to="/refund" class="hover:text-emerald-400 transition-colors">Refund & Cancellation</RouterLink></li>
          <li><RouterLink to="/login" class="hover:text-emerald-400 transition-colors">Account Sign In</RouterLink></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <div class="flex items-center flex-wrap gap-2">
        <span>© 2026 NexWhat. All rights reserved.</span>
        <span>•</span>
        <span class="text-slate-400">Powered by <a href="https://nexteir.com" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-emerald-300 underline font-medium">Nexteir</a></span>
      </div>
      <div class="flex items-center gap-6">
        <RouterLink to="/privacy" class="hover:text-slate-400 transition-colors">Privacy</RouterLink>
        <RouterLink to="/terms" class="hover:text-slate-400 transition-colors">Terms</RouterLink>
        <RouterLink to="/refund" class="hover:text-slate-400 transition-colors">Refunds</RouterLink>
        <RouterLink to="/about" class="hover:text-slate-400 transition-colors">About</RouterLink>
        <a href="https://nexteir.com" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 font-medium">
          nexteir.com <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </div>
  </footer>
</template>
