<template>
  <div>
    <!-- Progress Bar -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Progress: {{ checkedCount }} / {{ totalCount }} items
        </span>
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">
            {{ progressPercent }}%
          </span>
          <button
            @click="togglePrintView"
            class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print
          </button>
        </div>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          class="bg-primary-600 h-3 rounded-full transition-all duration-300"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
    </div>

    <!-- Sections -->
    <div
      v-for="(section, sIdx) in sections"
      :key="sIdx"
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden"
    >
      <div class="px-6 md:px-8 py-5 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">{{ section.heading }}</h2>
      </div>
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        <div
          v-for="(item, iIdx) in section.items"
          :key="iIdx"
          class="px-6 md:px-8 py-5 cursor-pointer transition-colors"
          :class="{ 'bg-green-50/50 dark:bg-green-900/10': isChecked(sIdx, iIdx) }"
          @click="toggleItem(sIdx, iIdx)"
        >
          <div class="flex items-start gap-4">
            <div class="mt-0.5 flex-shrink-0">
              <div
                class="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors"
                :class="isChecked(sIdx, iIdx)
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 dark:border-gray-600'"
              >
                <svg
                  v-if="isChecked(sIdx, iIdx)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-start gap-2 mb-1">
                <h3
                  class="text-lg font-semibold flex-1"
                  :class="isChecked(sIdx, iIdx)
                    ? 'text-gray-400 dark:text-gray-500 line-through'
                    : 'text-gray-900 dark:text-gray-100'"
                >
                  {{ item.title }}
                </h3>
                <span
                  v-if="item.difficulty"
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="difficultyClass(item.difficulty)"
                >
                  {{ item.difficulty }}
                </span>
                <span
                  v-if="item.priority"
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="priorityClass(item.priority)"
                >
                  {{ item.priority }}
                </span>
              </div>
              <p
                class="leading-relaxed"
                :class="isChecked(sIdx, iIdx)
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-400'"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface ChecklistItem {
  title: string;
  description: string;
  difficulty?: string;
  priority?: string;
  channel_relevance?: string[];
}

interface ChecklistSection {
  heading: string;
  items: ChecklistItem[];
}

const props = defineProps<{
  sections: ChecklistSection[];
}>();

const checkedItems = ref<Set<string>>(new Set());
const storageKey = 'pseo-checklist-' + (typeof window !== 'undefined' ? window.location.pathname : '');

const totalCount = computed(() =>
  props.sections.reduce((sum, s) => sum + s.items.length, 0)
);

const checkedCount = computed(() => checkedItems.value.size);

const progressPercent = computed(() =>
  totalCount.value === 0 ? 0 : Math.round((checkedCount.value / totalCount.value) * 100)
);

function itemKey(sIdx: number, iIdx: number): string {
  return `${sIdx}-${iIdx}`;
}

function isChecked(sIdx: number, iIdx: number): boolean {
  return checkedItems.value.has(itemKey(sIdx, iIdx));
}

function toggleItem(sIdx: number, iIdx: number) {
  const key = itemKey(sIdx, iIdx);
  const next = new Set(checkedItems.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  checkedItems.value = next;
  saveState();
}

function saveState() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, JSON.stringify([...checkedItems.value]));
  }
}

function loadState() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        checkedItems.value = new Set(JSON.parse(stored));
      } catch {
        checkedItems.value = new Set();
      }
    }
  }
}

function togglePrintView() {
  window.print();
}

function difficultyClass(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return map[difficulty] || '';
}

function priorityClass(priority: string): string {
  const map: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    important: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'nice-to-have': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  };
  return map[priority] || '';
}

onMounted(() => {
  loadState();
});
</script>
