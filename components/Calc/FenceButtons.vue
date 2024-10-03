<script setup lang="ts">
const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();

const oneHeightHandler = (oneHeight: string) => {
  useCalculations.oneHeight(props.index, +oneHeight);
};

const calculateLengthHandler = (totalLength: string): void => {
  useCalculations.calculatefromTotalLength(props.index, +totalLength);
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <BaseButton
      name="prideti nauja"
      @click="useCalculations.addMeasure(props.index)"
    />
    <BaseButton
      name="nukopijuoti paskutinį"
      @click="useCalculations.copyLast(props.index)"
    />
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
      <BaseButton
        name="įterpti kampą"
        @click="useCalculations.addKampas(props.index)"
      />
      <BaseButton
        name="įterpti laiptą"
        @click="useCalculations.addLaiptas(props.index)"
      />
      <BaseButton
        name="išvalyti visus"
        @click="useCalculations.deleteMeasures(props.index)"
      />
    </div>
  </div>
</template>
<style scoped></style>
