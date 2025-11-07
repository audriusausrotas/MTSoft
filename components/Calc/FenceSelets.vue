<script setup lang="ts">
import {
  fenceSide,
  fenceDirection,
  services,
  parts,
  yesno,
  pramatomumas,
} from "~/data/selectFieldData";

const props = defineProps(["index"]);

const settingsStore = useSettingsStore();
const calculationsStore = useCalculationsStore();

const currentFence = calculationsStore.fences[props.index];

const needPoles = ref<boolean>(currentFence.parts.includes("Stulpai"));
const isOpen = ref<boolean>(false);

const isFence = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === currentFence?.name)
      ?.category === "Tvora"
);

const isFenceBoards = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === currentFence?.name)
      ?.category === "Tvoralentė"
);

const isSegment = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === currentFence?.name)
      ?.category === "Segmentas"
);

watch(isFence, (value) => {
  calculationsStore.updateBindings(props.index, value ? "Taip" : "Ne");
  calculationsStore.updateDirection(
    props.index,
    value ? "Horizontali" : "Vertikali"
  );
  calculationsStore.updateHoles(props.index, value ? "Taip" : "Ne");
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 wrap">
      <BaseSelectField
        label="Tvoros pusė"
        :values="fenceSide"
        id="fenceSide"
        :defaultValue="currentFence.side"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateSide(props.index, value)
      "
      />
    </div>
    <div
      class="flex flex-wrap justify-center items-end gap-4 xl:justify-normal"
    >
      <BaseSelectField
        label="Tvoros tipas"
        :values="settingsStore.selectValues.fenceTypes"
        id="fenceType"
        :defaultValue="currentFence.name"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateType(props.index, value)
        "
      />

      <BaseSelectField
        label="Tvoros spalva"
        :values="settingsStore.selectValues.fenceColors"
        id="fenceColor"
        :defaultValue="currentFence.color"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateColor(props.index, value)
        "
      />

      <BaseSelectField
        v-if="isFence"
        label="Pramatomumas"
        :values="pramatomumas"
        id="seeThrough"
        :defaultValue="currentFence.seeThrough"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateSeeThrough(props.index, value)
        "
      />

      <BaseSelectField
        v-if="isFence"
        label="Skardos Gamintojas"
        :values="settingsStore.selectValues.fenceManufacturers"
        id="fenceManufacturers"
        :defaultValue="currentFence.manufacturer"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateManufacturer(props.index, value)
        "
      />

      <BaseSelectField
        v-if="!isSegment"
        label="Skardos Tipas"
        :values="settingsStore.selectValues.fenceMaterials"
        id="fenceMaterials"
        :defaultValue="currentFence.material"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateMaterial(props.index, value)
        "
      />

      <BaseSelectField
        v-if="isFenceBoards"
        label="tvoros kryptis"
        :values="fenceDirection"
        id="fenceDirection"
        :defaultValue="currentFence.direction"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateDirection(props.index, value)
        "
      />

      <BaseSelectField
        label="Paslaugos"
        :values="services"
        id="services"
        :defaultValue="currentFence.services"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateServices(props.index, value)
        "
      />

      <BaseSelectField
        label="Detalės"
        :values="parts"
        id="parts"
        :defaultValue="currentFence.parts"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateParts(props.index, value)
        "
      />

      <BaseSelectField
        v-if="isFenceBoards"
        label="Dvipusė"
        :values="yesno"
        id="twoSided"
        :defaultValue="currentFence.twoSided"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateTwoSided(props.index, value)
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
        calculationsStore.updateSpace(props.index,
          value,
        )
        "
      />
      <BaseSelectField
        v-if="isFence"
        label="Apkaustai"
        :values="yesno"
        id="bingings"
        :defaultValue="currentFence.bindings"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateBindings(props.index, value)
        "
      />
      <BaseSelectField
        v-if="needPoles"
        label="ankeriuojami stulpai"
        :values="yesno"
        id="anchoredPoles"
        :defaultValue="currentFence.anchoredPoles"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateAnchoredPoles(props.index, value)
        "
      />
      <BaseSelectField
        v-if="isFence"
        label="Skylučių išmušimas"
        :values="yesno"
        id="holes"
        :defaultValue="currentFence.holes"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateHoles(props.index, value)
        "
      />
    </div>
    <div>
      <div
        class="flex gap-2 hover:cursor-pointer select-none"
        @click="isOpen = !isOpen"
      >
        <p class="text-md mb-1 pl-2">Komentarai</p>
        <NuxtImg
          src="icons/arrowDown.svg"
          width="10"
          :class="isOpen ? 'rotate-180' : ''"
          class="transition-all"
        />
      </div>
      <BaseInput
        v-if="isOpen"
        placeholder="Komentarai"
        variant="light"
        width="w-full max-w-[1264px]"
        :name="currentFence.comment"
        @onChange="(value: string) =>
        calculationsStore.updateComment(props.index,
          value,
        )
        "
      />
    </div>
  </div>
</template>
<style scoped></style>
