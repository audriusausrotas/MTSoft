<script setup lang="ts">
const props = defineProps<{
  title: string;
  type: string;
}>();

const open = ref<boolean>(false);
</script>

<template>
  <div class="flex gap-4 select-none hover:cursor-pointer" @click="open = !open">
    <NuxtImg
      src="/icons/arrowDown.svg"
      alt="arrow-down"
      class="w-4 transition-transform duration-300"
      :class="open ? 'rotate-180' : ''"
    />
    <div class="font-bold text-xl">{{ title }}</div>
  </div>
  <WebsiteMain :type="type" v-if="open" />
</template>

<style scoped></style>
