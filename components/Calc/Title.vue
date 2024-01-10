<script setup lang="js">
const emit = defineEmits(["onClick"]);
const props = defineProps(["name", "open"]);
</script>

<template>
  <div class="flex gap-2 text-lg font-semibold select-none hover:cursor-pointer" @click="emit('onClick')">
    <h6>{{ props.name }}</h6>
    <NuxtImg src="/icons/arrowDown.svg" width="8" height="8" decoding="auto" :class="props.open ? 'rotate-180' : ''"
      class="transition-all" />
  </div>
</template>
<style scoped></style>
