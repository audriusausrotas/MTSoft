<script setup lang="ts">
import { yesno, gateDirection, laiptasDirection } from "~/data/selectFieldData";
const props = defineProps(["measureIndex", "index", "measure", "lastElement"]);

const useCalculations = useCalculationsStore();
const useSettings = useSettingsStore();

const isChecked = ref(props.measure.gates.exist);
const isData = !props.measure.kampas.exist && !props.measure.laiptas.exist;
const isSegment = ref<boolean>(
  useCalculations.fences[props.index].type.includes("Segmentas")
);

function toggleCheckbox(value: boolean) {
  isChecked.value = value;
  useCalculations.updateMeasureGate(props.index, value, props.measureIndex);
}

watch(
  () => useCalculations.fences[props.index].type,
  (newValue) => {
    isSegment.value = newValue.includes("Segmentas");
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col py-4 gap-2 w-[480px] border-b border-red-full">
    <div class="flex items-end flex-wrap justify-between gap-2">
      <p class="font-bold pb-2 text-xl">Nr. {{ props.measureIndex + 1 }}</p>

      <BaseInput
        v-if="isData"
        width="w-24"
        placeholder="Ilgis"
        label="ilgis"
        type="number"
        variant="light"
        :active="
          useCalculations.fences[props.index].measures.length - 1 ===
          props.measureIndex
        "
        :name="props.measure.length"
        @EnterPressed="useCalculations.addMeasure(props.index)"
        @onChange="
          (value: number): void =>
            useCalculations.updateMeasureLength(
              props.index,
              props.measureIndex,
              value
            )
        "
      />

      <BaseInput
        v-if="isData"
        width="w-24"
        placeholder="Aukštis"
        type="number"
        label="aukštis"
        variant="light"
        :name="props.measure.height"
        @EnterPressed="useCalculations.addMeasure(props.index)"
        @onChange="
          (value: number): void =>
            useCalculations.updateMeasureHeight(
              props.index,
              props.measureIndex,
              value
            )
        "
      />

      <BaseInput
        v-if="isData && !isSegment"
        width="w-24"
        :disable="!useCalculations.retail"
        label="elementai"
        :variant="useCalculations.retail ? 'light' : ''"
        :name="props.measure.elements"
        @onChange="
          (value: number): void =>
            useCalculations.updateMeasureElements(
              props.index,
              props.measureIndex,
              value
            )
        "
      />

      <BaseCheckField
        v-if="isData"
        label="Vartai"
        :name="'vartai' + index"
        @onChange="(value: boolean): void => toggleCheckbox(value)"
        :checked="isChecked"
      />

      <BaseInput
        v-if="props.measure.kampas.exist"
        width="w-24"
        :disable="true"
        name="Kampas"
        label="tipas"
      />
      <BaseInput
        v-if="props.measure.kampas.exist"
        width="w-24"
        variant="light"
        placeholder="Laipsnis"
        type="number"
        label="laipsnis"
        :name="props.measure.kampas.value"
        @onChange="
          (value: string): void =>
            useCalculations.updateMeasureKampas(
              props.index,
              value,
              props.measureIndex
            )
        "
      />
      <BaseInput
        v-if="props.measure.kampas.exist"
        width="w-32"
        variant="light"
        label="komentaras"
        placeholder="Papildoma"
        :name="props.measure.kampas.aditional"
        @onChange="
          (value: string): void =>
            useCalculations.updateMeasureKampasAditional(
              props.index,
              value,
              props.measureIndex
            )
        "
      />

      <BaseInput
        v-if="props.measure.laiptas.exist"
        width="w-24"
        :disable="true"
        name="Laiptas"
        label="tipas"
      />
      <BaseInput
        v-if="props.measure.laiptas.exist"
        variant="light"
        width="w-24"
        placeholder="Aukštis"
        type="number"
        label="aukštis"
        :name="props.measure.laiptas.value"
        @onChange="
          (value: string): void =>
            useCalculations.updateMeasureLaiptas(
              props.index,
              value,
              props.measureIndex
            )
        "
      />
      <BaseSelectField
        v-if="props.measure.laiptas.exist"
        :values="laiptasDirection"
        id="laiptasDirection"
        label="kryptis"
        :defaultValue="props.measure.laiptas.direction"
        width="w-32"
        @onChange="(value: string) => useCalculations.updateMeasureLaiptasDirection(
        props.index,
        value,
        props.measureIndex
      )
        "
      />

      <NuxtImg
        src="/icons/delete.svg"
        width="20"
        height="20"
        decoding="auto"
        class="hover:bg-red-ulta-light pb-3 rounded-xl hover:cursor-pointer"
        @click="useCalculations.deleteMeasure(props.index, props.measureIndex)"
      />
    </div>

    <div
      v-if="isChecked"
      class="flex flex-wrap justify-center md:justify-between gap-2"
    >
      <BaseSelectField
        v-if="
          props.measure.length > 200 &&
          props.measure.gates.type !== 'Segmentiniai'
        "
        :values="yesno"
        label="Automatika"
        id="automatics"
        :defaultValue="props.measure.gates.automatics"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateAutomatics(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="props.measure.length > 200"
        :values="useSettings.selectValues.gateTypes"
        id="gateTypes"
        label="vartų tipas"
        :defaultValue="props.measure.gates.type"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateGateType(props.index, value, props.measureIndex)
        "
      />
      <BaseSelectField
        v-if="
          props.measure.length > 200 && props.measure.gates.type === 'Stumdomi'
        "
        :values="yesno"
        id="bankette"
        label="vartų pamatas"
        :defaultValue="props.measure.gates.bankette"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateBankette(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="
          props.measure.length <= 200 &&
          props.measure.gates.option !== 'Segmentiniai'
        "
        :values="gateDirection"
        id="gateDirection"
        label="vartelių atidarymas"
        :defaultValue="props.measure.gates.direction"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateGateDirection(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="
          props.measure.length <= 200 &&
          props.measure.gates.option !== 'Segmentiniai'
        "
        :values="useSettings.selectValues.gateLock"
        id="gateLock"
        label="vartelių spyna"
        :defaultValue="props.measure.gates.lock"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateGateLock(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="props.measure.length <= 200"
        :values="useSettings.selectValues.gateOption"
        id="gateOption"
        label="Vartelių tipas"
        :defaultValue="props.measure.gates.option"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateGateOption(props.index, value, props.measureIndex)
        "
      />
    </div>
    <BaseInput
      v-if="isChecked"
      placeholder="Papidoma informacija"
      variant="light"
      width="w-full"
      :name="props.measure.gates.aditional"
      @onChange="(value: string) =>
        useCalculations.updateGateAditional(props.index, value, props.measureIndex
        )
        "
    />
  </div>
</template>
<style scoped></style>
