<script setup lang="ts">
const selectedTab = ref(0);
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div
      class="flex w-full text-3xl h-full font-semibold border rounded-lg border-gray-light shadow-lg divide-x divide-gray-light text-center overflow-hidden"
    >
      <button
        @click="selectedTab = 0"
        class="flex-1 py-4 hover:bg-red-full hover:text-white"
        :class="{ 'bg-red-full text-white': selectedTab === 0 }"
      >
        Projektai
      </button>
      <button
        @click="selectedTab = 1"
        class="flex-1 py-4 hover:bg-red-full hover:text-white"
        :class="{ 'bg-red-full text-white': selectedTab === 1 }"
      >
        Gamyba
      </button>
    </div>
    <ReportsProjects v-if="selectedTab === 0" />
    <ReportsProduction v-else />
  </div>
</template>

<style scoped></style>
