<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NexWhatLogo from '@/components/common/NexWhatLogo.vue'
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Send,
  Bot,
  PhoneCall,
  MessageSquare,
  FileText,
  ShoppingBag,
  GraduationCap,
  Building2,
  Landmark,
  Stethoscope,
  Car,
  Calendar,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const isMobileOpen = ref(false)
const activeDropdown = ref<'features' | 'industries' | null>(null)
const mobileExpandedSection = ref<'features' | 'industries' | null>(null)

function toggleDropdown(menu: 'features' | 'industries') {
  activeDropdown.value = activeDropdown.value === menu ? null : menu
}

function closeDropdowns() {
  activeDropdown.value = null
}

function handleLogout() {
  authStore.logout()
  router.push('/')
}

// Click outside listener
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.nav-dropdown-container')) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (!authStore.isAuthenticated) {
    authStore.restoreSession()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const servicesList = [
  {
    title: 'WhatsApp Broadcasts',
    desc: 'Send 100k+ messages with 98% open rates and CSV audience filters',
    to: '/services/broadcast',
    icon: Send,
    color: 'from-emerald-500 to-teal-400'
  },
  {
    title: 'AI & Visual Chatbots',
    desc: 'Automate customer queries 24/7 with zero-code flow builder & GPT',
    to: '/services/chatbot',
    icon: Bot,
    color: 'from-teal-500 to-cyan-400'
  },
  {
    title: 'Voice Calling & IVR',
    desc: 'Make and receive VoIP calls inside WhatsApp with multi-tier IVR',
    to: '/services/calling',
    icon: PhoneCall,
    color: 'from-blue-500 to-indigo-400'
  },
  {
    title: 'Shared Team Inbox',
    desc: 'Multi-agent customer support with round-robin routing & tags',
    to: '/services/inbox',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-400'
  },
  {
    title: 'WhatsApp Flows & Forms',
    desc: 'Interactive native forms for lead capture, surveys, and bookings',
    to: '/services/flows',
    icon: FileText,
    color: 'from-amber-500 to-orange-400'
  }
]

const industriesList = [
  {
    title: 'E-Commerce & D2C',
    desc: 'Automate abandoned carts, COD confirmation & shipping updates',
    to: '/industries/ecommerce',
    icon: ShoppingBag,
    color: 'text-emerald-400 bg-emerald-500/10'
  },
  {
    title: 'Education & EdTech',
    desc: 'Capture admission leads, share exam schedules & course fees',
    to: '/industries/education',
    icon: GraduationCap,
    color: 'text-teal-400 bg-teal-500/10'
  },
  {
    title: 'Real Estate & PropTech',
    desc: 'Book property site visits & dispatch virtual brochures automatically',
    to: '/industries/real-estate',
    icon: Building2,
    color: 'text-cyan-400 bg-cyan-500/10'
  },
  {
    title: 'Finance & Banking',
    desc: 'Send KYC reminders, account statements & loan status alerts',
    to: '/industries/finance',
    icon: Landmark,
    color: 'text-amber-400 bg-amber-500/10'
  },
  {
    title: 'Healthcare & Clinics',
    desc: 'Book doctor appointments, dispatch lab reports & medicine alerts',
    to: '/industries/healthcare',
    icon: Stethoscope,
    color: 'text-rose-400 bg-rose-500/10'
  },
  {
    title: 'Automobile & Dealers',
    desc: 'Book test drives, schedule maintenance services & share quotes',
    to: '/industries/automobile',
    icon: Car,
    color: 'text-indigo-400 bg-indigo-500/10'
  },
  {
    title: 'Events & Webinars',
    desc: 'Send instant ticket passes with QR codes & boost live attendance',
    to: '/industries/events',
    icon: Calendar,
    color: 'text-purple-400 bg-purple-500/10'
  }
]
</script>

<template>
  <div class="sticky top-0 z-50 w-full">
    <!-- Top Announcement Strip -->
    <div class="bg-gradient-to-r from-emerald-950 via-neutral-900 to-teal-950 border-b border-emerald-500/20 py-2 px-4 text-center text-xs font-medium text-emerald-300 flex items-center justify-center gap-2">
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] uppercase font-bold text-emerald-300">
        Direct Meta API
      </span>
      <span>Zero markup fees. Pay Meta directly & enjoy 1,000 free service conversations monthly!</span>
      <RouterLink to="/register" class="underline hover:text-white inline-flex items-center gap-1 font-semibold ml-1">
        Start Free
        <ArrowRight class="h-3 w-3" />
      </RouterLink>
    </div>

    <!-- Main Navigation Bar -->
    <header class="bg-[#070709]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="group">
          <NexWhatLogo size="md" />
        </RouterLink>

        <!-- Desktop Navigation Items -->
        <nav class="hidden lg:flex items-center gap-1 text-sm font-medium text-white/80 nav-dropdown-container">
          <!-- Features / Services Dropdown -->
          <div class="relative" @mouseenter="activeDropdown = 'features'" @mouseleave="activeDropdown = null">
            <button
              @click="toggleDropdown('features')"
              :class="[
                'flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-white transition-colors',
                activeDropdown === 'features' ? 'text-emerald-400 bg-white/[0.04]' : 'text-white/80'
              ]"
            >
              <span>Features</span>
              <ChevronDown class="h-4 w-4 transition-transform duration-200" :class="activeDropdown === 'features' ? 'rotate-180 text-emerald-400' : ''" />
            </button>

            <!-- Features Mega Dropdown Panel -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="activeDropdown === 'features'"
                class="absolute left-0 top-full mt-2 w-[480px] p-4 rounded-2xl bg-[#0e1118]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 z-50"
              >
                <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-400/80 mb-2 px-2">
                  Official WhatsApp Cloud API Suite
                </div>
                <div class="grid grid-cols-1 gap-1">
                  <RouterLink
                    v-for="svc in servicesList"
                    :key="svc.to"
                    :to="svc.to"
                    @click="closeDropdowns"
                    class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                  >
                    <div :class="['h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-md', svc.color]">
                      <component :is="svc.icon" class="h-5 w-5" />
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        {{ svc.title }}
                      </div>
                      <div class="text-xs text-white/50 line-clamp-1 mt-0.5">
                        {{ svc.desc }}
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </transition>
          </div>

          <!-- Industries Dropdown (As shown in AiSensy screenshot!) -->
          <div class="relative" @mouseenter="activeDropdown = 'industries'" @mouseleave="activeDropdown = null">
            <button
              @click="toggleDropdown('industries')"
              :class="[
                'flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-white transition-colors',
                activeDropdown === 'industries' ? 'text-emerald-400 bg-white/[0.04]' : 'text-white/80'
              ]"
            >
              <span>Industries</span>
              <ChevronDown class="h-4 w-4 transition-transform duration-200" :class="activeDropdown === 'industries' ? 'rotate-180 text-emerald-400' : ''" />
            </button>

            <!-- Industries Mega Dropdown Panel -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="activeDropdown === 'industries'"
                class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[580px] p-4 rounded-2xl bg-[#0e1118]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 z-50"
              >
                <div class="flex items-center justify-between mb-3 px-2 border-b border-white/[0.06] pb-2">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-400/80">
                    Tailored Solutions by Sector
                  </div>
                  <span class="text-[11px] text-white/40">Model 1 Meta Billing • 0% Markup</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                  <RouterLink
                    v-for="ind in industriesList"
                    :key="ind.to"
                    :to="ind.to"
                    @click="closeDropdowns"
                    class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                  >
                    <div :class="['h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10', ind.color]">
                      <component :is="ind.icon" class="h-4 w-4" />
                    </div>
                    <div>
                      <div class="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {{ ind.title }}
                      </div>
                      <div class="text-[11px] text-white/50 line-clamp-1 mt-0.5">
                        {{ ind.desc }}
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </transition>
          </div>

          <!-- Direct Links -->
          <a href="/#pricing" class="px-3 py-2 rounded-lg hover:text-emerald-400 transition-colors">Pricing</a>
          <a href="/#direct-billing" class="px-3 py-2 rounded-lg hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>Zero Markup</span>
            <span class="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">0%</span>
          </a>
          <RouterLink to="/about" class="px-3 py-2 rounded-lg hover:text-emerald-400 transition-colors">About Us</RouterLink>
        </nav>

        <!-- Right Header Actions (Dynamic Auth State) -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- Logged In State -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink
              to="/dashboard"
              class="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:brightness-110 active:scale-95 transition-all"
            >
              <LayoutDashboard class="h-4 w-4" />
              <span>Go to Dashboard</span>
              <ArrowRight class="h-3.5 w-3.5" />
            </RouterLink>

            <button
              @click="handleLogout"
              class="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut class="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </template>

          <!-- Guest State -->
          <template v-else>
            <RouterLink
              to="/login"
              class="px-4 py-2 text-xs font-semibold text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </RouterLink>
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Start Free Trial</span>
              <ArrowRight class="h-3.5 w-3.5" />
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button
          @click="isMobileOpen = !isMobileOpen"
          class="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu v-if="!isMobileOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div
        v-if="isMobileOpen"
        class="lg:hidden border-t border-white/10 bg-[#0a0d14] px-4 pt-4 pb-6 space-y-4 max-h-[80vh] overflow-y-auto"
      >
        <!-- Auth state mobile header -->
        <div v-if="authStore.isAuthenticated" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div class="text-xs text-white">
            Logged in as <span class="font-bold text-emerald-400">{{ authStore.user?.full_name || authStore.user?.email }}</span>
          </div>
          <RouterLink to="/dashboard" class="text-xs font-bold text-emerald-400 underline">Dashboard</RouterLink>
        </div>

        <!-- Services Section Accordion -->
        <div class="border-b border-white/[0.08] pb-3">
          <button
            @click="mobileExpandedSection = mobileExpandedSection === 'features' ? null : 'features'"
            class="flex items-center justify-between w-full text-left font-semibold text-white text-sm py-1.5"
          >
            <span>Features & Services</span>
            <ChevronDown class="h-4 w-4 transition-transform" :class="mobileExpandedSection === 'features' ? 'rotate-180 text-emerald-400' : ''" />
          </button>
          <div v-if="mobileExpandedSection === 'features'" class="mt-2 space-y-2 pl-2">
            <RouterLink
              v-for="svc in servicesList"
              :key="svc.to"
              :to="svc.to"
              @click="isMobileOpen = false"
              class="flex items-center gap-2.5 py-1.5 text-xs text-white/70 hover:text-emerald-400"
            >
              <component :is="svc.icon" class="h-4 w-4 text-emerald-400" />
              <span>{{ svc.title }}</span>
            </RouterLink>
          </div>
        </div>

        <!-- Industries Section Accordion -->
        <div class="border-b border-white/[0.08] pb-3">
          <button
            @click="mobileExpandedSection = mobileExpandedSection === 'industries' ? null : 'industries'"
            class="flex items-center justify-between w-full text-left font-semibold text-white text-sm py-1.5"
          >
            <span>Industries</span>
            <ChevronDown class="h-4 w-4 transition-transform" :class="mobileExpandedSection === 'industries' ? 'rotate-180 text-emerald-400' : ''" />
          </button>
          <div v-if="mobileExpandedSection === 'industries'" class="mt-2 space-y-2 pl-2">
            <RouterLink
              v-for="ind in industriesList"
              :key="ind.to"
              :to="ind.to"
              @click="isMobileOpen = false"
              class="flex items-center gap-2.5 py-1.5 text-xs text-white/70 hover:text-emerald-400"
            >
              <component :is="ind.icon" class="h-4 w-4 text-emerald-400" />
              <span>{{ ind.title }}</span>
            </RouterLink>
          </div>
        </div>

        <div class="space-y-2 pt-1 text-sm font-medium text-white/80">
          <a href="/#pricing" @click="isMobileOpen = false" class="block py-1 hover:text-emerald-400">Pricing</a>
          <a href="/#direct-billing" @click="isMobileOpen = false" class="block py-1 hover:text-emerald-400">Zero Markup Model</a>
          <RouterLink to="/about" @click="isMobileOpen = false" class="block py-1 hover:text-emerald-400">About Us</RouterLink>
        </div>

        <div class="pt-4 flex flex-col gap-2">
          <template v-if="authStore.isAuthenticated">
            <RouterLink
              to="/dashboard"
              @click="isMobileOpen = false"
              class="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 shadow"
            >
              Open Dashboard
            </RouterLink>
            <button
              @click="handleLogout(); isMobileOpen = false"
              class="w-full py-2 text-center text-xs font-medium text-white/60 hover:text-white"
            >
              Sign Out
            </button>
          </template>
          <template v-else>
            <RouterLink
              to="/register"
              @click="isMobileOpen = false"
              class="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 shadow"
            >
              Start Free Trial
            </RouterLink>
            <RouterLink
              to="/login"
              @click="isMobileOpen = false"
              class="w-full py-2 text-center text-xs font-semibold text-white/70 hover:text-white"
            >
              Sign In
            </RouterLink>
          </template>
        </div>
      </div>
    </header>
  </div>
</template>
