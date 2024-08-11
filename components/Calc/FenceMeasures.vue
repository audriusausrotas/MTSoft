<script setup lang="ts">
import type { Measure } from "~/data/interfaces";
import { v4 } from "uuid";
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
  <div class="flex flex-col lg:sticky top-16 bg-white border-b z-40 py-2  gap-4">
    <CalcFenceButtons :index="props.index" />
  </div>
  <div class="flex flex-wrap justify-evenly">
    <CalcFenceMeasureElement v-for="(measure, measureIndex) in useCalculations.fences[props.index]
      .measures" :key="v4()" :measureIndex="measureIndex" :index="props.index" :measure="measure" />
  </div>
</template>
<style scoped></style>
