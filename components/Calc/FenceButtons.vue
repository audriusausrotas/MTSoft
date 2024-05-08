<script setup lang="ts">
import type { Measure } from "~/data/interfaces";
const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();

const oneHeightHandler = (oneHeight: string) => {
  useCalculations.oneHeight(props.index, +oneHeight);
};

const calculateLengthHandler = (totalLength: string): void => {
  const totalMeasures: number[] = [];
  if (+totalLength > 0) {
    const measures = Math.floor(+totalLength / 250);
    const modula = +totalLength % 250;
    for (let i = 0; i < measures; i++) {
      totalMeasures.push(250);
    }
    if (modula > 0) totalMeasures.push(modula);
  } else return;

  const checkCalculations = (): void => {
    const lastElement = totalMeasures.length - 1;
    const isShort = totalMeasures.some((item) => item === 250);
    if (totalMeasures[lastElement] < 200 && isShort) {
      totalMeasures[lastElement] += 50;
      for (let i = lastElement - 1; i >= 0; i--) {
        if (totalMeasures[i] === 250) {
          totalMeasures[i] -= 50;
          break;
        }
      }
      if (totalMeasures[lastElement] < 200 && isShort) checkCalculations();
    }
  };
  checkCalculations();

  totalMeasures.forEach((item) => {
    let lastElement: Measure =
      useCalculations.fences[props.index].measures[
      useCalculations.fences[props.index].measures.length - 1
      ];

    if (!lastElement) {
      useCalculations.addMeasure(props.index);
      lastElement = useCalculations.fences[props.index].measures[0];
    }

    if (
      lastElement.length !== 0 ||
      lastElement.kampas.exist ||
      lastElement.laiptas.exist
    ) {
      useCalculations.addMeasure(props.index);
    }
    useCalculations.updateMeasureLength(
      props.index,
      useCalculations.fences[props.index].measures.length - 1,
      item
    );
  });


};
</script>

<template>
  <div class="flex flex-wrap justify-center lg:justify-start gap-4 ">
    <BaseButton name="prideti nauja" @click="useCalculations.addMeasure(props.index)" />
    <BaseButton name="nukopijuoti paskutinį" @click="useCalculations.copyLast(props.index)" />
    <BaseButtonWithInput name="išskaičiuoti pagal ilgį" placeholder="Bendras Ilgis" type="number"
      @onConfirm="calculateLengthHandler" />
    <BaseButtonWithInput name="Bendras aukštis" placeholder="Bendras aukštis" type="number"
      @onConfirm="oneHeightHandler" />
    <div class="flex flex-wrap justify-center gap-4">
      <BaseButton name="įterpti kampą" @click="useCalculations.addKampas(props.index)" />
      <BaseButton name="įterpti laiptą" @click="useCalculations.addLaiptas(props.index)" />
      <BaseButton name="išvalyti visus" @click="useCalculations.deleteMeasures(props.index)" />
    </div>
  </div>
  <div class="flex flex-wrap justify-center gap-4">
    <p>
      Bendras Ilgis: {{ useCalculations.fences[props.index].totalLength }} m
    </p>
    <p class="flex">
      Kvadratiniai metrai:
      {{ useCalculations.fences[props.index].totalQuantity }} m<span class="text-[10px] font-semibold">2</span>
    </p>
  </div>
</template>
<style scoped></style>
