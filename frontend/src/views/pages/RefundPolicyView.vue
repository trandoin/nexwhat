<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { RotateCcw, MessageSquare, ArrowLeft, CheckCircle2, Clock, HelpCircle } from 'lucide-vue-next'
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

    <!-- Main Content -->
    <main class="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="mb-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
          <RotateCcw class="h-3.5 w-3.5" />
          <span>Transparent Policies</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Refund & Cancellation Policy
        </h1>
        <p class="text-slate-400 text-sm">
          Simple, fair, and transparent billing guarantee for every business.
        </p>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-8">
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Clock class="h-4 w-4 text-emerald-400" />
            1. 14-Day Free Trial (Zero Financial Risk)
          </h2>
          <p class="mb-3">
            Every new NexWhat account begins with an unrestricted 14-day free trial. You do not need to enter a credit card or debit card to start testing broadcasts, chatbots, and our team inbox.
          </p>
          <p>
            You only choose a paid subscription plan (Starter ₹299, Growth ₹599, or Pro ₹999) when you are completely satisfied with the performance and ROI of our platform.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 class="h-4 w-4 text-emerald-400" />
            2. 7-Day Money-Back Guarantee on Paid Subscriptions
          </h2>
          <p class="mb-3">
            If you upgrade to any paid monthly or annual subscription and decide within the first 7 days that NexWhat does not meet your business requirements, simply email our billing team at <span class="text-emerald-400 font-medium">billing@nexwhat.com</span> or open a support ticket.
          </p>
          <p>
            We will process a 100% full refund of your NexWhat platform subscription fee back to your original payment method within 5 to 7 business days. No questions asked.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <RotateCcw class="h-4 w-4 text-emerald-400" />
            3. Meta WhatsApp Conversation Fees
          </h2>
          <p class="mb-3">
            Because NexWhat implements Direct Meta Cloud Billing, conversation charges (e.g., Marketing, Utility, Authentication conversations) are charged directly by Meta Platforms, Inc. to your corporate card on file in Meta Business Manager.
          </p>
          <p>
            NexWhat does not hold, markup, or retain Meta conversation fees, and therefore NexWhat cannot issue refunds for charges billed directly by Meta.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <HelpCircle class="h-4 w-4 text-emerald-400" />
            4. How to Cancel
          </h2>
          <p class="mb-3">
            You can cancel your subscription at any time with a single click inside your NexWhat account under <strong>Settings &rarr; Subscription & Plans &rarr; Cancel Subscription</strong>.
          </p>
          <p>
            Upon cancellation, your workspace remains fully operational until the end of your prepaid billing period, with no subsequent renewals or surprise fees.
          </p>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/[0.06] bg-[#05070a] py-8 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 NexWhat Inc. All rights reserved.</span>
        <div class="flex gap-4">
          <RouterLink to="/privacy" class="hover:text-slate-300">Privacy Policy</RouterLink>
          <RouterLink to="/terms" class="hover:text-slate-300">Terms of Service</RouterLink>
          <RouterLink to="/about" class="hover:text-slate-300">About Us</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
