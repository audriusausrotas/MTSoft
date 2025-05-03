<script setup lang="ts">
const props = defineProps(["data", "index", "fenceSide"]);

const indexColor = computed(() => {
  return props.data.postone
    ? "bg-red-full text-white"
    : +props.data.cut === 0 || props.data.cut === undefined
    ? "bg-transparent"
    : +props.data.cut === +props.data.elements && +props.data.done === +props.data.elements
    ? "bg-green-500"
    : +props.data.cut > +props.data.elements
    ? "bg-red-full"
    : +props.data.cut === +props.data.elements
    ? "bg-green-300"
    : "bg-orange-400";
});

const doneColor = computed(() => {
  return +props.data.done === +props.data.elements
    ? "bg-green-500"
    : +props.data.done === 0 || props.data.done === undefined
    ? "bg-transparent"
    : +props.data.done > +props.data.elements
    ? "bg-red-full"
    : "bg-orange-500";
});
</script>

<template>
  <div
    v-if="props.data.laiptas.exist"
    class="border-b border-black odd:bg-gray-ultra-light flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Laiptas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.laiptas.direction }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.laiptas.value }} cm
    </p>
    <p class="flex-1 h-full border-r border-black"></p>
  </div>

  <div
    v-else-if="props.data.kampas.exist"
    class="border-b border-black odd:bg-gray-ultra-light flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Kampas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.kampas.value }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">laipsnių</p>
    <p class="flex-1 h-full border-r border-black"></p>
  </div>
  <div v-else class="w-fit h-8 odd:bg-gray-ultra-light border-b border-black flex select-none">
    <p
      class="w-10 flex items-center justify-center h-full border-x border-black"
      :class="indexColor"
    >
      {{ props.index + 1 }}
    </p>

    <div class="w-20 flex items-center justify-center h-full border-r border-black px-1">
      <div class="w-full">{{ props.data.length }}</div>
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      <div class="w-full">{{ props.data.elements }}</div>
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      <div class="w-full">{{ props.data.height }}</div>
    </div>
  </div>
</template>
<style scoped></style>
