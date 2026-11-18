<template>
  <!--
    A small looping scene for a tool page, in the visual language of the
    explainer scenes on halliardmedia.com. It draws what the tool does from
    the listing's own data (its features and category), never a picture of
    the vendor's product, and says so underneath.
  -->
  <figure class="m-0">
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-primary-600/5 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center gap-2 border-b border-gray-100 bg-gradient-to-r from-primary-50/70 to-white px-4 py-2.5 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
        <span class="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-gray-200 dark:bg-gray-700 dark:ring-gray-600" />
        <span class="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-gray-200 dark:bg-gray-700 dark:ring-gray-600" />
        <span class="h-2.5 w-2.5 rounded-full bg-white ring-1 ring-gray-200 dark:bg-gray-700 dark:ring-gray-600" />
        <span class="ml-2 truncate text-xs font-medium text-primary-700/80 dark:text-primary-300/80">{{ title }} · {{ kindLabel }}</span>
      </div>

      <div ref="el" class="relative h-56 overflow-hidden bg-gradient-to-b from-primary-50/40 to-white p-4 text-[12px] text-gray-700 sm:h-52 dark:from-gray-800 dark:to-gray-800 dark:text-gray-300" aria-hidden="true">
        <div class="h-full" :style="{ opacity }">
          <!-- PLAN: the budget splits across what the tool plans with -->
          <template v-if="kind === 'plan'">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900 dark:text-gray-100">Media plan</span>
              <span class="tabular-nums text-gray-500">Budget <b class="text-gray-900 dark:text-gray-100">${{ budgetShown }}</b></span>
            </div>
            <ul class="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              <li v-for="(f, i) in rows" :key="f" class="flex items-center gap-3" :style="appear(t, 200 + i * 220)">
                <span class="w-36 shrink-0 truncate sm:w-44">{{ f }}</span>
                <span class="relative h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <span class="absolute inset-y-0 left-0 rounded-full bg-primary-600 dark:bg-primary-400" :style="{ width: `${share[i] * prog(t, 500 + i * 220, 900) * 100}%` }" />
                </span>
                <span class="w-10 shrink-0 text-right tabular-nums text-gray-500">{{ Math.round(share[i] * prog(t, 500 + i * 220, 900) * 100) }}%</span>
              </li>
            </ul>
            <div class="mt-3 flex items-center gap-2 text-[11px] text-gray-500" :style="appear(t, 2200)">
              <span class="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-white">✓</span>
              Plan ready to share
            </div>
          </template>

          <!-- BUY: the tool sends spend out to where it buys -->
          <template v-else-if="kind === 'buy'">
            <svg viewBox="0 0 400 170" class="h-full w-full" preserveAspectRatio="xMidYMid meet">
              <g v-for="(f, i) in rows" :key="f">
                <path :d="link(i)" fill="none" class="stroke-gray-200 dark:stroke-gray-600" stroke-width="1.5" />
                <path :d="link(i)" fill="none" class="stroke-primary-600 dark:stroke-primary-400" stroke-width="2" pathLength="1" stroke-dasharray="1" :stroke-dashoffset="1 - prog(t, 300 + i * 250, 800)" />
                <circle v-if="pulse(i) > 0 && pulse(i) < 1" :cx="pointOn(i, pulse(i))[0]" :cy="pointOn(i, pulse(i))[1]" r="3.5" class="fill-primary-600 dark:fill-primary-400" />
                <g :style="appear(t, 600 + i * 250)">
                  <rect :x="196" :y="nodeY(i) - 13" width="196" height="26" rx="7" class="fill-white stroke-gray-200 dark:fill-gray-700 dark:stroke-gray-600" />
                  <text :x="206" :y="nodeY(i) + 4" font-size="10.5" class="fill-gray-700 dark:fill-gray-200">{{ short(f, 30) }}</text>
                </g>
              </g>
              <rect x="6" y="64" width="98" height="42" rx="10" class="fill-primary-600 dark:fill-primary-500" />
              <text x="55" y="89" font-size="11.5" font-weight="600" text-anchor="middle" fill="white">{{ short(title, 14) }}</text>
            </svg>
          </template>

          <!-- AUDIENCE: segments light up in a crowd of people -->
          <template v-else-if="kind === 'audience'">
            <div class="flex gap-4">
              <div class="grid flex-1 content-start justify-items-center gap-1.5" :style="{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }">
                <span
                  v-for="n in DOTS"
                  :key="n"
                  class="h-2.5 w-2.5 rounded-full transition-colors duration-300 sm:h-3 sm:w-3"
                  :class="dotClass(n - 1)"
                />
              </div>
              <ul class="m-0 flex w-40 shrink-0 list-none flex-col gap-2 p-0 sm:w-48">
                <li v-for="(f, i) in rows.slice(0, 3)" :key="f" class="flex items-center gap-2" :style="appear(t, 400 + i * 900)">
                  <span class="h-2.5 w-2.5 shrink-0 rounded-full" :class="segClass[i]" />
                  <span class="truncate">{{ f }}</span>
                </li>
              </ul>
            </div>
            <p class="mt-3 text-[11px] text-gray-500" :style="appear(t, 3200)">Who they are, what they watch, where to reach them</p>
          </template>

          <!-- MEASURE: what each channel contributed -->
          <template v-else>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900 dark:text-gray-100">What drove results</span>
              <span class="tabular-nums text-gray-500">Lift <b class="text-gray-900 dark:text-gray-100">+{{ Math.round(18 * prog(t, 400, 2400)) }}%</b></span>
            </div>
            <div class="mt-3 flex h-32 items-end gap-3">
              <div v-for="(f, i) in rows" :key="f" class="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
                <span class="block w-full max-w-[72px] rounded-t-md bg-primary-600 dark:bg-primary-400" :style="{ height: `${Math.min(85, share[i] * 240) * prog(t, 400 + i * 250, 900)}%` }" />
                <span class="w-full truncate text-center text-[10.5px]" :style="appear(t, 300 + i * 250)">{{ short(f, 22) }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <figcaption class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Illustration of what {{ title }} does, drawn from this listing. Not the product's own screens or data.
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { appear, prog, seed, useTimeline } from "./useTimeline";

const props = defineProps<{
  title: string;
  category?: string;
  tags?: string[];
  functionality?: string[];
}>();

// Which scene fits this tool, from its category first and its tags second.
const kind = computed<"plan" | "buy" | "audience" | "measure">(() => {
  const c = (props.category || "").toLowerCase();
  const tags = props.tags || [];
  if (/measure|mix model|attribution|analytics|incrementality/.test(c) || tags.includes("mmm")) return "measure";
  if (/consumer|audience|research|insight|intelligence|database/.test(c)) return "audience";
  if (/dsp|demand-side|buying|programmatic|marketplace|advertising platform|retail media|b2b advertising|social|video advertising/.test(c)) return "buy";
  if (/planning|workflow|operations|agency|productivity|workspace/.test(c)) return "plan";
  if (tags.includes("media-buying")) return "buy";
  if (tags.includes("audience-analytics") && !tags.includes("media-planning")) return "audience";
  return "plan";
});
const kindLabel = computed(() => ({ plan: "Planning", buy: "Buying", audience: "Audiences", measure: "Measurement" })[kind.value]);

const FALLBACK = { plan: ["Audiences", "Channels", "Budget", "Flighting"], buy: ["CTV", "Display", "Audio", "Social"], audience: ["Segments", "Media habits", "Reach"], measure: ["TV", "Search", "Social", "Display"] };
const rows = computed(() => {
  const f = (props.functionality || []).filter(Boolean).slice(0, 4);
  return f.length >= 3 ? f : FALLBACK[kind.value];
});
// Each tool gets its own fixed split, so pages differ but never change between visits.
const share = computed(() => {
  const raw = rows.value.map((r, i) => 0.35 + seed(props.title + r + i));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((x) => x / sum);
});

const { el, t, opacity } = useTimeline(kind.value === "audience" ? 6500 : 5500);

const budgetShown = computed(() => Math.round(250 * prog(t.value, 200, 1600)).toLocaleString("en-US") + "K");

const short = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

// Buying scene geometry.
const nodeY = (i: number) => 22 + i * (126 / Math.max(1, rows.value.length - 1));
const link = (i: number) => `M104,85 C150,85 150,${nodeY(i)} 196,${nodeY(i)}`;
function pointOn(i: number, p: number): [number, number] {
  const y = nodeY(i);
  const b = (a: number, c1: number, c2: number, d: number) =>
    (1 - p) ** 3 * a + 3 * (1 - p) ** 2 * p * c1 + 3 * (1 - p) * p ** 2 * c2 + p ** 3 * d;
  return [b(104, 150, 150, 196), b(85, 85, y, y)];
}
const pulse = (i: number) => prog(t.value, 1500 + i * 300, 1100);

// Audience scene: three segments, each lighting a fixed scatter of people.
const COLS = 20, DOTS = 120;
const segClass = ["bg-primary-600 dark:bg-primary-400", "bg-sky-400", "bg-violet-400"];
const members = computed(() => [0, 1, 2].map((s) => new Set(Array.from({ length: DOTS }, (_, i) => i).filter((i) => seed(props.title + s + "-" + i) < 0.22 + s * 0.04))));
function dotClass(i: number) {
  for (let s = 2; s >= 0; s--) {
    if (members.value[s].has(i) && t.value > 600 + s * 900 + (i % COLS) * 30) return segClass[s];
  }
  return "bg-gray-200 dark:bg-gray-600";
}
</script>
