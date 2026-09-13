<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePlansStore, type SubscriptionPlan } from '@/stores/plans'
import {
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Building2,
  Users,
  PhoneCall,
  MessageSquare,
  ArrowUpRight,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Lock,
  Layers
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'vue-sonner'

useI18n()
const plansStore = usePlansStore()

const isUpgradeModalOpen = ref(false)
const selectedTargetPlan = ref<SubscriptionPlan | null>(null)
const isAnnualBilling = ref(true)

// Simulated active organization subscription details
const orgSubscription = ref({
  planId: 'growth' as 'starter' | 'growth' | 'pro',
  cycle: 'annual',
  status: 'active',
  renewalDate: '2027-08-28',
  wabaId: 'waba_904820194829',
  phoneNumbersUsed: 2,
  contactsUsed: 14200,
  agentsUsed: 4,
  conversationsUsed: 48920,
  paymentMethod: {
    brand: 'Visa',
    last4: '4092',
    exp: '11/28'
  }
})

const activePlan = computed(() => {
  return plansStore.plans.find(p => p.id === orgSubscription.value.planId) || plansStore.plans[1]
})

// Quota calculations
const contactsPercent = computed(() => {
  const max = activePlan.value.limits.contacts
  return Math.min(100, Math.round((orgSubscription.value.contactsUsed / max) * 100))
})

const numbersPercent = computed(() => {
  const max = activePlan.value.limits.phoneNumbers
  return Math.min(100, Math.round((orgSubscription.value.phoneNumbersUsed / max) * 100))
})

const agentsPercent = computed(() => {
  const max = activePlan.value.limits.agentSeats
  return Math.min(100, Math.round((orgSubscription.value.agentsUsed / max) * 100))
})

const conversationsPercent = computed(() => {
  const max = activePlan.value.limits.conversationsPerMonth
  return Math.min(100, Math.round((orgSubscription.value.conversationsUsed / max) * 100))
})

// Invoices history
const invoices = ref([
  {
    id: 'INV-2026-0828',
    date: '28 Aug 2026',
    description: 'Growth Plan • Annual Billing',
    amount: '₹5,748',
    status: 'paid',
    receiptUrl: '#'
  },
  {
    id: 'INV-2025-0828',
    date: '28 Aug 2025',
    description: 'Starter Plan • Annual Billing',
    amount: '₹2,868',
    status: 'paid',
    receiptUrl: '#'
  }
])

function openUpgradeModal(plan?: SubscriptionPlan) {
  selectedTargetPlan.value = plan || activePlan.value
  isUpgradeModalOpen.value = true
}

function handleSelectPlan(plan: SubscriptionPlan) {
  selectedTargetPlan.value = plan
}

function handleConfirmPlanSwitch() {
  if (!selectedTargetPlan.value) return
  
  orgSubscription.value.planId = selectedTargetPlan.value.id
  plansStore.setOrgPlan(selectedTargetPlan.value.id)
  isUpgradeModalOpen.value = false
  toast.success(`Successfully switched to ${selectedTargetPlan.value.name} Plan!`)
}

function handleDownloadReceipt(invoiceId: string) {
  toast.info(`Generating official PDF receipt for ${invoiceId}...`)
  setTimeout(() => {
    toast.success(`Receipt downloaded for ${invoiceId}`)
  }, 800)
}
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white light:text-gray-900 flex items-center gap-2.5">
          <CreditCard class="h-6 w-6 text-emerald-400" />
          Subscription & Billing Management
        </h1>
        <p class="text-xs text-slate-400 light:text-gray-500 mt-1">
          Manage your SaaS plan tier, live resource quotas, Meta Model 1 direct billing, and payment invoices.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          class="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 text-xs gap-1.5"
          @click="openUpgradeModal()"
        >
          <Sparkles class="h-3.5 w-3.5" />
          Change Plan
        </Button>
      </div>
    </div>

    <!-- Active Subscription Tier Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="lg:col-span-2 border-white/[0.08] bg-[#0c0e17]/80 backdrop-blur-sm relative overflow-hidden">
        <!-- Glow top highlight -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers class="h-5 w-5" />
              </div>
              <div>
                <CardTitle class="text-lg text-white font-bold flex items-center gap-2">
                  {{ activePlan.name }} Plan
                  <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </CardTitle>
                <CardDescription class="text-xs text-slate-400 mt-0.5">
                  {{ activePlan.description }}
                </CardDescription>
              </div>
            </div>

            <div class="text-right">
              <div class="text-xl font-extrabold text-white">
                ₹{{ orgSubscription.cycle === 'annual' ? activePlan.annualPrice : activePlan.monthlyPrice }}
                <span class="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <div class="text-[11px] text-emerald-400 font-medium">
                {{ orgSubscription.cycle === 'annual' ? 'Billed Annually (20% Off)' : 'Billed Monthly' }}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent class="space-y-4 pt-2">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div>
              <div class="text-[11px] text-slate-400">Billing Cycle</div>
              <div class="text-xs font-semibold text-white mt-0.5 capitalize">{{ orgSubscription.cycle }} Subscription</div>
            </div>
            <div>
              <div class="text-[11px] text-slate-400">Next Renewal Date</div>
              <div class="text-xs font-semibold text-emerald-400 mt-0.5 flex items-center gap-1">
                <Clock class="h-3 w-3" />
                {{ orgSubscription.renewalDate }}
              </div>
            </div>
            <div>
              <div class="text-[11px] text-slate-400">Linked Payment Method</div>
              <div class="text-xs font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <CreditCard class="h-3 w-3 text-slate-400" />
                {{ orgSubscription.paymentMethod.brand }} •••• {{ orgSubscription.paymentMethod.last4 }}
              </div>
            </div>
          </div>

          <!-- Included Features Pills -->
          <div>
            <div class="text-xs font-semibold text-slate-300 mb-2">Included in Your Plan:</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div
                v-for="(feat, idx) in activePlan.features"
                :key="idx"
                class="flex items-center gap-2 text-xs"
                :class="feat.included ? 'text-slate-200' : 'text-slate-500 opacity-60'"
              >
                <CheckCircle2 v-if="feat.included" class="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span v-else class="h-3.5 w-3.5 rounded-full border border-slate-700 flex items-center justify-center text-[9px] text-slate-500">✕</span>
                <span>{{ feat.name }}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter class="border-t border-white/[0.05] pt-3 flex items-center justify-between">
          <span class="text-[11px] text-slate-400">Want higher broadcast limits or more phone numbers?</span>
          <Button size="sm" class="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs gap-1" @click="openUpgradeModal()">
            Upgrade Workspace
            <ArrowUpRight class="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>

      <!-- Model 1 Direct Meta Cloud API Telemetry -->
      <Card class="border-white/[0.08] bg-[#090c14] flex flex-col justify-between">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Zap class="h-4 w-4" />
            Meta Model 1 Direct Billing
          </div>
          <CardTitle class="text-sm font-bold text-white mt-1">
            0% Markup On Conversations
          </CardTitle>
          <CardDescription class="text-xs text-slate-400 leading-relaxed">
            WhatsApp conversation charges are billed directly by Meta Platforms to your credit card on file in Meta Business Manager.
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-3">
          <div class="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 text-xs space-y-2">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-slate-400">Meta WABA Status:</span>
              <span class="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 class="h-3 w-3" /> Connected
              </span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-slate-400">WABA Account ID:</span>
              <span class="font-mono text-white text-[10px]">{{ orgSubscription.wabaId }}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-slate-400">NexWhat Surcharge:</span>
              <span class="text-emerald-400 font-extrabold font-mono">₹0.00 / msg (0%)</span>
            </div>
          </div>
        </CardContent>

        <CardFooter class="border-t border-white/[0.05] pt-3">
          <a
            href="https://business.facebook.com/billing_hub/payment_settings"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            Manage Meta Payment Methods
            <ExternalLink class="h-3 w-3" />
          </a>
        </CardFooter>
      </Card>
    </div>

    <!-- Live Resource Quota Progress Meters -->
    <div class="space-y-3">
      <h2 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
        <Sparkles class="h-4 w-4 text-emerald-400" />
        Live Plan Resource Consumption
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Contacts Quota -->
        <Card class="border-white/[0.08] bg-[#0c0e17]/60">
          <CardContent class="p-4 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400">Contacts Stored</span>
              <Users class="h-4 w-4 text-emerald-400" />
            </div>
            <div class="text-xl font-bold text-white">
              {{ orgSubscription.contactsUsed.toLocaleString() }}
              <span class="text-xs font-normal text-slate-400">/ {{ activePlan.limits.contacts.toLocaleString() }}</span>
            </div>
            <div class="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${contactsPercent}%` }"
              />
            </div>
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>{{ contactsPercent }}% utilized</span>
              <span>{{ (activePlan.limits.contacts - orgSubscription.contactsUsed).toLocaleString() }} left</span>
            </div>
          </CardContent>
        </Card>

        <!-- Phone Numbers Quota -->
        <Card class="border-white/[0.08] bg-[#0c0e17]/60">
          <CardContent class="p-4 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400">WhatsApp Numbers</span>
              <PhoneCall class="h-4 w-4 text-cyan-400" />
            </div>
            <div class="text-xl font-bold text-white">
              {{ orgSubscription.phoneNumbersUsed }}
              <span class="text-xs font-normal text-slate-400">/ {{ activePlan.limits.phoneNumbers }} numbers</span>
            </div>
            <div class="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-cyan-500 to-teal-400 h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${numbersPercent}%` }"
              />
            </div>
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>{{ numbersPercent }}% quota used</span>
              <span>{{ activePlan.limits.phoneNumbers - orgSubscription.phoneNumbersUsed }} available</span>
            </div>
          </CardContent>
        </Card>

        <!-- Agent Seats Quota -->
        <Card class="border-white/[0.08] bg-[#0c0e17]/60">
          <CardContent class="p-4 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400">Team Agent Seats</span>
              <Building2 class="h-4 w-4 text-teal-400" />
            </div>
            <div class="text-xl font-bold text-white">
              {{ orgSubscription.agentsUsed }}
              <span class="text-xs font-normal text-slate-400">/ {{ activePlan.limits.agentSeats }} seats</span>
            </div>
            <div class="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-teal-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${agentsPercent}%` }"
              />
            </div>
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>{{ agentsPercent }}% seats assigned</span>
              <span>{{ activePlan.limits.agentSeats - orgSubscription.agentsUsed }} free</span>
            </div>
          </CardContent>
        </Card>

        <!-- Monthly Conversations Quota -->
        <Card class="border-white/[0.08] bg-[#0c0e17]/60">
          <CardContent class="p-4 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-400">Monthly Conversations</span>
              <MessageSquare class="h-4 w-4 text-emerald-400" />
            </div>
            <div class="text-xl font-bold text-white">
              {{ orgSubscription.conversationsUsed.toLocaleString() }}
              <span class="text-xs font-normal text-slate-400">/ {{ activePlan.limits.conversationsPerMonth.toLocaleString() }}</span>
            </div>
            <div class="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-gradient-to-r from-emerald-400 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${conversationsPercent}%` }"
              />
            </div>
            <div class="flex justify-between text-[10px] text-slate-400">
              <span>{{ conversationsPercent }}% of quota</span>
              <span>Resets in 14 days</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Invoice & Payment History -->
    <Card class="border-white/[0.08] bg-[#0c0e17]/80">
      <CardHeader class="pb-3">
        <CardTitle class="text-base text-white font-bold flex items-center justify-between">
          <span>Billing History & Tax Invoices</span>
          <span class="text-xs font-normal text-slate-400">Auto-generated GST compliant receipts</span>
        </CardTitle>
      </CardHeader>

      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead class="text-[11px] font-semibold text-slate-400 uppercase bg-white/[0.02] border-y border-white/[0.06]">
              <tr>
                <th class="px-6 py-3">Invoice Number</th>
                <th class="px-6 py-3">Date</th>
                <th class="px-6 py-3">Description</th>
                <th class="px-6 py-3">Amount</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/[0.04]">
              <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-white/[0.02] transition-colors">
                <td class="px-6 py-3.5 font-mono text-emerald-400 font-medium">{{ inv.id }}</td>
                <td class="px-6 py-3.5 text-slate-300">{{ inv.date }}</td>
                <td class="px-6 py-3.5 text-white font-medium">{{ inv.description }}</td>
                <td class="px-6 py-3.5 font-bold text-white">{{ inv.amount }}</td>
                <td class="px-6 py-3.5">
                  <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[10px] font-bold uppercase tracking-wider">
                    Paid
                  </span>
                </td>
                <td class="px-6 py-3.5 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-7 text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] gap-1"
                    @click="handleDownloadReceipt(inv.id)"
                  >
                    <Download class="h-3 w-3" />
                    PDF
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <!-- Plan Upgrade & Switcher Modal -->
    <Dialog v-model:open="isUpgradeModalOpen">
      <DialogContent class="max-w-3xl bg-[#090b12] border-white/[0.1] text-white">
        <DialogHeader>
          <DialogTitle class="text-xl font-bold flex items-center gap-2 text-white">
            <Sparkles class="h-5 w-5 text-emerald-400" />
            Switch Workspace Subscription Tier
          </DialogTitle>
          <DialogDescription class="text-xs text-slate-400">
            Choose the best plan tier for your business scale. Changes take effect immediately.
          </DialogDescription>
        </DialogHeader>

        <div class="py-4 space-y-4">
          <!-- Billing cycle toggle -->
          <div class="flex items-center justify-center gap-2">
            <button
              class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              :class="!isAnnualBilling ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'"
              @click="isAnnualBilling = false"
            >
              Monthly Billing
            </button>
            <button
              class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              :class="isAnnualBilling ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'"
              @click="isAnnualBilling = true"
            >
              Annual Billing
              <span class="text-[9px] font-extrabold uppercase px-1 py-0.2 rounded bg-black/20 text-black">Save 20%</span>
            </button>
          </div>

          <!-- Dynamic Plans Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              v-for="plan in plansStore.plans"
              :key="plan.id"
              class="p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between"
              :class="[
                selectedTargetPlan?.id === plan.id
                  ? 'border-emerald-500 bg-emerald-500/[0.06] shadow-xl shadow-emerald-500/10'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.2]',
                plan.id === orgSubscription.planId ? 'ring-1 ring-emerald-400/40' : ''
              ]"
              @click="handleSelectPlan(plan)"
            >
              <div v-if="plan.id === orgSubscription.planId" class="absolute -top-2.5 right-3 text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                CURRENT PLAN
              </div>

              <div>
                <h3 class="text-sm font-bold text-white">{{ plan.name }}</h3>
                <p class="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{{ plan.description }}</p>

                <div class="mt-3">
                  <div class="text-xl font-extrabold text-white">
                    ₹{{ isAnnualBilling ? plan.annualPrice : plan.monthlyPrice }}
                    <span class="text-[10px] font-normal text-slate-400">/ mo</span>
                  </div>
                </div>

                <div class="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5 text-[11px] text-slate-300">
                  <div class="flex items-center gap-1.5">
                    <CheckCircle2 class="h-3 w-3 text-emerald-400" />
                    <span>{{ plan.limits.phoneNumbers }} WhatsApp Number{{ plan.limits.phoneNumbers > 1 ? 's' : '' }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <CheckCircle2 class="h-3 w-3 text-emerald-400" />
                    <span>{{ plan.limits.contacts.toLocaleString() }} Contacts</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <CheckCircle2 class="h-3 w-3 text-emerald-400" />
                    <span>{{ plan.limits.agentSeats }} Agent Seats</span>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-white/[0.06]">
                <div class="w-full py-1.5 text-center text-xs font-semibold rounded-xl"
                  :class="selectedTargetPlan?.id === plan.id ? 'bg-emerald-500 text-black font-bold' : 'bg-white/[0.05] text-slate-300'"
                >
                  {{ selectedTargetPlan?.id === plan.id ? 'Selected' : 'Select Plan' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter class="border-t border-white/[0.08] pt-3">
          <Button variant="outline" size="sm" class="border-white/[0.1] text-slate-400 hover:text-white" @click="isUpgradeModalOpen = false">
            Cancel
          </Button>
          <Button size="sm" class="bg-emerald-500 hover:bg-emerald-600 text-black font-bold" @click="handleConfirmPlanSwitch">
            Confirm & Update Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
