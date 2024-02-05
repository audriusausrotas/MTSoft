<script setup lang="ts">
import type { Measure } from "~/data/interfaces";
const props = defineProps(["index"]);
const useCalculations = useCalculationsStore();
const open = ref<boolean>(false);
const open2 = ref<boolean>(false);
const totalLength = ref<number>(0);
const oneHeight = ref<number>(0);

const cancelHandler = (): void => {
  open.value = false;
  totalLength.value = 0;
};

const cancelHandler2 = (): void => {
  open2.value = false;
  oneHeight.value = 0;
};

const oneHeightHandler = () => {
  useCalculations.oneHeight(props.index, oneHeight.value);
  cancelHandler2();
};

const calculateLengthHandler = (): void => {
  const totalMeasures: number[] = [];
  if (totalLength.value > 0) {
    const measures = Math.floor(+totalLength.value / 250);
    const modula = +totalLength.value % 250;
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
    useCalculations.updateMeasureLength({
      index: props.index,
      value: item,
      measureIndex: useCalculations.fences[props.index].measures.length - 1,
    });
  });

  open.value = false;
  totalLength.value = 0;
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
    <BaseButton
      v-if="!open"
      name="išskaičiuoti pagal ilgį"
      @click="open = !open"
    />

    <div v-else="open" class="flex overflow-hidden border rounded-lg">
      <input
        placeholder="Bendras Ilgis"
        type="number"
        class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
        v-model="totalLength"
        :autofocus="open"
        @keyup.enter="calculateLengthHandler"
      />
      <button
        class="w-12 text-white bg-dark-full hover:bg-red-full hover:cursor-pointer"
        @click="calculateLengthHandler"
      >
        OK
      </button>
      <button
        class="w-12 text-white border-l bg-dark-full hover:bg-red-full hover:cursor-pointer"
        @click="cancelHandler"
      >
        X
      </button>
    </div>

    <BaseButton v-if="!open2" name="Bendras aukštis" @click="open2 = !open2" />
    <div v-else="open2" class="flex overflow-hidden border rounded-lg">
      <input
        placeholder="Bendras aukštis"
        type="number"
        class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
        v-model="oneHeight"
        :autofocus="open2"
        @keyup.enter="oneHeightHandler"
      />
      <button
        class="w-12 text-white bg-dark-full hover:bg-red-full hover:cursor-pointer"
        @click="oneHeightHandler"
      >
        OK
      </button>
      <button
        class="w-12 text-white border-l bg-dark-full hover:bg-red-full hover:cursor-pointer"
        @click="cancelHandler2"
      >
        X
      </button>
    </div>
  </div>
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
  <div class="flex flex-wrap justify-center gap-4">
    <p>
      Bendras Ilgis: {{ useCalculations.fences[props.index].totalLength }} m
    </p>
    <p class="flex">
      Kvadratiniai metrai:
      {{ useCalculations.fences[props.index].totalQuantity }} m<span
        class="text-[10px] font-semibold"
        >2</span
      >
    </p>
  </div>
</template>
<style scoped></style>
