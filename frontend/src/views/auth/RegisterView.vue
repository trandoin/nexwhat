<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'vue-sonner'
import { MessageSquare, Loader2, CheckCircle2, ShieldCheck, Zap } from 'lucide-vue-next'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const companyName = ref('')
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const organizationId = computed(() => (route.query.org as string) || '')
const isInviteMode = computed(() => !!organizationId.value)

const handleRegister = async () => {
  if (!isInviteMode.value && !companyName.value.trim()) {
    toast.error('Please enter your company or workspace name')
    return
  }

  if (!fullName.value.trim() || !email.value.trim() || !password.value) {
    toast.error(t('auth.fillAllFields'))
    return
  }

  if (password.value !== confirmPassword.value) {
    toast.error(t('auth.passwordsMismatch'))
    return
  }

  if (password.value.length < 8) {
    toast.error(t('auth.passwordTooShort'))
    return
  }

  isLoading.value = true

  try {
    if (isInviteMode.value) {
      await authStore.register({
        full_name: fullName.value.trim(),
        email: email.value.trim(),
        password: password.value,
        organization_id: organizationId.value
      })
    } else {
      await authStore.register({
        company_name: companyName.value.trim(),
        full_name: fullName.value.trim(),
        email: email.value.trim(),
        password: password.value
      })
    }
    toast.success('Welcome to NexWhat! Your workspace is ready.')
    router.push('/dashboard')
  } catch (error: any) {
    const message = error.response?.data?.message || t('auth.registrationFailed')
    toast.error(message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#090a0f] relative overflow-hidden px-4 py-12">
    <!-- Ambient Glow Background -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
    <div class="absolute bottom-10 right-10 w-[350px] h-[350px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

    <div class="w-full max-w-lg relative z-10">
      <Card class="bg-[#11131a]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 rounded-2xl overflow-hidden">
        <CardHeader class="space-y-3 text-center pb-4 pt-8">
          <RouterLink to="/" class="inline-flex items-center justify-center gap-2.5 mx-auto group">
            <div class="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <MessageSquare class="h-6 w-6 text-slate-950 stroke-[2.5]" />
            </div>
            <span class="text-2xl font-black tracking-tight text-white">Nex<span class="text-emerald-400">What</span></span>
          </RouterLink>

          <div>
            <CardTitle class="text-2xl font-bold text-white tracking-tight">
              {{ isInviteMode ? 'Join Team Workspace' : 'Start Your 14-Day Free Trial' }}
            </CardTitle>
            <CardDescription class="text-slate-400 text-sm mt-1">
              {{ isInviteMode ? 'You have been invited to collaborate on WhatsApp' : 'Get enterprise-grade WhatsApp automation in under 3 minutes' }}
            </CardDescription>
          </div>

          <!-- Feature badges -->
          <div v-if="!isInviteMode" class="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-300">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
              <Zap class="h-3 w-3" /> Direct Meta Billing
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              <CheckCircle2 class="h-3 w-3 text-emerald-400" /> 0% Per-Message Markup
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              <ShieldCheck class="h-3 w-3 text-emerald-400" /> Meta Cloud API
            </span>
          </div>
        </CardHeader>

        <form @submit.prevent="handleRegister">
          <CardContent class="space-y-4 px-6 sm:px-8">
            <!-- Company Name (only in public SaaS signup) -->
            <div v-if="!isInviteMode" class="space-y-1.5">
              <Label for="companyName" class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Company / Business Name
              </Label>
              <Input
                id="companyName"
                v-model="companyName"
                type="text"
                placeholder="e.g. Acme Retail or FreshGrocer"
                class="bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
                :disabled="isLoading"
                required
              />
            </div>

            <!-- Full Name -->
            <div class="space-y-1.5">
              <Label for="fullName" class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {{ $t('auth.fullName') }}
              </Label>
              <Input
                id="fullName"
                v-model="fullName"
                type="text"
                :placeholder="$t('auth.fullNamePlaceholder')"
                class="bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
                :disabled="isLoading"
                autocomplete="name"
                required
              />
            </div>

            <!-- Email -->
            <div class="space-y-1.5">
              <Label for="email" class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Work Email
              </Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                :placeholder="$t('auth.emailPlaceholder')"
                class="bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11"
                :disabled="isLoading"
                autocomplete="email"
                required
              />
            </div>

            <!-- Password -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <Label for="password" class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {{ $t('auth.password') }}
                </Label>
                <Input
                  id="password"
                  v-model="password"
                  type="password"
                  :placeholder="$t('auth.passwordMinLength')"
                  class="bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11 text-sm"
                  :disabled="isLoading"
                  autocomplete="new-password"
                  required
                />
              </div>
              <div class="space-y-1.5">
                <Label for="confirmPassword" class="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Confirm
                </Label>
                <Input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  class="bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 h-11 text-sm"
                  :disabled="isLoading"
                  autocomplete="new-password"
                  required
                />
              </div>
            </div>

            <p class="text-[11px] text-slate-400 text-center pt-1 leading-relaxed">
              By creating an account, you agree to our Terms of Service & Privacy Policy. Direct Meta conversation fees apply directly via your Facebook Business Manager.
            </p>
          </CardContent>

          <CardFooter class="flex flex-col space-y-4 px-6 sm:px-8 pb-8 pt-2">
            <Button
              type="submit"
              class="w-full h-11 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              :disabled="isLoading"
            >
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isInviteMode ? 'Join Organization' : 'Create NexWhat Workspace' }}
            </Button>

            <div class="flex items-center justify-between w-full text-xs text-slate-400 pt-1 border-t border-white/5">
              <span>{{ $t('auth.alreadyHaveAccount') }}</span>
              <RouterLink to="/login" class="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                {{ $t('auth.signIn') }} &rarr;
              </RouterLink>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
</template>
