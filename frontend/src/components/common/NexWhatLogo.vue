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
  xs: { icon: 26, text: 'text-sm', badge: 'text-[9px] px-1.5 py-0.2', gap: 'gap-1.5', rounded: 'rounded-lg' },
  sm: { icon: 34, text: 'text-base', badge: 'text-[9px] px-1.5 py-0.5', gap: 'gap-2', rounded: 'rounded-xl' },
  md: { icon: 42, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5', gap: 'gap-2.5', rounded: 'rounded-xl' },
  lg: { icon: 54, text: 'text-2xl', badge: 'text-[11px] px-2 py-0.5', gap: 'gap-3', rounded: 'rounded-2xl' },
  xl: { icon: 68, text: 'text-3xl', badge: 'text-xs px-2.5 py-1', gap: 'gap-3.5', rounded: 'rounded-2xl' }
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
    <!-- Luxury 3D Emblem Container -->
    <div
      class="relative flex-shrink-0 flex items-center justify-center transition-all duration-300"
      :class="animated ? 'group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]' : ''"
      :style="{ width: `${currentSize.icon}px`, height: `${currentSize.icon}px` }"
    >
      <!-- Ambient Glow Behind Logo -->
      <div
        class="absolute -inset-0.5 bg-gradient-to-tr from-emerald-500/50 via-teal-400/40 to-cyan-400/50 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        :class="currentSize.rounded"
      />

      <!-- High-Res Luxury Logo Image with Framed Glass Border -->
      <div
        class="relative w-full h-full overflow-hidden border border-emerald-500/40 shadow-lg shadow-emerald-950/40 bg-[#07090e]"
        :class="currentSize.rounded"
      >
        <img
          src="/logo.jpg"
          alt="NexWhat Luxury Logo"
          class="w-full h-full object-cover object-center select-none"
          draggable="false"
        />
      </div>
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

