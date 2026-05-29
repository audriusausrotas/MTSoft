<script setup lang="ts">
import { currentLengthValues } from "~/data/initialValues";
import { fenceDirection, services, parts, yesno, pramatomumas } from "~/data/selectFieldData";

const props = defineProps(["index"]);

const calculationsStore = useCalculationsStore();
const settingsStore = useSettingsStore();

const additionalBindingsValues = ["Nepridėti", "Pridėti 10 cm", "Pridėti 20 cm"];
const currentFence = calculationsStore.fences[props.index];
const needPoles = ref<boolean>(true);

const isFence = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === currentFence?.name)?.category === "Tvora",
);

const isFenceBoards = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === currentFence?.name)?.category ===
    "Tvoralentė",
);

const isSegment = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === currentFence?.name)?.category ===
    "Segmentas",
);

const changeTwosided = (value: string) => {
  calculationsStore.updateTwoSided(props.index, value);
  value === "Taip"
    ? calculationsStore.updateSpace(props.index, 6)
    : calculationsStore.updateSpace(props.index, 2);
};

watch(isFence, (value) => {
  calculationsStore.updateBindings(props.index, value ? "Taip" : "Ne");
  calculationsStore.updateDirection(props.index, value ? "Horizontali" : "Vertikali");
  calculationsStore.updateHoles(props.index, value ? "Taip" : "Ne");
});

watch(
  () => currentFence.parts,
  (value) => {
    if (value === "Borteliai, Stulpai" || value === "Tik Stulpai") needPoles.value = true;
    else needPoles.value = false;
  },
);
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div class="flex gap-4 wrap">
      <BaseSelectField
        label="Tvoros tipas"
        :values="settingsStore.selectValues.fenceTypes"
        id="fenceType"
        :defaultValue="currentFence.name"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateType(props.index, value)"
      />
      <BaseSelectField
        label="Tvoros spalva"
        :values="settingsStore.selectValues.fenceColors"
        id="fenceColor"
        :defaultValue="currentFence.color"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateColor(props.index, value)"
      />
      <BaseSelectField
        v-if="!isSegment"
        label="Skardos Tipas"
        :values="settingsStore.selectValues.fenceMaterials"
        id="fenceMaterials"
        :defaultValue="currentFence.material"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateMaterial(props.index, value)"
      />
      <BaseSelectField
        v-if="isFence"
        label="Pramatomumas"
        :values="pramatomumas"
        id="seeThrough"
        :defaultValue="currentFence.seeThrough"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateSeeThrough(props.index, value)"
      />
      <BaseSelectField
        v-if="isFence"
        label="Skardos Gamintojas"
        :values="settingsStore.selectValues.fenceManufacturers"
        id="fenceManufacturers"
        :defaultValue="currentFence.manufacturer"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateManufacturer(props.index, value)"
      />
      <BaseSelectField
        v-if="isFenceBoards"
        label="Tvoros kryptis"
        :values="fenceDirection"
        id="fenceDirection"
        :defaultValue="currentFence.direction"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateDirection(props.index, value)"
      />
    </div>
    <div class="flex flex-wrap justify-center items-end gap-4 xl:justify-normal">
      <BaseSelectField
        label="Paslaugos"
        :values="services"
        id="services"
        :defaultValue="currentFence.services"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateServices(props.index, value)"
      />

      <BaseSelectField
        label="Detalės"
        :values="parts"
        id="parts"
        :defaultValue="currentFence.parts"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateParts(props.index, value)"
      />

      <BaseSelectField
        v-if="isFenceBoards"
        label="Dvipusė"
        :values="yesno"
        id="twoSided"
        :defaultValue="currentFence.twoSided"
        width="w-60"
        @onChange="changeTwosided"
      />

      <BaseInput
        v-if="isFenceBoards"
        placeholder="Tarpas Tarp Elementų"
        type="number"
        variant="light"
        label="tarpas tarp elementų"
        width="w-60"
        :name="currentFence.space"
        @onChange="(value: number) => calculationsStore.updateSpace(props.index, value)"
      />
      <BaseSelectField
        v-if="isFence"
        label="Apkaustai"
        :values="yesno"
        id="bingings"
        :defaultValue="currentFence.bindings"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateBindings(props.index, value)"
      />
      <BaseSelectField
        v-if="currentFence.bindings === 'Taip'"
        label="Apkaustų ilgis"
        :values="additionalBindingsValues"
        id="additionalBindings"
        :defaultValue="currentFence.additionalBindings || additionalBindingsValues[0]"
        width="w-60"
        @onChange="
          (value: string) => calculationsStore.updateAdditionalBindings(props.index, value)
        "
      />
    </div>
    <div class="flex flex-wrap justify-center items-end gap-4 xl:justify-normal">
      <BaseSelectField
        label="Tarpų ilgis"
        :values="currentLengthValues"
        id="fenceLength"
        :defaultValue="calculationsStore.currentLength"
        width="w-60"
        @onChange="(value: string) => calculationsStore.changeCurrentLength(value)"
      />

      <BaseSelectField
        v-if="needPoles"
        label="ankeriuojami stulpai"
        :values="yesno"
        id="anchoredPoles"
        :defaultValue="currentFence.anchoredPoles"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateAnchoredPoles(props.index, value)"
      />
      <BaseSelectField
        v-if="isFence"
        label="Skylučių išmušimas"
        :values="yesno"
        id="holes"
        :defaultValue="currentFence.holes"
        width="w-60"
        @onChange="(value: string) => calculationsStore.updateHoles(props.index, value)"
      />
    </div>
  </div>
</template>
<style scoped></style>
