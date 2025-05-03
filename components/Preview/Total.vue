<script setup lang="ts">
const props = defineProps(["values", "parts"]);
</script>

<template>
  <div class="border-y border-black font-semibold gap-6 px-2 py-1 flex justify-end">
    <p class="w-6"></p>
    <p class="flex-1 font-bold">Viso:</p>
    <p class="w-20">{{ props.values.cost?.toFixed(2) }} €</p>
    <p class="w-20">{{ props.values.price?.toFixed(2) }} €</p>
    <p class="w-20"></p>
    <p class="w-20">{{ props.values.profit?.toFixed(2) }} €</p>
    <p class="w-20">{{ props.values.margin?.toFixed(2) }} %</p>
    <div v-if="props.parts" class="w-16"></div>
  </div>
</template>

<style scoped></style>
