<script setup lang="ts">
import { v4 } from "uuid";
const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();
</script>
<template>
  <div class="flex flex-col lg:sticky top-16 bg-white border-b z-40 py-2 gap-4">
    <CalcFenceButtons :index="props.index" />
  </div>
  <div class="flex flex-wrap justify-evenly">
    <CalcFenceMeasureElement
      v-for="(measure, measureIndex) in useCalculations.fences[props.index].measures"
      :key="v4()"
      :measureIndex="measureIndex"
      :index="props.index"
      :measure="measure"
    />
  </div>
</template>
<style scoped></style>
