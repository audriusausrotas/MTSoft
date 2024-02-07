<script setup lang="ts">
import {
  twoSided,
  gateTypes,
  gateLock,
  gateDirection,
} from "~/data/selectFieldData";
const props = defineProps(["measureIndex", "index", "measure"]);
const useCalculations = useCalculationsStore();

const isChecked = ref(props.measure.gates.exist);
const isData = !props.measure.kampas.exist && !props.measure.laiptas.exist;

function toggleCheckbox(value: boolean) {
  isChecked.value = value;
  useCalculations.updateMeasureGate(props.index, value, props.measureIndex);
}
</script>

<template>
  <div class="flex items-center gap-2">
    <p class="">{{ props.measureIndex + 1 }}</p>

    <BaseInput
      v-if="isData"
      width="w-24"
      placeholder="Ilgis"
      type="number"
      variant="light"
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
      :active="true"
    />

    <BaseInput
      v-if="isData"
      width="w-24"
      placeholder="Aukštis"
      type="number"
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
      v-if="isData"
      width="w-24"
      :disable="true"
      :name="props.measure.elements"
    />

    <BaseCheckField
      v-if="isData"
      @onChange="(value: boolean): void => toggleCheckbox(value)"
      :checked="isChecked"
    />

    <p v-if="props.measure.kampas.exist">Kampas</p>
    <BaseInput
      v-if="props.measure.kampas.exist"
      width="w-24"
      variant="light"
      placeholder="Laipsnis"
      type="number"
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

    <p v-if="props.measure.laiptas.exist">Laiptas</p>
    <BaseInput
      v-if="props.measure.laiptas.exist"
      variant="light"
      width="w-24"
      placeholder="Aukštis"
      type="number"
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

    <NuxtImg
      src="/icons/delete.svg"
      width="20"
      height="20"
      decoding="auto"
      @click="useCalculations.deleteMeasure(props.index, props.measureIndex)"
    />

    <div v-if="isChecked" class="flex gap-2">
      <BaseSelectField
        v-if="props.measure.length > 200"
        :values="twoSided"
        id="automatics"
        :defaultValue="props.measure.gates.automatics"
        width="w-24"
        @onChange="(value: string) => useCalculations.updateAutomatics(props.index, value, props.measureIndex  )
        "
      />

      <BaseSelectField
        v-if="props.measure.length > 200"
        :values="gateTypes"
        id="gateTypes"
        :defaultValue="props.measure.gates.type"
        width="w-32"
        @onChange="(value: string) => useCalculations.updateGateType(props.index, value,props.measureIndex  )
        "
      />

      <BaseSelectField
        v-if="props.measure.length <= 200"
        :values="gateDirection"
        id="gateDirection"
        :defaultValue="props.measure.gates.direction"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateGateDirection(props.index, value,props.measureIndex  )
        "
      />

      <BaseSelectField
        v-if="props.measure.length <= 200"
        :values="gateLock"
        id="gateLock"
        :defaultValue="props.measure.gates.lock"
        width="w-40"
        @onChange="(value: string) => useCalculations.updateGateLock(props.index, value,props.measureIndex  )
        "
      />
      <BaseInput
        placeholder="Papidoma informacija"
        variant="light"
        width="w-full"
        :name="props.measure.gates.aditional"
        @onChange="(value: string) =>
        useCalculations.updateGateAditional(props.index, value,props.measureIndex
        )
        "
      />
    </div>
  </div>
</template>
<style scoped></style>
