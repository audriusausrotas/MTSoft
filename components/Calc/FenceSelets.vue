<script setup lang="ts">
import {
  fenceSide,
  fenceDirection,
  pramatomumas,
  verticals,
  services,
  parts,
  yesno,
} from "~/data/selectFieldData";

const props = defineProps(["index"]);

const useSettings = useSettingsStore();
const useCalculations = useCalculationsStore();

const currentFence = useCalculations.fences[props.index];
const isFenceBoards = ref<boolean>(verticals.includes(currentFence.type));
const isSegment = ref<boolean>(currentFence.type.includes("Segmentas"));
const needPoles = ref<boolean>(currentFence.parts.includes("Stulpai"));
const needBindings = ref<boolean>(true);
const isOpen = ref<boolean>(false);

watch(
  () => useCalculations.fences[props.index],
  (newValue) => {
    needPoles.value = newValue?.parts?.includes("Stulpai");
    isFenceBoards.value = verticals.includes(newValue?.type as string);
    isSegment.value = newValue?.type?.includes("Segmentas");

    if (newValue?.direction === "Horizontali" && !isFenceBoards.value && !isSegment.value) {
      if (newValue?.bindings === "Taip") {
        useCalculations.updateBindings(props.index, "Taip");
        needBindings.value = true;
      } else {
        useCalculations.updateBindings(props.index, "Ne");
        needBindings.value = false;
      }
    } else {
      useCalculations.updateBindings(props.index, "Ne");
      needBindings.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap justify-center items-end gap-4 xl:justify-normal">
      <BaseSelectField
        label="Tvoros pusė"
        :values="fenceSide"
        id="fenceSide"
        :defaultValue="currentFence.side"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateSide(props.index, value)
        "
      />

      <BaseSelectField
        v-if="useCalculations.retail"
        label="Tvoros tipas"
        :values="useSettings.selectValues.retailFenceTypes"
        id="fenceType"
        :defaultValue="currentFence.type"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateType(props.index, value)
        "
      />
      <BaseSelectField
        v-else
        label="Tvoros tipas"
        :values="useSettings.selectValues.fenceTypes"
        id="fenceType"
        :defaultValue="currentFence.type"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateType(props.index, value)
        "
      />

      <BaseSelectField
        label="Tvoros spalva"
        :values="useSettings.selectValues.fenceColors"
        id="fenceColor"
        :defaultValue="currentFence.color"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateColor(props.index, value)
        "
      />

      <BaseSelectField
        v-if="!isSegment"
        label="Skardos Tipas"
        :values="useSettings.selectValues.fenceMaterials"
        id="fenceMaterials"
        :defaultValue="currentFence.material"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateMaterial(props.index, value)
        "
      />

      <BaseSelectField
        v-if="!isFenceBoards && !isSegment"
        label="Pramatomumas"
        :values="pramatomumas"
        id="seeThrough"
        :defaultValue="currentFence.seeThrough"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateSeeThrough(props.index, value)
        "
      />

      <BaseSelectField
        v-if="!isSegment"
        label="tvoros kryptis"
        :values="fenceDirection"
        id="fenceDirection"
        :defaultValue="currentFence.direction"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateDirection(props.index, value)
        "
      />

      <BaseSelectField
        label="Paslaugos"
        :values="services"
        id="services"
        :defaultValue="currentFence.services"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateServices(props.index, value)
        "
      />

      <BaseSelectField
        label="Detalės"
        :values="parts"
        id="parts"
        :defaultValue="currentFence.parts"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateParts(props.index, value)
        "
      />

      <BaseSelectField
        v-if="isFenceBoards"
        label="Dvipusė"
        :values="yesno"
        id="twoSided"
        :defaultValue="currentFence.twoSided"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateTwoSided(props.index, value)
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
        useCalculations.updateSpace(props.index,
          value,
        )
        "
      />
      <BaseSelectField
        v-if="!isSegment && !isFenceBoards"
        label="Apkaustai"
        :values="yesno"
        id="bingings"
        :defaultValue="currentFence.bindings"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateBindings(props.index, value)
        "
      />
      <BaseSelectField
        v-if="needPoles"
        label="ankeriuojami stulpai"
        :values="yesno"
        id="anchoredPoles"
        :defaultValue="currentFence.anchoredPoles"
        width="w-60"
        @onChange="(value: string) => useCalculations.updateAnchoredPoles(props.index, value)
        "
      />
    </div>
    <div>
      <div class="flex gap-2 hover:cursor-pointer select-none" @click="isOpen = !isOpen">
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
        :name="currentFence.comment"
        @onChange="(value: string) =>
        useCalculations.updateComment(props.index,
          value,
        )
        "
      />
    </div>
  </div>
</template>
<style scoped></style>
