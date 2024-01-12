<script setup lang="ts">
import {
  fenceColors,
  fenceTypes,
  fenceMaterials,
  fenceSide,
} from "~/data/selectFieldData";

const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();

const currentFence = useCalculations.fences[props.index];
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 xl:justify-normal">
    <BaseSelectField
      label="Tvoros pusė"
      :values="fenceSide"
      id="fenceSide"
      :defaultValue="currentFence.side"
      width="w-56"
      @onChange="(value: string) => useCalculations.updateSide({ index: props.index, value })
        "
    />
    <BaseSelectField
      label="Tvoros tipas"
      :values="fenceTypes"
      id="fenceType"
      :defaultValue="currentFence.type"
      width="w-56"
      @onChange="(value: string) => useCalculations.updateType({ index: props.index, value })
        "
    />
    <BaseSelectField
      label="Tvoros spalva"
      :values="fenceColors"
      id="fenceColor"
      :defaultValue="currentFence.color"
      width="w-56"
      @onChange="(value: string) => useCalculations.updateColor({ index: props.index, value })
        "
    />
    <BaseSelectField
      label="Skardos Tipas"
      :values="fenceMaterials"
      id="fenceMaterials"
      :defaultValue="currentFence.material"
      width="w-56"
      @onChange="(value: string) => useCalculations.updateMaterial({ index: props.index, value })
        "
    />
    <BaseInput
      placeholder="Tarpas Tarp Elementų"
      type="number"
      variant="light"
      label="tarpas tarp elementų"
      width="w-56"
      :name="currentFence.space"
      @onChange="(value: number) =>
        useCalculations.updateMeasureSpace({
          index: props.index,
          value,
        })
        "
    />
  </div>
</template>
<style scoped></style>
