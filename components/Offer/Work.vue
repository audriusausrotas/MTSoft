<script setup lang="ts">
const props = defineProps(["work", "index"]);
</script>

<template>
  <div class="flex border-b even:bg-gray-ultra-light gap-10 px-2 py-1">
    <div class="w-6">{{ props.index + 1 }}</div>
    <div class="w-[450px]">{{ props.work.name }}</div>
    <div class="w-20">{{ props.work.quantity }}</div>
    <div class="w-20">{{ props.work.price }}</div>
    <div class="w-20">{{ props.work.totalPrice }}</div>
  </div>
</template>
<style scoped></style>
