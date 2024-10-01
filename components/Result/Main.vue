<script setup lang="ts">
const emit = defineEmits(["onClear"]);

const clearHandler = () => {
  emit("onClear");
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <ResultClientButtons @onClear="clearHandler" />
    <ResultFence />
  </div>
</template>
<style scoped></style>
