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

const selectedTags = useStore(tags);

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
  </div>
</template>
