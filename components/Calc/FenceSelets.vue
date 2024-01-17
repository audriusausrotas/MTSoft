<script setup lang="ts">
import {
  fenceColors,
  fenceTypes,
  fenceMaterials,
  fenceSide,
  fenceDirection,
  pramatomumas,
  verticals,
} from "~/data/selectFieldData";

const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();

const isFenceBoards = ref(false);

const currentFence = useCalculations.fences[props.index];

watch(
  () => useCalculations.fences[props.index].type,
  (newType) => {
    console.log(newType);
    isFenceBoards.value = verticals.includes(newType);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-wrap justify-center items-end gap-4 xl:justify-normal">
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

    <BaseSelectField
      v-if="isFenceBoards"
      label="tvoros kryptis"
      :values="fenceDirection"
      id="fenceDirection"
      :defaultValue="currentFence.direction"
      width="w-56"
      @onChange="(value: string) => useCalculations.updateDirection({ index: props.index, value })
        "
    />

    <BaseSelectField
      v-if="!isFenceBoards"
      label="Pramatomumas"
      :values="pramatomumas"
      id="seeThrough"
      :defaultValue="currentFence.seeThrough"
      width="w-56"
      @onChange="(value: string) => useCalculations.updateSeeThrough({ index: props.index, value })
        "
    />

    <BaseInput
      v-if="isFenceBoards"
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
