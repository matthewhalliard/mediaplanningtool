<template>
  <div>
    <!-- Preset Selector -->
    <div v-if="presets && presets.length > 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Load a preset
      </label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset.name"
          @click="applyPreset(preset)"
          class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
          :class="activePreset === preset.name
            ? 'bg-primary-600 text-white border-primary-600'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-700'"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Calculator -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Inputs -->
        <div v-for="input in inputs" :key="input.id" class="space-y-2">
          <label :for="input.id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ input.label }}
          </label>
          <div v-if="input.type === 'select'" class="relative">
            <select
              :id="input.id"
              v-model="values[input.id]"
              @change="activePreset = ''"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500"
            >
              <option v-for="opt in input.options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div v-else class="relative">
            <span v-if="input.type === 'currency'" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
            <input
              :id="input.id"
              type="number"
              v-model.number="values[input.id]"
              :min="input.min"
              :max="input.max"
              :step="input.step || 1"
              @input="activePreset = ''"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500"
              :class="{ 'pl-8': input.type === 'currency' }"
            />
            <span v-if="input.type === 'percentage'" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
          </div>
          <p v-if="input.help_text" class="text-xs text-gray-500 dark:text-gray-400">{{ input.help_text }}</p>
        </div>
      </div>

      <!-- Result -->
      <div class="mt-8 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-primary-200 dark:border-gray-700">
        <div class="text-center">
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ output.label }}</p>
          <p class="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {{ formattedResult }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ output.description }}</p>
        </div>
        <div class="mt-4 flex justify-center">
          <button
            @click="copyResult"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            {{ copied ? 'Copied!' : 'Copy result' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

interface ToolInput {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage' | 'select';
  default_value: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  help_text?: string;
}

interface ToolOutput {
  label: string;
  format: 'currency' | 'number' | 'percentage';
  description: string;
}

interface Preset {
  name: string;
  values: Record<string, number | string>;
}

const props = defineProps<{
  inputs: ToolInput[];
  formula: string;
  output: ToolOutput;
  presets?: Preset[];
}>();

const values = reactive<Record<string, number | string>>({});
const activePreset = ref('');
const copied = ref(false);

// Initialize defaults
for (const input of props.inputs) {
  values[input.id] = input.default_value;
}

const result = computed(() => {
  try {
    // Build a safe expression from the formula
    let expr = props.formula;
    for (const input of props.inputs) {
      const val = Number(values[input.id]) || 0;
      expr = expr.replace(new RegExp(input.id, 'g'), String(val));
    }
    // Simple safe evaluation for basic math
    const sanitized = expr.replace(/[^0-9+\-*/().]/g, '');
    if (!sanitized) return 0;
    const fn = new Function(`return (${sanitized})`);
    const r = fn();
    return isFinite(r) ? r : 0;
  } catch {
    return 0;
  }
});

const formattedResult = computed(() => {
  const val = result.value;
  switch (props.output.format) {
    case 'currency':
      return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'percentage':
      return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
    default:
      return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
});

function applyPreset(preset: Preset) {
  activePreset.value = preset.name;
  for (const [key, val] of Object.entries(preset.values)) {
    if (key in values) {
      values[key] = val;
    }
  }
}

function copyResult() {
  const text = `${props.output.label}: ${formattedResult.value}`;
  navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
}
</script>
