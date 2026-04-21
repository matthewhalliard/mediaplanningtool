<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { tags } from '@/store.js';
import config from "@util/themeConfig";
import type Tag from "@/types/Tag";

const availableTags = config.directoryData.tags as Tag[] | undefined;

const selectedTags = useStore(tags);

function toggleTagByName(tag: string) {
  if (!tag) return;
  
  if (!selectedTags.value.includes(tag as never)) {
    tags.set([...selectedTags.value, tag] as never[]);
  }
  else {
    let filtered = selectedTags.value.filter(e => e !== tag);
    tags.set([...filtered]);
  }
}

function getTagColorClass(tagObj: Tag) {
  const colorClass = tagObj?.color ? `${tagObj.color}-tag` : 'gray-tag';
  return colorClass;
}
</script>

<template>
  <div class="tag-filter-bar flex flex-wrap gap-2 mt-4">
    <span
      v-for="tag in availableTags"
      class="tag cursor-pointer select-none transition-all duration-200 hover:opacity-80"
      :class="[getTagColorClass(tag), selectedTags.includes(tag.key) ? 'ring-2 ring-primary-500 ring-offset-1' : '']"
      @click="toggleTagByName(tag.key)"
    >
      {{ tag.name }}
    </span>
  </div>
</template>

<style>
/* Neutralize filter-bar pill colors so the header stays calm. */
.tag-filter-bar .tag {
  background-color: rgb(249 250 251) !important; /* gray-50 */
  color: rgb(55 65 81) !important; /* gray-700 */
  --tw-ring-color: rgb(209 213 219 / 0.6) !important; /* gray-300/60 */
}
.dark .tag-filter-bar .tag {
  background-color: rgb(55 65 81 / 0.4) !important; /* gray-700/40 */
  color: rgb(209 213 219) !important; /* gray-300 */
  --tw-ring-color: rgb(75 85 99 / 0.5) !important; /* gray-600/50 */
}
.tag-filter-bar .tag.ring-primary-500 {
  --tw-ring-color: var(--color-primary-500) !important;
}
</style>