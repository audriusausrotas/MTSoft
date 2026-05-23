<script setup lang="ts">
const props = defineProps(["data", "index"]);
</script>

<template>
  <div
    v-if="props.data.laiptas.exist"
    class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex select-none h-8"
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
    class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Kampas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.kampas.value }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">laipsnių</p>
  </div>
  <div v-else class="w-fit h-8 odd:bg-gray-ultra-light border-b border-black flex select-none">
    <div class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </div>

    <div class="w-20 flex items-center justify-center h-full border-r border-black px-1">
      {{ props.data.length }}
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      {{ props.data.elements }}
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      {{ props.data.height }}
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      {{ props.data.cut }}
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      {{ props.data.done }}
    </div>
  </div>
</template>
<style scoped></style>
