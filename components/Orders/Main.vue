<script setup lang="ts">
const props = defineProps(["data", "index"]);
</script>

<template>
  <div class="flex gap-2 border-b max-w-fit">
    <div class="w-6">{{ index + 1 }}</div>
    <div class="w-96">{{ data.name }}</div>
    <div class="w-10">{{ data.color }}</div>
    <div class="w-10">{{ data.quantity }}</div>
  </div>
</template>
<style scoped></style>
