<script setup lang="ts">
const props = defineProps(["index", "data"]);
</script>

<template>
  <div
    v-if="props.data.laiptas.exist"
    class="text-center w-fit odd:bg-gray-ultra-light flex select-none py-1"
  >
    <p class="w-10">
      {{ props.index + 1 }}
    </p>
    <p class="flex-1">Laiptas</p>
    <p class="flex-1">
      {{ props.data.laiptas.direction }}
    </p>
    <p class="flex-1">{{ props.data.laiptas.value }} cm</p>
  </div>
  <div
    v-else-if="props.data.kampas.exist"
    class="text-center w-fit shadow-md odd:bg-gray-ultra-light flex select-none py-1"
  >
    <p class="w-10">
      {{ props.index + 1 }}
    </p>
    <p class="flex-1">Kampas</p>
    <p class="flex-1">
      {{ props.data.kampas.value }}
    </p>
    <p class="flex-1">laipsnių</p>
  </div>
  <div
    v-else
    class="py-1 text-center odd:bg-gray-ultra-light shadow flex w-full select-none"
  >
    <p class="w-10">
      {{ props.index + 1 }}
    </p>

    <div class="flex-1">
      {{ props.data.length }}
    </div>

    <div class="flex-1">
      {{ props.data.height }}
    </div>

    <div class="flex-1">
      {{ props.data.elements }}
    </div>
  </div>
</template>
<style scoped></style>
