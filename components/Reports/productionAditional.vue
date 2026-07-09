<script setup lang="ts">
const props = defineProps<{
  element: any;
  index: number;
}>();

const isBinding =
  props.element.location?.measureIndex === undefined ||
  props.element.location?.measureIndex === null;
</script>

<template>
  <div class="flex gap-4 px-2 py-1 odd:bg-gray-100 text-center">
    <div class="w-8">{{ props.index + 1 }}</div>
    <div class="w-48">{{ element.name }}</div>
    <div class="w-14">{{ element.quantity }}</div>
    <div class="w-14">{{ (element.length / 100).toFixed(2) }}</div>
    <div class="w-24">{{ ((element.quantity * element.length) / 100).toFixed(2) }}</div>
    <div class="w-20">{{ element.bends }}</div>
    <div class="w-28">{{ (element.bendLength / 100).toFixed(2) }}</div>
    <div class="w-40">{{ new Date(element.timestamp).toLocaleString("lt-LT") }}</div>
    <div class="w-20 text-center">
      {{ element.location.index + 1 }}
    </div>
    <div class="w-20 text-center">
      {{ isBinding ? "---------" : +(element.location.measureIndex + 1) }}
    </div>
  </div>
</template>

<style scoped></style>
