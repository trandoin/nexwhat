<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Smartphone
} from 'lucide-vue-next'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { api } from '@/services/api'
import { toast } from 'vue-sonner'
import { getErrorMessage } from '@/lib/api-utils'

const props = defineProps<{
  open: boolean
  account?: any
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'sent', result: any): void
}>()

const router = useRouter()

// Form state
const recipientPhone = ref('')
const customMessage = ref('')
const isCustom = ref(false)
const isSending = ref(false)
const testSuccess = ref(false)
const sendResult = ref<{
  message_id?: string
  contact_id?: string
  phone_number?: string
  content?: string
} | null>(null)

const activeAccountName = computed(() => {
  return props.account?.name || 'Your Business'
})

const activePhoneDisplay = computed(() => {
  return props.account?.phone_number || props.account?.phone_id || ''
})

const previewText = computed(() => {
  if (isCustom.value && customMessage.value.trim()) {
    return customMessage.value.trim()
  }
  return `Hello! 👋 This is a test message from ${activeAccountName.value} via NexWhat. Your WhatsApp Business connection is active and ready!`
})

async function handleSendTestMessage() {
  const cleanedPhone = recipientPhone.value.replace(/[\s+-]/g, '')
  if (!cleanedPhone) {
    toast.error('Please enter your mobile number with country code (e.g. 919876543210)')
    return
  }

  if (cleanedPhone.length < 8) {
    toast.error('Please enter a valid mobile number with country code.')
    return
  }

  if (!props.account?.id) {
    toast.error('No connected WhatsApp account found.')
    return
  }

  isSending.value = true
  try {
    const res = await api.post(`/accounts/${props.account.id}/send-test`, {
      recipient_phone: cleanedPhone,
      message_type: isCustom.value ? 'text' : 'template',
      custom_text: previewText.value
    })

    const data = res.data?.data || res.data
    if (data.success === false) {
      toast.error(data.error || 'Failed to send test message.')
      return
    }

    sendResult.value = data
    testSuccess.value = true
    toast.success('Test message sent to your WhatsApp!')
    emit('sent', data)
  } catch (error: any) {
    toast.error(getErrorMessage(error, 'Could not send test message. Check that the phone number is correct.'))
  } finally {
    isSending.value = false
  }
}

function handleGoToChat() {
  emit('update:open', false)
  if (sendResult.value?.contact_id) {
    router.push(`/chat/${sendResult.value.contact_id}`)
  } else {
    router.push('/chat')
  }
}

function handleClose() {
  testSuccess.value = false
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-md bg-[#0f141c] border border-white/10 text-white p-0 shadow-2xl rounded-2xl overflow-hidden">
      <!-- Success Screen -->
      <div v-if="testSuccess" class="p-6 sm:p-8 space-y-5 text-center">
        <div class="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 class="h-7 w-7" />
        </div>

        <div class="space-y-2">
          <h3 class="text-xl font-bold text-white">Test Message Sent!</h3>
          <p class="text-sm text-slate-300">
            We delivered a message to
            <span class="font-semibold text-emerald-400">+{{ sendResult?.phone_number || recipientPhone }}</span>.
            Check your WhatsApp to see how it appears to customers.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            @click="handleGoToChat"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare class="h-4 w-4" />
            <span>Open Live Inbox</span>
            <ArrowRight class="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            @click="handleClose"
            class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>

      <!-- Form Screen -->
      <div v-else class="p-6 space-y-5">
        <!-- Header -->
        <div class="space-y-1">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <Smartphone class="h-5 w-5 text-emerald-400" />
            Send a Test Message
          </h2>
          <p class="text-xs text-slate-400">
            Send a sample message to your own phone to test your WhatsApp connection.
          </p>
        </div>

        <!-- Sending From Line Badge -->
        <div v-if="activePhoneDisplay || activeAccountName" class="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs">
          <span class="text-slate-400">Sending from:</span>
          <span class="font-medium text-emerald-400 flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {{ activeAccountName }} {{ activePhoneDisplay ? `(${activePhoneDisplay})` : '' }}
          </span>
        </div>

        <!-- Phone Input -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-slate-200">
            Your WhatsApp Number
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
              +
            </span>
            <input
              v-model="recipientPhone"
              type="tel"
              placeholder="91 98765 43210 (Country code + Phone)"
              class="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>
          <p class="text-[11px] text-slate-400">
            Include country code (e.g., 91 for India, 1 for US/Canada, 44 for UK).
          </p>
        </div>

        <!-- Message Preview Box -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-slate-200">
              Message Preview
            </label>
            <button
              type="button"
              @click="isCustom = !isCustom"
              class="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
            >
              {{ isCustom ? 'Use default message' : 'Customize message' }}
            </button>
          </div>

          <textarea
            v-if="isCustom"
            v-model="customMessage"
            rows="2"
            placeholder="Type your custom test message..."
            class="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all resize-none"
          />

          <!-- WhatsApp Chat Bubble -->
          <div class="p-3 rounded-xl bg-[#0b141a] border border-white/[0.08]">
            <div class="max-w-[85%] p-2.5 rounded-xl rounded-tl-sm bg-[#005c4b] text-white text-[11px] leading-relaxed">
              <p>{{ previewText }}</p>
              <span class="block text-right text-[9px] text-emerald-200/70 mt-1">Now ✓✓</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-white/[0.08]">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="isSending"
            @click="handleSendTestMessage"
            class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            <Loader2 v-if="isSending" class="h-4 w-4 animate-spin" />
            <Send v-else class="h-3.5 w-3.5" />
            <span>Send Test Message</span>
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
