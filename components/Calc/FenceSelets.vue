<script setup lang="ts">
import {
  fenceColors,
  fenceTypes,
  fenceMaterials,
  fenceSide,
  fenceDirection,
  pramatomumas,
  verticals,
  services,
  parts,
  twoSided,
} from "~/data/selectFieldData";

const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();
const currentFence = useCalculations.fences[props.index];

const isFenceBoards = ref<boolean>(false);
const isOpen = ref<boolean>(false);

watch(
  () => useCalculations.fences[props.index].type,
  (newValue) => {
    const isTrue = verticals.includes(newValue as string);
    isFenceBoards.value = isTrue;
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex flex-wrap justify-center items-end gap-4 xl:justify-normal"
    >
      <BaseSelectField
        label="Tvoros pusė"
        :values="fenceSide"
        id="fenceSide"
        :defaultValue="currentFence.side"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateSide({ index: props.index, value })
        "
      />

      <BaseSelectField
        label="Tvoros tipas"
        :values="fenceTypes"
        id="fenceType"
        :defaultValue="currentFence.type"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateType({ index: props.index, value })
        "
      />

      <BaseSelectField
        label="Tvoros spalva"
        :values="fenceColors"
        id="fenceColor"
        :defaultValue="currentFence.color"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateColor({ index: props.index, value })
        "
      />

      <BaseSelectField
        label="Skardos Tipas"
        :values="fenceMaterials"
        id="fenceMaterials"
        :defaultValue="currentFence.material"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateMaterial({ index: props.index, value })
        "
      />

      <BaseSelectField
        v-if="!isFenceBoards"
        label="Pramatomumas"
        :values="pramatomumas"
        id="seeThrough"
        :defaultValue="currentFence.seeThrough"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateSeeThrough({ index: props.index, value })
        "
      />

      <BaseSelectField
        label="tvoros kryptis"
        :values="fenceDirection"
        id="fenceDirection"
        :defaultValue="currentFence.direction"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateDirection({ index: props.index, value })
        "
      />

      <BaseSelectField
        label="Paslaugos"
        :values="services"
        id="services"
        :defaultValue="currentFence.services"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateServices({ index: props.index, value })
        "
      />

      <BaseSelectField
        label="Detalės"
        :values="parts"
        id="parts"
        :defaultValue="currentFence.parts"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateParts({ index: props.index, value })
        "
      />

      <BaseSelectField
        v-if="isFenceBoards"
        label="Dvipusė"
        :values="twoSided"
        id="twoSided"
        :defaultValue="currentFence.twoSided"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateTwoSided({ index: props.index, value })
        "
      />

      <BaseInput
        v-if="isFenceBoards"
        placeholder="Tarpas Tarp Elementų"
        type="number"
        variant="light"
        label="tarpas tarp elementų"
        width="w-60"
        :name="currentFence.space"
        @onChange="(value: number) =>
        useCalculations.updateMeasureSpace({
          index: props.index,
          value,
        })
        "
      />
    </div>
    <div>
      <div
        class="flex gap-2 hover:cursor-pointer select-none"
        @click="isOpen = !isOpen"
      >
        <p class="text-md">Papildoma Informacija</p>
        <NuxtImg
          src="icons/arrowDown.svg"
          width="10"
          :class="isOpen ? 'rotate-180' : ''"
          class="transition-all"
        />
      </div>
      <BaseInput
        v-if="isOpen"
        placeholder="Papildoma informacija"
        variant="light"
        width="w-full max-w-[1008px]"
        class="mb-8"
        :name="currentFence.aditional"
        @onChange="(value: string) =>
        useCalculations.updateAditional({
          index: props.index,
          value,
        })
        "
      />
    </div>
  </div>
</template>
<style scoped></style>
