<script setup lang="ts">
const props = defineProps(["values", "parts"]);
</script>

<template>
  <div
    class="border-y border-black font-semibold gap-6 px-2 py-1 flex justify-center lg:justify-end flex-wrap"
  >
    <p class="w-6 hidden lg:block"></p>
    <p class="flex-1 font-bold hidden lg:block">Viso:</p>
    <div class="flex flex-col">
      <p class="font-bold lg:hidden">Savikaina</p>
      <p class="w-20">{{ props.values.cost?.toFixed(2) }} €</p>
    </div>
    <div class="flex flex-col">
      <p class="font-bold lg:hidden">Kaina</p>
      <p class="w-20">{{ props.values.price?.toFixed(2) }} €</p>
    </div>
    <p class="w-20 hidden lg:block"></p>
    <div class="flex flex-col">
      <p class="font-bold lg:hidden">Pelnas</p>
      <p class="w-20">{{ props.values.profit?.toFixed(2) }} €</p>
    </div>
    <div class="flex flex-col">
      <p class="font-bold lg:hidden">Marža</p>
      <p class="w-20">{{ props.values.margin?.toFixed(2) }} %</p>
    </div>
    <div v-if="props.parts" class="w-16 hidden lg:block"></div>
    <div v-if="props.parts" class="w-16 hidden lg:block"></div>
  </div>
</template>

<style scoped></style>
