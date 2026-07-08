<script setup lang="ts">
const props = defineProps<{
  element: any;
}>();
</script>

<template>
  <div class="flex gap-4 px-2 py-1">
    <div class="w-48">{{ element.name }}</div>
    <div class="w-12">{{ element.quantity }}</div>
    <div class="w-12">{{ element.length }}</div>
    <div class="w-24 text-center">{{ new Date(element.timestamp).toLocaleString("lt-LT") }}</div>
    <div class="w-24">
      {{ element.location.measureIndex ? "Tvora " : "Lankstinys" }}
      {{ element.location.index + 1 }}
    </div>
    <div class="w-24">
      {{ element.location.measureIndex ? "Tarpas " + element.location.measureIndex : "---------" }}
    </div>
  </div>
</template>

<style scoped></style>
