<script setup lang="ts">
const props = defineProps(["connected", "transporter"]);
</script>

<template>
  <div class="absolute top-1 right-1 flex gap-1">
    <div :class="['w-2 h-2 rounded-full ', connected ? 'bg-green-500' : 'bg-red-600']"></div>
    <div :class="['w-2 h-2 rounded-full ', transporter ? 'bg-green-500' : 'bg-red-600']"></div>
  </div>
</template>

<style scoped></style>
