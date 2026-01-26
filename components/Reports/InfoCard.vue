<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  extra: {
    type: String,
    required: false,
  },
  filtered: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col justify-between border rounded-lg p-4 max-w-720 w-full gap-6 bg-white">
    <div>{{ name }}</div>
    <div class="font-bold text-4xl">{{ filtered.toFixed(2) || 0 }}</div>
    <div class="flex gap-4">
      <div>{{ extra }}</div>
      <div>{{ total.toFixed(2) || 0 }}</div>
    </div>
  </div>
</template>

<style scoped></style>
