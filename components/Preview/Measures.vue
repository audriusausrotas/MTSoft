<script setup lang="ts">
const props = defineProps(["measure", "index", "isFenceboards", "isSegmentas"]);
</script>

<template>
  <div
    class="flex gap-2 items-center border px-3 py-2 rounded-lg  border-dark-light print:border-dark-full shadow-md print:shadow-none"
    :class="props.measure.gates.exist ? 'bg-red-500' : ''">
    <div class="font-semibold text-xl ">{{ props.index + 1 }}</div>
    <BaseInput :name="props.measure.length" label="Ilgis" width="w-20" />
    <BaseInput :name="props.measure.height" label="Aukštis" width="w-20" />

    <BaseInput :name="props.measure.elements || 1" label="Elementų" width="w-20" />
  </div>
</template>
<style scoped></style>
