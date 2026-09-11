<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShieldCheck, MessageSquare, ArrowLeft, Lock, Eye, Server, RefreshCw, Mail } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-emerald-500 selection:text-white flex flex-col font-sans">
    <!-- Navigation Header -->
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

    <!-- Main Content -->
    <main class="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="mb-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
          <ShieldCheck class="h-3.5 w-3.5" />
          <span>Legal & Compliance</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p class="text-slate-400 text-sm">
          Last Updated: September 11, 2026 • Version 2.4
        </p>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-8">
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Lock class="h-4 w-4 text-emerald-400" />
            1. Overview & Commitment
          </h2>
          <p class="mb-3">
            At NexWhat ("we", "our", or "us"), we operate on a fundamental principle of customer data sovereignty. We empower modern enterprises to engage with their clients over the WhatsApp Business Cloud API while ensuring zero data exploitation.
          </p>
          <p>
            We do not sell, rent, monetise, or distribute your customer lists, conversation contents, phone numbers, or analytics to any third party. Your data remains strictly yours.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Eye class="h-4 w-4 text-emerald-400" />
            2. Information We Collect
          </h2>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Account Information:</strong> Name, business email, business name, company website, and encrypted credentials when you register for NexWhat.</li>
            <li><strong>Meta Cloud API Credentials:</strong> Your Meta WABA ID, Phone Number ID, and System User Access Tokens necessary to route messages directly between Meta servers and your inbox.</li>
            <li><strong>Customer Contacts & Conversation Data:</strong> WhatsApp numbers, contact profiles, message status (sent, delivered, read), and interactive response payloads required for your workflows.</li>
            <li><strong>Usage & Telemetry:</strong> Log records of outbound broadcast batches, chatbot trigger invocations, and API latency for platform uptime and performance monitoring.</li>
          </ul>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Server class="h-4 w-4 text-emerald-400" />
            3. Direct Meta Billing & Architecture
          </h2>
          <p class="mb-3">
            NexWhat implements the **Direct Meta Cloud API Billing Model**. WhatsApp conversation fees are paid directly by your organization to Meta Platforms, Inc. through your linked payment method in Meta Business Manager.
          </p>
          <p>
            Because conversation fees are billed directly by Meta, NexWhat does not hold or escrow message credits or financial deposits on Meta's behalf.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <RefreshCw class="h-4 w-4 text-emerald-400" />
            4. Data Retention & Deletion
          </h2>
          <p class="mb-3">
            You maintain full control over your customer records. You may export or permanently purge contacts, message history, and automated flows from your workspace settings at any time.
          </p>
          <p>
            Upon account cancellation, all tenant records are archived for a 30-day grace period to prevent accidental data loss, after which all databases and associated cryptographic tokens are permanently erased.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Mail class="h-4 w-4 text-emerald-400" />
            5. Contact Our Privacy Officer
          </h2>
          <p class="mb-2">
            For privacy inquiries, GDPR/DPDP data subject access requests, or security audit questions:
          </p>
          <p class="text-emerald-400 font-mono text-xs">
            Email: privacy@nexwhat.com • legal@nexwhat.com
          </p>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/[0.06] bg-[#05070a] py-8 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 NexWhat Inc. All rights reserved.</span>
        <div class="flex gap-4">
          <RouterLink to="/terms" class="hover:text-slate-300">Terms of Service</RouterLink>
          <RouterLink to="/refund" class="hover:text-slate-300">Refund Policy</RouterLink>
          <RouterLink to="/about" class="hover:text-slate-300">About Us</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
