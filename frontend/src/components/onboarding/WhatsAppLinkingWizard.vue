<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Sparkles,
  ArrowRight,
  Loader2,
  Headphones,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { api } from '@/services/api'
import { toast } from 'vue-sonner'
import { getErrorMessage } from '@/lib/api-utils'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'connected'): void
}>()

// State
const isFBSDKLoaded = ref(false)
const isConnectingFB = ref(false)
const whatsappConfig = ref<{ app_id: string; config_id: string; api_version: string } | null>(null)
const fbConfigError = ref(false)
const showAdvanced = ref(false)
const showConcierge = ref(false)

// Advanced manual inputs (hidden by default)
const manualBusinessName = ref('')
const manualWabaId = ref('')
const manualPhoneId = ref('')
const manualAccessToken = ref('')
const isSavingManual = ref(false)

// Concierge inputs
const conciergePhone = ref('')
const conciergeBusiness = ref('')
const isSubmittingConcierge = ref(false)
const isConciergeBooked = ref(false)

onMounted(async () => {
  await fetchWhatsAppConfig()
})

async function fetchWhatsAppConfig() {
  try {
    const response = await api.get('/embedded-signup/config')
    whatsappConfig.value = {
      app_id: response.data.data.whatsapp_app_id,
      config_id: response.data.data.whatsapp_config_id,
      api_version: response.data.data.whatsapp_api_version || 'v21.0'
    }
    if (whatsappConfig.value.app_id && whatsappConfig.value.config_id) {
      loadFacebookSDK()
    } else {
      fbConfigError.value = true
    }
  } catch (error: any) {
    console.error('Failed to fetch WhatsApp config:', error)
    fbConfigError.value = true
  }
}

function loadFacebookSDK() {
  if ((window as any).FB) {
    isFBSDKLoaded.value = true
    return
  }

  const script = document.createElement('script')
  script.src = 'https://connect.facebook.net/en_US/sdk.js'
  script.async = true
  script.defer = true
  script.onload = () => {
    ;(window as any).FB.init({
      appId: whatsappConfig.value!.app_id,
      cookie: true,
      xfbml: true,
      version: whatsappConfig.value!.api_version
    })
    isFBSDKLoaded.value = true
  }
  document.body.appendChild(script)
}

function launch1ClickMetaConnect() {
  if (!isFBSDKLoaded.value || !(window as any).FB) {
    if (fbConfigError.value) {
      toast.info('Please contact support or configure WhatsApp settings.')
      return
    }
    toast.error('Connecting to Meta. Please wait a moment and try again...')
    return
  }

  isConnectingFB.value = true

  let sessionPhoneNumberId = ''
  let sessionWabaId = ''
  let authCode = ''
  let hasExchanged = false
  let fallbackTimer: any = null

  const doExchange = () => {
    if (hasExchanged || !authCode) return
    hasExchanged = true
    if (fallbackTimer) clearTimeout(fallbackTimer)
    window.removeEventListener('message', sessionInfoListener)
    exchangeCodeForToken(authCode, sessionPhoneNumberId, sessionWabaId)
  }

  const sessionInfoListener = (event: MessageEvent) => {
    if (!event.origin || (!event.origin.includes('facebook.com') && !event.origin.includes('meta.com'))) {
      return
    }
    try {
      const raw = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
      if (!raw) return

      const payload = raw.data?.sessionInfo || raw.sessionInfo || raw.data || raw
      const pId = payload?.phone_number_id || payload?.phoneNumberId || raw.phone_number_id || raw.data?.phone_number_id
      const wId = payload?.waba_id || payload?.wabaId || payload?.account_id || raw.waba_id || raw.data?.waba_id
      if (pId) sessionPhoneNumberId = String(pId)
      if (wId) sessionWabaId = String(wId)

      if (authCode && (sessionWabaId || sessionPhoneNumberId)) {
        doExchange()
      }
    } catch {
      // ignore
    }
  }

  window.addEventListener('message', sessionInfoListener)

  const loginOptions: any = {
    config_id: whatsappConfig.value!.config_id,
    response_type: 'code',
    override_default_response_type: true,
    extras: {
      setup: {},
      sessionInfoVersion: '2'
    }
  }

  ;(window as any).FB.login(
    (response: any) => {
      if (response.authResponse && response.authResponse.code) {
        authCode = response.authResponse.code
        if (response.authResponse.phone_number_id) sessionPhoneNumberId = String(response.authResponse.phone_number_id)
        if (response.authResponse.waba_id) sessionWabaId = String(response.authResponse.waba_id)

        if (sessionPhoneNumberId || sessionWabaId) {
          doExchange()
        } else {
          fallbackTimer = setTimeout(() => {
            doExchange()
          }, 2000)
        }
      } else if (response.error) {
        if (fallbackTimer) clearTimeout(fallbackTimer)
        window.removeEventListener('message', sessionInfoListener)
        toast.error(`Meta error: ${response.error.message || 'Authorization failed'}`)
        isConnectingFB.value = false
      } else {
        if (fallbackTimer) clearTimeout(fallbackTimer)
        window.removeEventListener('message', sessionInfoListener)
        toast.info('Meta connection was closed or cancelled.')
        isConnectingFB.value = false
      }
    },
    loginOptions
  )
}

async function exchangeCodeForToken(code: string, phoneNumberId: string, wabaId: string) {
  try {
    await api.post('/accounts/exchange-token', {
      code,
      phone_id: phoneNumberId,
      waba_id: wabaId
    })

    toast.success('WhatsApp Business line connected successfully!')
    emit('connected')
    emit('update:open', false)
  } catch (error: any) {
    toast.error(getErrorMessage(error, 'Failed to link WhatsApp account. Please try again.'))
  } finally {
    isConnectingFB.value = false
  }
}

async function handleSaveManualCredentials() {
  if (!manualWabaId.value.trim() || !manualPhoneId.value.trim() || !manualAccessToken.value.trim()) {
    toast.error('Please fill in all required credentials.')
    return
  }

  isSavingManual.value = true
  try {
    await api.post('/accounts', {
      name: manualBusinessName.value.trim() || 'WhatsApp Business Line',
      phone_id: manualPhoneId.value.trim(),
      business_id: manualWabaId.value.trim(),
      access_token: manualAccessToken.value.trim(),
      api_version: whatsappConfig.value?.api_version || 'v21.0',
      is_default_incoming: true,
      is_default_outgoing: true
    })

    toast.success('WhatsApp Account linked successfully!')
    emit('connected')
    emit('update:open', false)
  } catch (error: any) {
    toast.error(getErrorMessage(error, 'Failed to link WhatsApp account.'))
  } finally {
    isSavingManual.value = false
  }
}

async function handleConciergeSubmit() {
  if (!conciergePhone.value.trim()) {
    toast.error('Please enter your WhatsApp contact number.')
    return
  }

  isSubmittingConcierge.value = true
  try {
    await api.post('/onboarding/concierge-request', {
      business_name: conciergeBusiness.value || 'My Business',
      phone_number: conciergePhone.value,
      contact_channel: 'whatsapp',
      preferred_slot: 'instant'
    })
  } catch (e) {
    // ignore
  } finally {
    isSubmittingConcierge.value = false
    isConciergeBooked.value = true
  }

  const msg = encodeURIComponent(
    `Hi NexWhat team! Please help me connect my WhatsApp number (+${conciergePhone.value}) for "${conciergeBusiness.value || 'My Business'}".`
  )
  window.open(`https://wa.me/919999999999?text=${msg}`, '_blank')
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-lg bg-[#0e131d] border border-white/10 text-white p-0 shadow-2xl rounded-2xl overflow-hidden">
      <!-- Concierge Mode -->
      <div v-if="showConcierge" class="p-6 space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <Headphones class="h-4 w-4" />
            <span>Free Setup Assistance</span>
          </div>
          <button
            type="button"
            @click="showConcierge = false"
            class="text-xs text-slate-400 hover:text-white"
          >
            &larr; Back to standard setup
          </button>
        </div>

        <div class="space-y-1.5">
          <h3 class="text-lg font-bold text-white">Need help connecting?</h3>
          <p class="text-xs text-slate-300">
            Our onboarding team can assist you on WhatsApp chat to set up your Meta Business Account and number.
          </p>
        </div>

        <div v-if="!isConciergeBooked" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Business Name</label>
            <input
              type="text"
              v-model="conciergeBusiness"
              placeholder="e.g. Acme Store"
              class="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Your WhatsApp Number</label>
            <input
              type="tel"
              v-model="conciergePhone"
              placeholder="e.g. +91 98765 43210"
              class="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="button"
            :disabled="isSubmittingConcierge"
            @click="handleConciergeSubmit"
            class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            <Loader2 v-if="isSubmittingConcierge" class="h-4 w-4 animate-spin" />
            <span v-else>Chat with Specialist on WhatsApp</span>
          </button>
        </div>

        <div v-else class="p-4 text-center space-y-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 class="h-7 w-7 text-emerald-400 mx-auto" />
          <h4 class="text-sm font-bold text-white">We're on it!</h4>
          <p class="text-xs text-slate-300">
            WhatsApp conversation opened. A specialist is ready to assist you.
          </p>
        </div>
      </div>

      <!-- Main Client View: 1-Click Meta Login -->
      <div v-else class="p-6 sm:p-7 space-y-6">
        <!-- Header -->
        <div class="space-y-1.5 text-center sm:text-left">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold mb-1">
            <Sparkles class="h-3 w-3" />
            <span>Official WhatsApp Partner</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Connect with Meta
          </h2>
          <p class="text-xs sm:text-sm text-slate-300">
            Log in with your Facebook account to connect or register your WhatsApp Business number.
          </p>
        </div>

        <!-- Primary Connect Button Card -->
        <div class="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-4">
          <button
            type="button"
            :disabled="isConnectingFB"
            @click="launch1ClickMetaConnect"
            class="w-full py-3.5 px-6 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
          >
            <Loader2 v-if="isConnectingFB" class="h-5 w-5 animate-spin" />
            <template v-else>
              <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Log in with Facebook / Meta</span>
            </template>
          </button>

          <p class="text-[11px] text-slate-400">
            A secure Meta popup will open. No technical setup required.
          </p>
        </div>

        <!-- 3 Quick Steps -->
        <div class="space-y-2.5">
          <div class="text-xs font-semibold text-slate-300">What happens next:</div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
            <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div class="text-xs font-bold text-emerald-400 mb-0.5">1. Log In</div>
              <p class="text-[11px] text-slate-400">Sign in with the Facebook profile that manages your business.</p>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div class="text-xs font-bold text-teal-400 mb-0.5">2. Select Number</div>
              <p class="text-[11px] text-slate-400">Choose your existing WhatsApp business number or add a new one.</p>
            </div>
            <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div class="text-xs font-bold text-cyan-400 mb-0.5">3. Verify via SMS</div>
              <p class="text-[11px] text-slate-400">Enter the 6-digit verification code sent by WhatsApp.</p>
            </div>
          </div>
        </div>

        <!-- Footer / Support Link -->
        <div class="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/[0.08]">
          <span class="flex items-center gap-1.5">
            <ShieldCheck class="h-4 w-4 text-emerald-400" />
            Official Meta Cloud API
          </span>

          <button
            type="button"
            @click="showConcierge = true"
            class="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
          >
            Need help? Chat with us
          </button>
        </div>

        <!-- Subtle Advanced Toggle -->
        <div class="pt-1">
          <button
            type="button"
            @click="showAdvanced = !showAdvanced"
            class="text-[11px] text-slate-400 hover:text-slate-300 flex items-center gap-1 mx-auto"
          >
            <span>Advanced options</span>
            <ChevronDown v-if="!showAdvanced" class="h-3 w-3" />
            <ChevronUp v-else class="h-3 w-3" />
          </button>

          <!-- Collapsible Manual Form -->
          <div v-if="showAdvanced" class="mt-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div class="text-xs font-semibold text-slate-300">Manual API Connection</div>
            <div>
              <input
                type="text"
                v-model="manualBusinessName"
                placeholder="Business Name"
                class="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white mb-2"
              />
              <input
                type="text"
                v-model="manualPhoneId"
                placeholder="Phone Number ID"
                class="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white mb-2"
              />
              <input
                type="text"
                v-model="manualWabaId"
                placeholder="WABA ID"
                class="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white mb-2"
              />
              <input
                type="password"
                v-model="manualAccessToken"
                placeholder="System User Access Token"
                class="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white mb-2 font-mono"
              />
              <button
                type="button"
                :disabled="isSavingManual"
                @click="handleSaveManualCredentials"
                class="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                <Loader2 v-if="isSavingManual" class="h-4 w-4 animate-spin mx-auto" />
                <span v-else>Save Manual Credentials</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
