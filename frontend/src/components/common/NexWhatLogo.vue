<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  showBadge?: boolean
  badgeText?: string
  clickable?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: true,
  showBadge: true,
  badgeText: 'CLOUD API',
  clickable: false,
  animated: true
})

// Dimensions based on size prop
const sizeMap = {
  xs: { icon: 24, text: 'text-sm', badge: 'text-[9px] px-1.5 py-0.2', gap: 'gap-1.5' },
  sm: { icon: 32, text: 'text-base', badge: 'text-[9px] px-1.5 py-0.5', gap: 'gap-2' },
  md: { icon: 40, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5', gap: 'gap-2.5' },
  lg: { icon: 48, text: 'text-2xl', badge: 'text-[11px] px-2 py-0.5', gap: 'gap-3' },
  xl: { icon: 64, text: 'text-3xl', badge: 'text-xs px-2.5 py-1', gap: 'gap-3.5' }
}

const currentSize = computed(() => sizeMap[props.size] || sizeMap.md)
</script>

<template>
  <div
    :class="[
      'inline-flex items-center select-none group',
      currentSize.gap,
      clickable ? 'cursor-pointer' : ''
    ]"
  >
    <!-- SVG Luxury Emblem -->
    <div
      class="relative flex-shrink-0 flex items-center justify-center transition-transform duration-300"
      :class="animated ? 'group-hover:scale-105' : ''"
      :style="{ width: `${currentSize.icon}px`, height: `${currentSize.icon}px` }"
    >
      <!-- Ambient Glow Behind Logo -->
      <div
        class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/40 via-teal-400/30 to-cyan-400/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />

      <!-- Vector SVG Logo -->
      <svg
        class="relative w-full h-full drop-shadow-md"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- Background Squircle Gradient -->
          <linearGradient id="emblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="50%" stop-color="#022c22" />
            <stop offset="100%" stop-color="#041f1a" />
          </linearGradient>

          <!-- Outer Border Neon Gradient -->
          <linearGradient id="neonBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="50%" stop-color="#14b8a6" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>

          <!-- Primary 'N' Wave Radiant Gradient -->
          <linearGradient id="nWaveGrad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stop-color="#6ee7b7" />
            <stop offset="30%" stop-color="#10b981" />
            <stop offset="70%" stop-color="#14b8a6" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>

          <!-- Glass Specular Highlight -->
          <linearGradient id="specularGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>

          <!-- Pulse Wave Gradient -->
          <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="100%" stop-color="#22d3ee" />
          </linearGradient>
        </defs>

        <!-- Base Squircle Container -->
        <rect
          x="4"
          y="4"
          width="112"
          height="112"
          rx="30"
          fill="url(#emblemBg)"
          stroke="url(#neonBorder)"
          stroke-width="3"
        />

        <!-- Glass Highlight Shimmer -->
        <rect
          x="5"
          y="5"
          width="110"
          height="55"
          rx="28"
          fill="url(#specularGrad)"
        />

        <!-- WhatsApp Chat Bubble Ring with Soft Tail -->
        <path
          d="M 32 75 C 24 67 22 55 26 44 C 31 31 43 23 57 23 C 73 23 87 35 88 51 C 89 68 76 82 59 83 C 51 83 45 80 40 78 L 26 84 L 32 75 Z"
          fill="none"
          stroke="url(#neonBorder)"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.85"
        />

        <!-- Futuristic Sculpted 'N' Wave / Pulse -->
        <!-- Left Pillar of N -->
        <path
          d="M 41 68 L 41 38 C 41 35.8 43 34 45.2 34.5 C 47.4 35 48.5 36.8 48.5 39 L 48.5 67 C 48.5 69.2 46.5 71 44.3 70.5 C 42.1 70 41 68.2 41 68 Z"
          fill="url(#nWaveGrad)"
        />

        <!-- Diagonal Ribbon of N -->
        <path
          d="M 43 37 L 69 66 C 71 68.2 74 67.5 74 64.5 L 74 61 L 48 33 C 46 31 43 32.5 43 35 Z"
          fill="url(#nWaveGrad)"
        />

        <!-- Right Pillar of N -->
        <path
          d="M 68.5 68 L 68.5 38 C 68.5 35.8 70.5 34 72.7 34.5 C 74.9 35 76 36.8 76 39 L 76 67 C 76 69.2 74 71 71.8 70.5 C 69.6 70 68.5 68.2 68.5 68 Z"
          fill="url(#nWaveGrad)"
        />

        <!-- Sound / Broadcast Signal Pulse Wave 1 -->
        <path
          d="M 83 41 C 88 47 88 55 83 61"
          stroke="url(#pulseGrad)"
          stroke-width="3.5"
          stroke-linecap="round"
          opacity="0.9"
        />

        <!-- Sound / Broadcast Signal Pulse Wave 2 (Outer) -->
        <path
          d="M 91 36 C 98 44 98 58 91 66"
          stroke="url(#pulseGrad)"
          stroke-width="3"
          stroke-linecap="round"
          opacity="0.55"
        />

        <!-- Meta Live Connection Status Beacon Orb -->
        <circle cx="75" cy="27" r="4.5" fill="#34d399" />
        <circle cx="75" cy="27" r="7.5" stroke="#34d399" stroke-width="1.5" opacity="0.4" />
      </svg>
    </div>

    <!-- Brand Typography -->
    <div v-if="showText" class="flex flex-col justify-center">
      <div class="flex items-center gap-1.5 leading-none">
        <span
          :class="[
            currentSize.text,
            'font-black tracking-tight text-white flex items-center transition-colors'
          ]"
        >
          Nex<span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">What</span>
        </span>

        <!-- Cloud API Badge -->
        <span
          v-if="showBadge"
          :class="[
            currentSize.badge,
            'uppercase tracking-wider font-extrabold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 backdrop-blur-sm'
          ]"
        >
          {{ badgeText }}
        </span>
      </div>
    </div>
  </div>
</template>
