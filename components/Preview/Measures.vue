<script setup lang="ts">
const props = defineProps(["measure", "index", "isFenceboards", "isSegmentas"]);
</script>

<template>
  <div
    class="flex gap-4 items-center border px-3 py-2 rounded-lg border-dark-light shadow-md"
    :class="props.measure.gates.exist ? 'bg-red-500' : ''"
  >
    <div class="font-semibold text-xl w-4">{{ props.index + 1 }}</div>
    <BaseInput
      v-if="!isFenceboards"
      :name="props.measure.length"
      label="Ilgis"
      width="w-24"
    />
    <BaseInput
      v-if="isFenceboards || isSegmentas"
      :name="props.measure.height"
      label="Aukštis"
      width="w-24"
    />

    <BaseInput
      v-if="!isSegmentas"
      :name="props.measure.elements"
      label="Elementų"
      width="w-24"
    />
  </div>
</template>
<style scoped></style>
