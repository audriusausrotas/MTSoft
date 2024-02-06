<script setup lang="ts">
import type { Measure } from "~/data/interfaces";
const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();

watch(
  () => useCalculations.fences[props.index].measures,
  (newMeasures, oldMeasures) => {
    let totalM: number = 0;
    let totalQuantity: number = 0;
    newMeasures.forEach((item: Measure) => {
      totalM += +item.length!;
      totalQuantity += item.length! * item.height!;
    });
    useCalculations.updateTotalLength(props.index, totalM / 100);
    useCalculations.updateTotalQuantity(props.index, totalQuantity / 10000);
  },
  { deep: true }
);
</script>
<template>
  <div class="flex flex-col justify-center gap-4">
    <CalcFenceButtons :index="props.index" />
  </div>
  <div class="flex flex-col gap-4">
    <div
      v-if="useCalculations.fences[props.index].measures.length > 0"
      class="gap-4 py-3 flex bg-gray-ultra-light"
    >
      <p>Nr</p>
      <p>ilgis</p>
      <p>aukštis</p>
    </div>

    <CalcFenceMeasureElement
      v-for="(measure, measureIndex) in useCalculations.fences[props.index]
        .measures"
      :key="measureIndex"
      :measureIndex="measureIndex"
      :index="props.index"
      :measure="measure"
    />
  </div>
</template>
<style scoped></style>
