<script setup lang="ts">
const route = useRoute();
const selected = ref<any>(route.name);

watch(
  () => route.name,
  (newPath) => {
    selected.value = newPath;
  }
);
</script>

<template>
  <div
    class="WS flex text-xl border text-center overflow-hidden rounded-lg shadow-bottom"
  >
    <NuxtLink
      :to="'/perziura/' + route.params.id"
      class="flex-1 hover:bg-red-full hover:text-white h-full py-6"
      :class="selected === 'perziura-id' ? 'bg-red-full text-white' : ''"
      >Apžvalga</NuxtLink
    >
    <NuxtLink
      :to="'/perziura/' + route.params.id + '/gamybai'"
      class="flex-1 hover:bg-red-full hover:text-white h-full py-6"
      :class="
        selected === 'perziura-id-gamybai' ? 'bg-red-full text-white' : ''
      "
      >Gamybai</NuxtLink
    >
    <NuxtLink
      :to="'/perziura/' + route.params.id + '/montuotojams'"
      class="flex-1 hover:bg-red-full hover:text-white h-full py-6"
      :class="
        selected === 'perziura-id-montuotojams' ? 'bg-red-full text-white' : ''
      "
      >Montuotojams</NuxtLink
    >
  </div>
</template>
<style scoped></style>
