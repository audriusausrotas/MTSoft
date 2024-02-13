<script setup lang="ts">
const props = defineProps(["result", "index"]);
</script>

<template>
  <div class="flex border-b even:bg-gray-ultra-light py-1">
    <div class="w-6">{{ props.index + 1 }}</div>
    <div class="w-96">{{ props.result.type }}</div>
    <div class="w-20">{{ props.result.quantity }}</div>
    <div class="w-20">{{ props.result.price }}</div>
    <div class="w-20">{{ props.result.totalPrice }}</div>
    <div class="w-20">{{ props.result.color }}</div>
  </div>
</template>
<style scoped></style>
