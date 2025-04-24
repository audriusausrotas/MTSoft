<script setup lang="ts">
const props = defineProps(["index"]);
const calculationsStore = useCalculationsStore();

const oneHeightHandler = (oneHeight: string) => {
  calculationsStore.oneHeight(props.index, +oneHeight);
};

const calculateLengthHandler = (totalLength: string): void => {
  calculationsStore.calculatefromTotalLength(props.index, +totalLength);
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <BaseButton name="prideti nauja" @click="calculationsStore.addMeasure(props.index)" />
    <BaseButton name="nukopijuoti paskutinį" @click="calculationsStore.copyLast(props.index)" />
    <BaseButtonWithInput
      name="išskaičiuoti pagal ilgį"
      placeholder="Bendras Ilgis"
      type="number"
      @onConfirm="calculateLengthHandler"
    />
    <BaseButtonWithInput
      name="Bendras aukštis"
      placeholder="Bendras aukštis"
      type="number"
      @onConfirm="oneHeightHandler"
    />
    <div class="flex flex-wrap justify-center gap-4">
      <BaseButton name="įterpti kampą" @click="calculationsStore.addKampas(props.index)" />
      <BaseButton name="įterpti laiptą" @click="calculationsStore.addLaiptas(props.index)" />
      <BaseButton name="išvalyti visus" @click="calculationsStore.deleteMeasures(props.index)" />
    </div>
  </div>
</template>
<style scoped></style>
