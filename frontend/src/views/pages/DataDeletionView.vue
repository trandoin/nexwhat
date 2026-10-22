<script setup lang="ts">
import PublicFooter from '@/components/layout/PublicFooter.vue'
import { RouterLink } from 'vue-router'
import {
  Trash2,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  Settings,
  ExternalLink,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle
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
            NexWhat <span class="text-xs font-normal text-slate-400">by Nexteir</span>
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
            to="/login"
            class="hidden sm:inline-flex px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="mb-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
          <ShieldCheck class="h-3.5 w-3.5" />
          <span>Meta Platform Compliance • User Rights</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          User Data Deletion Instructions
        </h1>
        <p class="text-slate-400 text-sm">
          Meta WhatsApp Business Cloud API & NexWhat Account Data Deletion Policy • Last Updated: October 2026
        </p>
      </div>

      <!-- Quick summary card -->
      <div class="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 mb-8 flex items-start gap-4">
        <div class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
          <Trash2 class="h-5 w-5" />
        </div>
        <div class="text-xs sm:text-sm text-slate-300 space-y-1">
          <p class="font-semibold text-white">Your Data, Your Right</p>
          <p class="text-slate-400 leading-relaxed">
            In compliance with Meta Platform Policy, General Data Protection Regulation (GDPR), and India DPDP Act, Nexteir (operating NexWhat at <span class="text-emerald-400 font-mono">nexteir.in</span> and <span class="text-emerald-400 font-mono">nexteir.com</span>) provides clear, straightforward methods for users and businesses to request permanent deletion of their Meta and WhatsApp data.
          </p>
        </div>
      </div>

      <div class="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-8">
        <!-- Section 1: Facebook / Meta settings deletion -->
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Settings class="h-4 w-4 text-emerald-400" />
            Method 1: Deletion via Facebook / Meta App Settings
          </h2>
          <p class="mb-4 text-slate-300">
            If you connected your WhatsApp Business Account (WABA) or Facebook Login with NexWhat and wish to delete your connection and data through Meta:
          </p>
          <ol class="list-decimal pl-5 space-y-2.5 text-slate-300">
            <li>
              Log into your Facebook account and navigate to <strong>Settings & Privacy</strong> &rarr; <strong>Settings</strong>.
            </li>
            <li>
              In the left navigation sidebar, click on <strong>Apps and Websites</strong> (or visit <a href="https://www.facebook.com/settings?tab=applications" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline inline-flex items-center gap-1">Facebook Apps & Websites Settings <ExternalLink class="h-3 w-3" /></a>).
            </li>
            <li>
              Locate <strong>NexWhat</strong> (or <strong>Nexteir</strong>) in the list of active apps.
            </li>
            <li>
              Click <strong>View and edit</strong> or click the <strong>Remove</strong> button.
            </li>
            <li>
              Check the box that asks if you want Facebook to <strong>delete all posts, videos, or events</strong> and notify NexWhat to delete your app data.
            </li>
            <li>
              Click <strong>Remove</strong> to confirm. Meta will notify our systems and your access token will be immediately revoked.
            </li>
          </ol>
        </section>

        <!-- Section 2: In-App Self-Serve Deletion -->
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Trash2 class="h-4 w-4 text-emerald-400" />
            Method 2: Self-Serve In-App Account & WhatsApp Deletion
          </h2>
          <p class="mb-3 text-slate-300">
            Organization administrators can purge WhatsApp accounts and customer data directly from the NexWhat dashboard:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong>Unlink WhatsApp Account:</strong> Go to <strong>Settings &rarr; Accounts</strong>, select your WhatsApp number, and click <strong>Disconnect / Delete Account</strong>. This unregisters your webhook and revokes the system user token.
            </li>
            <li>
              <strong>Purge Contacts & Messages:</strong> You can bulk-select contacts in <strong>Contacts</strong> and click <strong>Delete</strong>, which permanently wipes contact phone numbers, conversation transcripts, and chat logs.
            </li>
            <li>
              <strong>Full Organization Deletion:</strong> Go to <strong>Settings &rarr; General / Organization</strong> and click <strong>Delete Organization</strong>.
            </li>
          </ul>
        </section>

        <!-- Section 3: Manual Deletion Request -->
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Mail class="h-4 w-4 text-emerald-400" />
            Method 3: Submit a Manual Data Deletion Request
          </h2>
          <p class="mb-3 text-slate-300">
            You can also submit an official data deletion request directly to our Data Protection team. Please include:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-slate-300 mb-4">
            <li>Your registered business email address</li>
            <li>Your WhatsApp Business Account (WABA) ID or Phone Number ID (if applicable)</li>
            <li>The subject line: <code class="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">Meta WhatsApp Data Deletion Request</code></li>
          </ul>
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p class="text-xs text-slate-400">Direct Privacy & Compliance Desk:</p>
              <p class="text-emerald-400 font-mono text-sm font-semibold">
                privacy@nexteir.in • support@nexteir.in
              </p>
              <p class="text-xs text-slate-500 mt-1">
                Website: <a href="https://www.nexteir.in" class="hover:underline text-slate-400">nexteir.in</a> / <a href="https://www.nexteir.com" class="hover:underline text-slate-400">nexteir.com</a>
              </p>
            </div>
            <a
              href="mailto:privacy@nexteir.in?subject=Meta%20WhatsApp%20Data%20Deletion%20Request"
              class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              Email Privacy Desk
            </a>
          </div>
        </section>

        <!-- Section 4: What Happens to Data -->
        <section class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Clock class="h-4 w-4 text-emerald-400" />
            Data Deletion Scope & Retention Timeline
          </h2>
          <div class="space-y-3 text-slate-300 text-xs sm:text-sm">
            <div class="flex items-start gap-2.5">
              <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong class="text-white">Instant Token Revocation:</strong> Your Meta system user tokens, access credentials, and webhook endpoints are deactivated immediately.
              </div>
            </div>
            <div class="flex items-start gap-2.5">
              <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong class="text-white">Message & Contact Purge:</strong> All synced customer contacts, message histories, media files, and IVR recordings are permanently removed from production databases.
              </div>
            </div>
            <div class="flex items-start gap-2.5">
              <CheckCircle2 class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong class="text-white">Backup Expiration:</strong> Encrypted operational backups are purged according to our 30-day rolling rotation cycle, after which zero trace of the data remains.
              </div>
            </div>
            <div class="flex items-start gap-2.5">
              <AlertCircle class="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong class="text-white">Meta Cloud API Billing:</strong> Because NexWhat uses the Direct Meta Cloud API Billing model, any subscription or message fee billing records held directly by Meta Platforms, Inc. must be managed in your Meta Business Manager account.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <PublicFooter />
  </div>
</template>
