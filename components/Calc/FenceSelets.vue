<script setup lang="js">
import {fenceColors, fenceTypes, fenceMaterials, fenceSide } from "~/data/selectFieldData"

const props = defineProps(["index"]);
const useProject = useProjectStore();

const currentFence = useProject.fences[props.index]
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 xl:justify-normal">
    <BaseSelectField
      label="Tvoros pusė"
      :values="fenceSide"
      id="fenceSide"
      :defaultValue="currentFence.side"
      width="w-56"
      @onChange="
        (value) => useProject.updateSide({ index: props.index, value })
      "
    />
    <BaseSelectField
      label="Tvoros tipas"
      :values="fenceTypes"
      id="fenceType"
      :defaultValue="currentFence.type"
      width="w-56"
      @onChange="
        (value) => useProject.updateType({ index: props.index, value })
      "
    />
    <BaseSelectField
      label="Tvoros spalva"
      :values="fenceColors"
      id="fenceColor"
      :defaultValue="currentFence.color"
      width="w-56"
      @onChange="
        (value) => useProject.updateColor({ index: props.index, value })
      "
    />
    <BaseSelectField
      label="Skardos Tipas"
      :values="fenceMaterials"
      id="fenceMaterials"
      :defaultValue="currentFence.material"
      width="w-56"
      @onChange="
        (value) => useProject.updateMaterial({ index: props.index, value })
      "
    />
    <BaseInput
      placeholder="Tarpas Tarp Elementų"
      type="number"
      variant="light"
      label="tarpas tarp elementų"
      width="w-56"
      :name="currentFence.space"
      @onChange="
        (value) =>
          useProject.updateMeasureSpace({
            index: props.index,
            value,
            measureIndex,
          })
      "
    />
  </div>
</template>
<style scoped></style>
