<script setup lang="ts">
import { verticals } from "~/data/selectFieldData";
const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();

const isDouble = ref<boolean>(
  verticals.includes(useCalculations.fences[props.index].type)
);

watch(
  () => useCalculations.fences[props.index].type,
  (newType) => {
    isDouble.value = verticals.includes(newType);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 xl:justify-normal">
    <BaseCheckField
      v-if="isDouble"
      label="Dvipusė"
      @onChange="(value: boolean) =>
      useCalculations.updateMeasureTwoSided({ index: props.index, value })
      "
    />

    <BaseCheckField
      label="montavimas"
      name="montavimas"
      :checked="useCalculations.fences[props.index].montavimas"
      :onChange="(e: boolean) =>
      useCalculations.updateMontavimas({
        value: e,
        index: props.index,
      })
      "
    />

    <BaseCheckField
      label="borteliai"
      name="borteliai"
      :checked="useCalculations.fences[props.index].borteliai"
      :onChange="(e: boolean) =>
      useCalculations.updateBorteliai({
        value: e,
        index: props.index,
      })
      "
    />

    <BaseCheckField
      label="stulpai"
      name="stulpai"
      :checked="useCalculations.fences[props.index].stulpai"
      :onChange="(e: boolean) =>
      useCalculations.updateStulpai({
        value: e,
        index: props.index,
      })
      "
    />

    <BaseCheckField
      label="tik montavimas"
      name="tik montavimas"
      :checked="useCalculations.fences[props.index].tikMontavimas"
      :onChange="(e: boolean) =>
        useCalculations.updateTikMontavimas({
          value: e,
          index: props.index,
        })
        "
    />
  </div>
</template>
<style scoped></style>
