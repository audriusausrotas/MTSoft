<script setup>
const props = defineProps(["message", "isError"]);
</script>

<template>
  <div
    :class="['capitalize', props.isError ? 'text-red-full' : 'text-green-500']"
  >
    {{ props.message }}
  </div>
</template>

<style scoped></style>
