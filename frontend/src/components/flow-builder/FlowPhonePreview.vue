<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  ArrowLeft,
  X,
  CheckCircle2,
  RotateCcw,
  Code2,
  ChevronDown,
  Calendar as CalendarIcon,
  Sparkles,
  Smartphone
} from 'lucide-vue-next'

interface FlowComponent {
  id: string
  type: string
  name?: string
  label?: string
  text?: string
  required?: boolean
  placeholder?: string
  'input-type'?: string
  src?: string
  'data-source'?: Array<{ id: string; title: string; description?: string }>
  'on-click-action'?: {
    name?: string
    target_screen?: string
    payload?: Record<string, any>
  }
  [key: string]: any
}

interface FlowScreen {
  id: string
  title: string
  data?: Record<string, any>
  layout: {
    type: string
    children: FlowComponent[]
  }
}

const props = withDefaults(
  defineProps<{
    screens: FlowScreen[]
    flowTitle?: string
    initialScreenId?: string
  }>(),
  {
    flowTitle: 'WhatsApp Flow Preview',
    screens: () => []
  }
)

// Active screen state
const currentScreenId = ref<string>(
  props.initialScreenId || props.screens[0]?.id || 'SCREEN_A'
)
const screenHistory = ref<string[]>([])
const formData = ref<Record<string, any>>({})
const validationErrors = ref<Record<string, string>>({})
const isSubmitted = ref(false)
const submittedPayload = ref<Record<string, any> | null>(null)
const showDataInspector = ref(false)
const activeDropdownKey = ref<string | null>(null)

// Sync when initialScreenId changes or screens update
watch(
  () => props.initialScreenId,
  (newId) => {
    if (newId && props.screens.some((s) => s.id === newId)) {
      currentScreenId.value = newId
    }
  }
)

watch(
  () => props.screens,
  (newScreens) => {
    if (newScreens.length > 0 && !newScreens.some((s) => s.id === currentScreenId.value)) {
      currentScreenId.value = newScreens[0].id
    }
  },
  { deep: true }
)

const currentScreen = computed(() => {
  return props.screens.find((s) => s.id === currentScreenId.value) || props.screens[0]
})

const canGoBack = computed(() => screenHistory.value.length > 0 && !isSubmitted.value)

function navigateBack() {
  if (screenHistory.value.length > 0) {
    const prev = screenHistory.value.pop()
    if (prev) {
      currentScreenId.value = prev
      validationErrors.value = {}
    }
  }
}

function resetSimulation() {
  currentScreenId.value = props.screens[0]?.id || 'SCREEN_A'
  screenHistory.value = []
  formData.value = {}
  validationErrors.value = {}
  isSubmitted.value = false
  submittedPayload.value = null
  activeDropdownKey.value = null
}

function handleComponentClick(comp: FlowComponent) {
  if (comp.type === 'Dropdown') {
    activeDropdownKey.value = activeDropdownKey.value === (comp.name || comp.id) ? null : (comp.name || comp.id)
  }
}

function selectDropdownOption(fieldName: string, optionId: string) {
  formData.value[fieldName] = optionId
  delete validationErrors.value[fieldName]
  activeDropdownKey.value = null
}

function toggleCheckbox(fieldName: string, optionId: string) {
  if (!Array.isArray(formData.value[fieldName])) {
    formData.value[fieldName] = []
  }
  const idx = formData.value[fieldName].indexOf(optionId)
  if (idx > -1) {
    formData.value[fieldName].splice(idx, 1)
  } else {
    formData.value[fieldName].push(optionId)
  }
  delete validationErrors.value[fieldName]
}

function validateCurrentScreen(): boolean {
  if (!currentScreen.value) return true
  const errors: Record<string, string> = {}

  for (const comp of currentScreen.value.layout.children) {
    const fieldKey = comp.name || comp.id
    if (comp.required) {
      const val = formData.value[fieldKey]
      if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
        errors[fieldKey] = (comp.label || 'This field') + ' is required'
      }
    }
  }

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

function handleFooterAction(comp: FlowComponent) {
  if (!validateCurrentScreen()) {
    return
  }

  const action = comp['on-click-action']
  const targetScreen = action?.target_screen

  if (targetScreen && props.screens.some((s) => s.id === targetScreen)) {
    // Navigate to specified target screen
    screenHistory.value.push(currentScreenId.value)
    currentScreenId.value = targetScreen
  } else {
    // Check if there is a next screen in the sequence
    const currentIndex = props.screens.findIndex((s) => s.id === currentScreenId.value)
    if (currentIndex > -1 && currentIndex < props.screens.length - 1) {
      screenHistory.value.push(currentScreenId.value)
      currentScreenId.value = props.screens[currentIndex + 1].id
    } else {
      // Flow complete / submit
      isSubmitted.value = true
      submittedPayload.value = {
        flow_token: 'live_sim_' + Math.random().toString(36).substring(7),
        screen_id: currentScreenId.value,
        data: { ...formData.value },
        timestamp: new Date().toISOString()
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center p-2 w-full h-full">
    <!-- Simulator Top Controls -->
    <div class="flex items-center justify-between w-full max-w-[360px] mb-2 px-1">
      <div class="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <Smartphone class="w-3.5 h-3.5 text-emerald-500" />
        <span>Live Interactive Preview</span>
      </div>
      <div class="flex items-center gap-1">
        <button
          type="button"
          @click="showDataInspector = !showDataInspector"
          :class="[
            'p-1.5 rounded text-xs flex items-center gap-1 transition-colors',
            showDataInspector ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-muted text-muted-foreground'
          ]"
          title="Toggle Form Data Inspector"
        >
          <Code2 class="w-3.5 h-3.5" />
          <span class="text-[11px]">Data</span>
        </button>
        <button
          type="button"
          @click="resetSimulation"
          class="p-1.5 rounded text-xs flex items-center gap-1 hover:bg-muted text-muted-foreground transition-colors"
          title="Restart Flow Simulation"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span class="text-[11px]">Reset</span>
        </button>
      </div>
    </div>

    <!-- Mobile Frame Device Mockup -->
    <div
      class="w-[320px] sm:w-[350px] h-[580px] rounded-[36px] border-[6px] border-slate-900 bg-[#0b141a] text-[#e9edef] shadow-2xl relative overflow-hidden flex flex-col font-sans select-none"
    >
      <!-- Top Speaker & Camera Notch -->
      <div class="w-full pt-2.5 pb-1 px-6 flex items-center justify-between text-[11px] text-[#8696a0] font-medium bg-[#0b141a] z-20">
        <span>9:41</span>
        <div class="w-16 h-3 bg-slate-900 rounded-full mx-auto" />
        <div class="flex items-center gap-1">
          <span class="text-[9px]">5G</span>
          <div class="w-4 h-2 rounded-sm border border-[#8696a0] p-0.5 flex items-center">
            <div class="h-full w-2.5 bg-[#8696a0] rounded-xs" />
          </div>
        </div>
      </div>

      <!-- WhatsApp Flow Header -->
      <div class="bg-[#1f2c34] text-[#e9edef] px-3.5 py-2.5 flex items-center justify-between border-b border-[#2a3942] z-20 shadow-sm">
        <div class="flex items-center gap-2 overflow-hidden">
          <button
            v-if="canGoBack"
            type="button"
            @click="navigateBack"
            class="p-1 -ml-1 text-[#00a884] hover:text-emerald-300 transition-colors"
            title="Back"
          >
            <ArrowLeft class="w-4 h-4" />
          </button>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold truncate leading-tight">{{ currentScreen?.title || flowTitle }}</span>
            <span class="text-[10px] text-[#00a884] flex items-center gap-1">
              WhatsApp Flow • <span class="text-[9px] text-[#8696a0]">Nexteir</span>
            </span>
          </div>
        </div>
        <button
          type="button"
          @click="resetSimulation"
          class="p-1 text-[#8696a0] hover:text-white transition-colors"
          title="Close Flow"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Flow Screen Body -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0b141a] text-[#e9edef] scrollbar-thin scrollbar-thumb-slate-700">
        <!-- Empty Screen State -->
        <div
          v-if="!currentScreen || currentScreen.layout.children.length === 0"
          class="flex flex-col items-center justify-center h-full text-center p-6 text-[#8696a0]"
        >
          <Sparkles class="w-8 h-8 text-[#00a884]/60 mb-2 animate-bounce" />
          <p class="text-xs font-medium">This screen is empty</p>
          <p class="text-[11px] text-[#8696a0]/80 mt-1">Add components from the palette to see them live here</p>
        </div>

        <!-- Submitted / Completed State -->
        <div
          v-else-if="isSubmitted"
          class="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in fade-in zoom-in duration-300"
        >
          <div class="w-14 h-14 rounded-full bg-[#00a884]/20 border border-[#00a884] flex items-center justify-center text-[#00a884] shadow-lg shadow-emerald-950/50">
            <CheckCircle2 class="w-8 h-8" />
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Flow Completed!</h3>
            <p class="text-xs text-[#8696a0] mt-1">Response recorded by WhatsApp Cloud API</p>
          </div>

          <!-- Payload Summary Box -->
          <div class="w-full bg-[#111b21] rounded-lg p-3 text-left border border-[#222e35] space-y-1.5 text-xs">
            <p class="text-[10px] uppercase font-bold text-[#00a884] tracking-wider">Submitted Data</p>
            <div v-if="Object.keys(formData).length === 0" class="text-[#8696a0] text-[11px]">
              No inputs were provided.
            </div>
            <div
              v-else
              v-for="(val, key) in formData"
              :key="key"
              class="flex justify-between items-center py-1 border-b border-[#222e35]/60 text-[11px]"
            >
              <span class="text-[#8696a0] truncate max-w-[120px]">{{ key }}:</span>
              <span class="font-medium text-white truncate max-w-[150px]">{{ Array.isArray(val) ? val.join(', ') : val }}</span>
            </div>
          </div>

          <button
            type="button"
            @click="resetSimulation"
            class="w-full py-2.5 rounded-lg bg-[#00a884] hover:bg-[#008069] text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Test Flow Again</span>
          </button>
        </div>

        <!-- Active Screen Components -->
        <template v-else>
          <div
            v-for="comp in currentScreen.layout.children"
            :key="comp.id"
            class="space-y-1.5"
          >
            <!-- 1. TextHeading -->
            <h2
              v-if="comp.type === 'TextHeading'"
              class="text-lg font-bold text-white leading-snug tracking-tight"
            >
              {{ comp.text || 'Heading Text' }}
            </h2>

            <!-- 2. TextSubheading -->
            <h3
              v-else-if="comp.type === 'TextSubheading'"
              class="text-sm font-semibold text-[#8696a0] leading-snug"
            >
              {{ comp.text || 'Subheading Text' }}
            </h3>

            <!-- 3. TextBody -->
            <p
              v-else-if="comp.type === 'TextBody'"
              class="text-xs text-[#d1d7db] leading-relaxed whitespace-pre-line"
            >
              {{ comp.text || 'Body text description goes here...' }}
            </p>

            <!-- 4. TextInput -->
            <div v-else-if="comp.type === 'TextInput'" class="space-y-1">
              <label class="text-xs font-medium text-[#d1d7db] flex items-center justify-between">
                <span>{{ comp.label || 'Input Label' }}</span>
                <span v-if="comp.required" class="text-red-400 text-[10px]">*required</span>
              </label>
              <input
                v-model="formData[comp.name || comp.id]"
                :type="comp['input-type'] || 'text'"
                :placeholder="comp.placeholder || comp.label || 'Enter here...'"
                @input="delete validationErrors[comp.name || comp.id]"
                :class="[
                  'w-full px-3 py-2 rounded-lg bg-[#202c33] text-xs text-white placeholder-[#8696a0] border transition-all outline-none',
                  validationErrors[comp.name || comp.id]
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#2a3942] focus:border-[#00a884]'
                ]"
              />
              <p v-if="validationErrors[comp.name || comp.id]" class="text-[10px] text-red-400">
                {{ validationErrors[comp.name || comp.id] }}
              </p>
            </div>

            <!-- 5. TextArea -->
            <div v-else-if="comp.type === 'TextArea'" class="space-y-1">
              <label class="text-xs font-medium text-[#d1d7db] flex items-center justify-between">
                <span>{{ comp.label || 'Text Area' }}</span>
                <span v-if="comp.required" class="text-red-400 text-[10px]">*required</span>
              </label>
              <textarea
                v-model="formData[comp.name || comp.id]"
                rows="3"
                :placeholder="comp.placeholder || comp.label || 'Enter long text here...'"
                @input="delete validationErrors[comp.name || comp.id]"
                :class="[
                  'w-full px-3 py-2 rounded-lg bg-[#202c33] text-xs text-white placeholder-[#8696a0] border transition-all outline-none resize-none',
                  validationErrors[comp.name || comp.id]
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#2a3942] focus:border-[#00a884]'
                ]"
              />
              <p v-if="validationErrors[comp.name || comp.id]" class="text-[10px] text-red-400">
                {{ validationErrors[comp.name || comp.id] }}
              </p>
            </div>

            <!-- 6. Dropdown -->
            <div v-else-if="comp.type === 'Dropdown'" class="space-y-1 relative">
              <label class="text-xs font-medium text-[#d1d7db] flex items-center justify-between">
                <span>{{ comp.label || 'Select Option' }}</span>
                <span v-if="comp.required" class="text-red-400 text-[10px]">*required</span>
              </label>
              <div
                @click="handleComponentClick(comp)"
                :class="[
                  'w-full px-3 py-2 rounded-lg bg-[#202c33] text-xs cursor-pointer flex items-center justify-between border transition-all',
                  validationErrors[comp.name || comp.id] ? 'border-red-500' : 'border-[#2a3942] hover:border-[#00a884]'
                ]"
              >
                <span :class="formData[comp.name || comp.id] ? 'text-white font-medium' : 'text-[#8696a0]'">
                  {{
                    comp['data-source']?.find((o: any) => o.id === formData[comp.name || comp.id])?.title ||
                    'Select an option...'
                  }}
                </span>
                <ChevronDown class="w-3.5 h-3.5 text-[#8696a0]" />
              </div>

              <!-- Dropdown Picker Sheet -->
              <div
                v-if="activeDropdownKey === (comp.name || comp.id)"
                class="absolute left-0 right-0 top-full mt-1 bg-[#222e35] border border-[#2a3942] rounded-lg shadow-xl z-30 p-1 space-y-0.5 max-h-40 overflow-y-auto animate-in fade-in slide-in-from-top-1"
              >
                <div
                  v-for="opt in comp['data-source'] || []"
                  :key="opt.id"
                  @click="selectDropdownOption(comp.name || comp.id, opt.id)"
                  :class="[
                    'px-2.5 py-2 rounded text-xs cursor-pointer flex items-center justify-between transition-colors',
                    formData[comp.name || comp.id] === opt.id
                      ? 'bg-[#00a884]/20 text-[#00a884] font-medium'
                      : 'hover:bg-[#111b21] text-[#d1d7db]'
                  ]"
                >
                  <span>{{ opt.title }}</span>
                  <CheckCircle2 v-if="formData[comp.name || comp.id] === opt.id" class="w-3.5 h-3.5 text-[#00a884]" />
                </div>
              </div>
            </div>

            <!-- 7. RadioButtonsGroup -->
            <div v-else-if="comp.type === 'RadioButtonsGroup'" class="space-y-1.5">
              <label class="text-xs font-medium text-[#d1d7db] flex items-center justify-between">
                <span>{{ comp.label || 'Choose One' }}</span>
                <span v-if="comp.required" class="text-red-400 text-[10px]">*required</span>
              </label>
              <div class="space-y-1">
                <div
                  v-for="opt in comp['data-source'] || []"
                  :key="opt.id"
                  @click="formData[comp.name || comp.id] = opt.id; delete validationErrors[comp.name || comp.id]"
                  :class="[
                    'flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all',
                    formData[comp.name || comp.id] === opt.id
                      ? 'bg-[#00a884]/15 border-[#00a884] text-white'
                      : 'bg-[#202c33] border-[#2a3942] text-[#d1d7db] hover:border-[#8696a0]'
                  ]"
                >
                  <div
                    :class="[
                      'w-4 h-4 rounded-full border flex items-center justify-center transition-all',
                      formData[comp.name || comp.id] === opt.id ? 'border-[#00a884]' : 'border-[#8696a0]'
                    ]"
                  >
                    <div
                      v-if="formData[comp.name || comp.id] === opt.id"
                      class="w-2 h-2 rounded-full bg-[#00a884]"
                    />
                  </div>
                  <span class="text-xs">{{ opt.title }}</span>
                </div>
              </div>
            </div>

            <!-- 8. CheckboxGroup -->
            <div v-else-if="comp.type === 'CheckboxGroup'" class="space-y-1.5">
              <label class="text-xs font-medium text-[#d1d7db] flex items-center justify-between">
                <span>{{ comp.label || 'Select Options' }}</span>
                <span v-if="comp.required" class="text-red-400 text-[10px]">*required</span>
              </label>
              <div class="space-y-1">
                <div
                  v-for="opt in comp['data-source'] || []"
                  :key="opt.id"
                  @click="toggleCheckbox(comp.name || comp.id, opt.id)"
                  :class="[
                    'flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all',
                    (formData[comp.name || comp.id] || []).includes(opt.id)
                      ? 'bg-[#00a884]/15 border-[#00a884] text-white'
                      : 'bg-[#202c33] border-[#2a3942] text-[#d1d7db] hover:border-[#8696a0]'
                  ]"
                >
                  <div
                    :class="[
                      'w-4 h-4 rounded border flex items-center justify-center transition-all',
                      (formData[comp.name || comp.id] || []).includes(opt.id)
                        ? 'bg-[#00a884] border-[#00a884]'
                        : 'border-[#8696a0]'
                    ]"
                  >
                    <CheckCircle2
                      v-if="(formData[comp.name || comp.id] || []).includes(opt.id)"
                      class="w-3 h-3 text-white"
                    />
                  </div>
                  <span class="text-xs">{{ opt.title }}</span>
                </div>
              </div>
            </div>

            <!-- 9. DatePicker -->
            <div v-else-if="comp.type === 'DatePicker'" class="space-y-1">
              <label class="text-xs font-medium text-[#d1d7db] flex items-center justify-between">
                <span>{{ comp.label || 'Pick Date' }}</span>
                <span v-if="comp.required" class="text-red-400 text-[10px]">*required</span>
              </label>
              <div class="relative">
                <input
                  type="date"
                  v-model="formData[comp.name || comp.id]"
                  @change="delete validationErrors[comp.name || comp.id]"
                  class="w-full px-3 py-2 rounded-lg bg-[#202c33] text-xs text-white border border-[#2a3942] focus:border-[#00a884] outline-none"
                />
              </div>
            </div>

            <!-- 10. Image -->
            <div v-else-if="comp.type === 'Image'" class="rounded-lg overflow-hidden bg-[#202c33] border border-[#2a3942]">
              <img
                v-if="comp['src']"
                :src="comp['src']"
                :alt="comp.label || 'Flow Image'"
                class="w-full h-32 object-cover"
              />
              <div v-else class="h-28 flex flex-col items-center justify-center text-[#8696a0] text-xs gap-1">
                <span>[ Image: {{ comp.label || 'Preview' }} ]</span>
              </div>
            </div>

            <!-- 11. Footer Button -->
            <div v-else-if="comp.type === 'Footer'" class="pt-2">
              <button
                type="button"
                @click="handleFooterAction(comp)"
                class="w-full py-2.5 rounded-lg bg-[#00a884] hover:bg-[#008069] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/40 flex items-center justify-center gap-1.5"
              >
                <span>{{ comp.label || 'Continue' }}</span>
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Bottom Phone Indicator Bar -->
      <div class="w-full py-1 flex items-center justify-center bg-[#0b141a]">
        <div class="w-24 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>

    <!-- Live Data Inspector Drawer -->
    <div
      v-if="showDataInspector"
      class="w-full max-w-[350px] mt-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto shadow-lg animate-in fade-in slide-in-from-top-1"
    >
      <div class="flex items-center justify-between pb-1 text-slate-400 border-b border-slate-800 mb-1">
        <span>Active Screen: {{ currentScreenId }}</span>
        <span>Entries: {{ Object.keys(formData).length }}</span>
      </div>
      <pre class="leading-tight">{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>
