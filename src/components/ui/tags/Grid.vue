<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { tags } from '@/store.js';
import config from "@util/themeConfig";
import type Tag from "@/types/Tag";

const props = defineProps<{
  keys?: string[];
  counts?: Record<string, number>;
}>();

const allTags = config.directoryData.tags as Tag[] | undefined;
const availableTags = computed(() => {
  if (!props.keys) return allTags ?? [];
  return props.keys
    .map((key) => allTags?.find((t) => t.key === key))
    .filter((t): t is Tag => Boolean(t));
});

// Tags beyond the pill row stay reachable through the "More filters" menu.
const extraTags = computed(() => {
  if (!props.keys) return [];
  return (allTags ?? []).filter((t) => t.key && !props.keys!.includes(t.key));
});

const selectedTags = useStore(tags);

const selectedExtras = computed(() =>
  extraTags.value.filter((t) => selectedTags.value.includes(t.key as never)),
);

function addFromMenu(event: Event) {
  const select = event.target as HTMLSelectElement;
  const key = select.value;
  if (key && !selectedTags.value.includes(key as never)) {
    tags.set([...selectedTags.value, key] as never[]);
  }
  select.value = "";
}

function toggleTag(tag: string | undefined) {
  if (!tag) return;
  if (!selectedTags.value.includes(tag as never)) {
    tags.set([...selectedTags.value, tag] as never[]);
  } else {
    tags.set(selectedTags.value.filter((e) => e !== tag));
  }
}

function clearTags() {
  tags.set([]);
}

const base = 'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors cursor-pointer select-none';
const idle = 'border-gray-200 bg-white text-ink hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';
const active = 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink';
</script>

<template>
  <div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by use case">
    <button type="button" :class="[base, selectedTags.length === 0 ? active : idle]" :aria-pressed="selectedTags.length === 0" @click="clearTags">
      All
    </button>
    <button
      v-for="tag in availableTags"
      :key="tag.key"
      type="button"
      :class="[base, selectedTags.includes(tag.key as never) ? active : idle]"
      :aria-pressed="selectedTags.includes(tag.key as never)"
      @click="toggleTag(tag.key)"
    >
      {{ tag.name }}
      <span v-if="counts && tag.key && counts[tag.key]" class="font-mono text-xs opacity-60">{{ counts[tag.key] }}</span>
    </button>
    <button
      v-for="tag in selectedExtras"
      :key="'extra-' + tag.key"
      type="button"
      :class="[base, active]"
      aria-pressed="true"
      :aria-label="'Remove filter ' + tag.name"
      @click="toggleTag(tag.key)"
    >
      {{ tag.name }}
      <span aria-hidden="true" class="opacity-70">×</span>
    </button>
    <label v-if="extraTags.length" :class="[base, idle, 'relative pr-8']">
      <span>More filters</span>
      <svg class="pointer-events-none absolute right-3 h-3.5 w-3.5 opacity-60" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m6 8 4 4 4-4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <select class="absolute inset-0 cursor-pointer opacity-0" aria-label="More filters" @change="addFromMenu">
        <option value="" selected>More filters</option>
        <option
          v-for="tag in extraTags"
          :key="'opt-' + tag.key"
          :value="tag.key"
          :disabled="selectedTags.includes(tag.key as never)"
        >
          {{ tag.name }}{{ counts && tag.key && counts[tag.key] ? ' (' + counts[tag.key] + ')' : '' }}
        </option>
      </select>
    </label>
  </div>
</template>
