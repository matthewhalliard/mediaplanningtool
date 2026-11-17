<template>
  <div>
    <!-- Preset Selector -->
    <div v-if="presets && presets.length > 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <p class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Load a preset
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset.name"
          type="button"
          @click="applyPreset(preset)"
          class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
          :class="activePreset === preset.name
            ? 'bg-primary-600 text-white border-primary-600'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-ink dark:hover:border-ink'"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Calculator -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-6">
      <!-- Solve-for switch -->
      <div v-if="modes && modes.length > 1" class="mb-6">
        <p class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Solve for</p>
        <div class="inline-flex flex-wrap rounded-lg border border-gray-200 dark:border-gray-600 p-1 gap-1" role="group" aria-label="Solve for">
          <button
            v-for="m in modes"
            :key="m.id"
            type="button"
            @click="modeId = m.id; trackUse()"
            :aria-pressed="modeId === m.id"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="modeId === m.id
              ? 'bg-primary-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ m.label }}
          </button>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <!-- Inputs -->
        <div v-for="input in visibleInputs" :key="input.id" class="space-y-2">
          <label :for="input.id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ input.label }}
          </label>
          <div v-if="input.type === 'select'" class="relative">
            <select
              :id="input.id"
              v-model="values[input.id]"
              @change="activePreset = ''; trackUse()"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-primary-500"
            >
              <option v-for="opt in input.options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div v-else class="relative">
            <span v-if="input.type === 'currency'" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
            <!--
              A text box with a decimal keypad rather than type="number": it shows
              thousands separators, has no tiny arrow buttons, and one click
              selects the whole value so typing replaces it.
            -->
            <input
              :id="input.id"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              :value="display[input.id]"
              @focus="onFocus(input, $event)"
              @mouseup.prevent
              @input="onInput(input, $event)"
              @blur="onBlur(input)"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 tabular-nums focus:border-primary-500 focus:ring-primary-500"
              :class="{ 'pl-8': input.type === 'currency', 'pr-8': input.type === 'percentage' }"
            />
            <span v-if="input.type === 'percentage'" class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
          </div>
          <p v-if="input.help_text" class="text-xs text-gray-500 dark:text-gray-400">{{ input.help_text }}</p>
        </div>
      </div>

      <!-- Result -->
      <div class="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <div class="text-center" aria-live="polite">
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{{ activeOutput.label }}</p>
          <p class="text-4xl md:text-5xl font-semibold text-primary-600 dark:text-primary-400 mb-2 tabular-nums">
            {{ formattedResult }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ activeOutput.description }}</p>
        </div>
        <div class="mt-4 flex justify-center">
          <button
            type="button"
            @click="copyResult"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
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

interface Mode {
  id: string;
  label: string;
  inputs: string[];
  formula: string;
  output: ToolOutput;
}

const props = defineProps<{
  inputs: ToolInput[];
  formula: string;
  output: ToolOutput;
  presets?: Preset[];
  modes?: Mode[];
  /** Tool slug, sent with the UseCalculator event. Falls back to the URL's last segment. */
  calculator?: string;
}>();

// In-market signal: the first real use of the calculator on this page load
// (typing, picking an option, loading a preset or switching mode) fires
// UseCalculator on the shared Meta pixel and calculator_used in PostHog.
// The pixel is a consent-gated queue (MetaPixel.astro), so this is safe to
// call for every visitor.
let usageTracked = false;
function trackUse() {
  if (usageTracked || typeof window === 'undefined') return;
  usageTracked = true;
  const w = window as any;
  const calculator =
    props.calculator || window.location.pathname.split('/').filter(Boolean).pop() || 'unknown';
  const params = { calculator, site: 'mediaplanningtool' };
  try { w.fbq?.('trackCustom', 'UseCalculator', params); } catch {}
  try { w.posthog?.capture?.('calculator_used', params); } catch {}
}

const values = reactive<Record<string, number | string>>({});
const display = reactive<Record<string, string>>({});
const activePreset = ref('');
const copied = ref(false);
const modeId = ref(props.modes?.[0]?.id ?? '');

const activeMode = computed(() => props.modes?.find((m) => m.id === modeId.value));
const activeFormula = computed(() => activeMode.value?.formula ?? props.formula);
const activeOutput = computed(() => activeMode.value?.output ?? props.output);
const visibleInputs = computed(() =>
  activeMode.value ? props.inputs.filter((i) => activeMode.value!.inputs.includes(i.id)) : props.inputs
);

function decimalsFor(input: ToolInput): number {
  const step = input.step ?? 1;
  const s = String(step);
  return s.includes('.') ? s.split('.')[1].length : 0;
}

function formatInput(input: ToolInput, n: number | string): string {
  const num = Number(n);
  if (!isFinite(num)) return '';
  if (input.type === 'percentage') return String(num);
  const max = Math.max(decimalsFor(input), input.type === 'currency' ? 2 : 0);
  return num.toLocaleString('en-US', { maximumFractionDigits: max });
}

function parse(text: string): number | null {
  const cleaned = text.replace(/[,$%\s]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null;
  const n = Number(cleaned);
  return isFinite(n) ? n : null;
}

// Initialize defaults
for (const input of props.inputs) {
  values[input.id] = input.default_value;
  if (input.type !== 'select') display[input.id] = formatInput(input, input.default_value);
}

function onFocus(input: ToolInput, e: FocusEvent) {
  const el = e.target as HTMLInputElement;
  // Show the plain number while editing, then select it so typing replaces it.
  display[input.id] = String(values[input.id] ?? '');
  requestAnimationFrame(() => el.select());
}

function onInput(input: ToolInput, e: Event) {
  const text = (e.target as HTMLInputElement).value;
  display[input.id] = text;
  const n = parse(text);
  values[input.id] = n ?? 0;
  activePreset.value = '';
  trackUse();
}

function onBlur(input: ToolInput) {
  display[input.id] = formatInput(input, values[input.id]);
}

function evaluate(formula: string): number {
  try {
    let expr = formula;
    // Longest ids first, matched as whole words, so "impressions" never
    // rewrites part of "impressions_per_day".
    const ids = [...props.inputs].map((i) => i.id).sort((a, b) => b.length - a.length);
    for (const id of ids) {
      const val = Number(values[id]) || 0;
      expr = expr.replace(new RegExp(`\\b${id}\\b`, 'g'), `(${val})`);
    }
    // Only these math functions may appear; any other word means a bad formula.
    const allowed: Record<string, string> = { exp: 'Math.exp', ln: 'Math.log', min: 'Math.min', max: 'Math.max', sqrt: 'Math.sqrt' };
    const words = expr.match(/[A-Za-z_]+/g) ?? [];
    if (words.some((w) => !(w in allowed))) return 0;
    const sanitized = expr
      .replace(/[^0-9A-Za-z_+\-*/().,]/g, '')
      .replace(/[A-Za-z_]+/g, (w) => allowed[w]);
    if (!sanitized) return 0;
    const r = new Function(`return (${sanitized})`)();
    return isFinite(r) ? r : 0;
  } catch {
    return 0;
  }
}

const result = computed(() => evaluate(activeFormula.value));

const formattedResult = computed(() => {
  const val = result.value;
  switch (activeOutput.value.format) {
    case 'currency':
      return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'percentage':
      return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
    default:
      // Whole numbers for counts; one decimal for small values like frequency.
      return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: Math.abs(val) < 100 ? 1 : 0 });
  }
});

function applyPreset(preset: Preset) {
  trackUse();
  activePreset.value = preset.name;
  for (const [key, val] of Object.entries(preset.values)) {
    if (key in values) {
      values[key] = val;
      const input = props.inputs.find((i) => i.id === key);
      if (input && input.type !== 'select') display[key] = formatInput(input, val);
    }
  }
}

async function copyResult() {
  const text = `${activeOutput.value.label}: ${formattedResult.value}`;
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    copied.value = false;
  }
}
</script>
