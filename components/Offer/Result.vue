<script setup lang="ts">
const props = defineProps(["result", "index"]);
</script>

<template>
  <div
    class="flex border-b gap-10 items-center even:bg-gray-ultra-light px-2 py-1"
  >
    <div class="w-6">{{ props.index + 1 }}</div>
    <div class="w-[450px] flex gap-2">
      <span>{{ props.result.type }}</span>
      <span>{{ props.result.seeThrough }}</span>
      <span>{{ props.result.color }}</span>
    </div>
    <div class="w-20">{{ props.result.quantity }}</div>
    <div class="w-20">{{ props.result.price }}</div>
    <div class="w-20">{{ props.result.totalPrice }}</div>
  </div>
</template>
<style scoped></style>
