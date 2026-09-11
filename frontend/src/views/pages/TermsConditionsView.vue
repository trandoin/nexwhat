<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FileText, MessageSquare, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Cpu } from 'lucide-vue-next'
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
          <FileText class="h-3.5 w-3.5" />
          <span>Terms & Conditions</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Terms of Service
        </h1>
        <p class="text-slate-400 text-sm">
          Effective Date: September 11, 2026 • Version 2.0
        </p>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-8">
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 class="h-4 w-4 text-emerald-400" />
            1. Acceptance of Terms
          </h2>
          <p>
            By registering for, accessing, or using the NexWhat platform ("Service"), you agree to be bound by these Terms of Service. If you are accepting on behalf of a company, organization, or enterprise, you represent and warrant that you possess the full legal authority to bind that entity.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Cpu class="h-4 w-4 text-emerald-400" />
            2. Nature of the SaaS Service
          </h2>
          <p class="mb-3">
            NexWhat provides customer engagement software, campaign orchestration, multi-agent inboxes, visual flow builders, and analytics layered directly on top of the official Meta WhatsApp Business Cloud API.
          </p>
          <p>
            You acknowledge that WhatsApp is an external service owned and regulated by Meta Platforms, Inc. Your use of WhatsApp must strictly comply with the WhatsApp Business Messaging Policy and Commerce Policy.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle class="h-4 w-4 text-amber-400" />
            3. Prohibited Usage & Anti-Spam Guidelines
          </h2>
          <p class="mb-2">Users may not utilize NexWhat for:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Transmitting unsolicited promotional messages (Spam) to end-users who have not explicitly opted-in to receive communications.</li>
            <li>Promoting restricted goods or illegal services including unauthorized pharmaceuticals, counterfeit goods, or predatory financial schemes.</li>
            <li>Impersonating brands, government institutions, or engaging in phishing and deceptive activities.</li>
            <li>Violating Meta's quality rating thresholds or triggering mass user blocks/reports.</li>
          </ul>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <ShieldCheck class="h-4 w-4 text-emerald-400" />
            4. Subscriptions & Billing
          </h2>
          <p class="mb-3">
            NexWhat software subscriptions (Starter ₹299/mo, Growth ₹599/mo, Pro ₹999/mo) are billed on a recurring monthly or discounted annual cycle.
          </p>
          <p>
            Meta conversation charges are billed directly to your payment card saved in Meta Business Manager. You are solely responsible for maintaining an active payment method with Meta.
          </p>
        </section>

        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3">
            5. Service Availability & SLA
          </h2>
          <p>
            We strive to maintain a 99.9% platform uptime for our dashboard, webhook ingress, and automation dispatchers. Scheduled maintenance will be communicated at least 24 hours in advance. NexWhat is not liable for upstream Meta API outages or WhatsApp network disruptions.
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
          <RouterLink to="/refund" class="hover:text-slate-300">Refund Policy</RouterLink>
          <RouterLink to="/about" class="hover:text-slate-300">About Us</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
