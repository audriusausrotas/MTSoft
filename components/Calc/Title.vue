<script setup lang="ts">
const emit = defineEmits(["onClick"]);
const props = defineProps(["name", "open"]);
</script>

<template>
  <div
    class="flex gap-2 text-lg font-semibold select-none hover:cursor-pointer"
    @click="emit('onClick')"
  >
    <h6>{{ props.name }}</h6>
    <NuxtImg
      src="/icons/arrowDown.svg"
      width="10"
      height="10"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      :class="props.open ? 'rotate-180' : ''"
      class="transition-all"
    />
  </div>
</template>
<style scoped></style>
