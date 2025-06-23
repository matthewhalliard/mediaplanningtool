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
  <div class="flex flex-wrap gap-2 mt-4">
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