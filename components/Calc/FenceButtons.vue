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
  <div class="flex flex-col items-center">
    <div class="flex flex-wrap justify-center gap-4 border-b py-4 border-primary-gold">
      <BaseButton name="prideti nauja" @click="calculationsStore.addMeasure(props.index)" />
      <BaseButton name="nukopijuoti paskutinį" @click="calculationsStore.copyLast(props.index)" />
      <BaseButtonWithInput
        name="išskaičiuoti pagal ilgį"
        placeholder="Bendras Ilgis"
        type="number"
        @onConfirm="calculateLengthHandler"
      />
      <BaseButtonWithInput
        name="Bendras tvoros aukštis"
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
    <div class="flex flex-wrap gap-8 py-2">
      <p>
        Bendras Ilgis:
        <span class="text-primary-white">
          {{ calculationsStore.fences[props.index]?.totalLength || 0 }} m
        </span>
      </p>
      <p class="flex gap-1">
        Kvadratiniai metrai:
        <span class="text-primary-white flex">
          {{ calculationsStore.fences[props.index]?.totalQuantity || 0 }}
          m
          <span class="text-[10px] font-semibold text-primary-white">2</span>
        </span>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
