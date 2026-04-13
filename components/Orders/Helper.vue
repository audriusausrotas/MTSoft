<script setup lang="ts">
const props = defineProps<{
  label: string;
  color: string;
  value: string;
}>();
</script>

<template>
  <div class="w-36 shrink-0 text-center">
    <p class="text-sm font-medium">{{ props.label }}</p>
    <div
      :class="`${props.color}`"
      class="h-9 flex items-center justify-center rounded-lg font-bold tracking-wide"
    >
      {{ value }}
    </div>
  </div>
</template>

<style scoped></style>
