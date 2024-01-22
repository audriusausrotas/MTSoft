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

function toggleCheckbox(value: boolean) {
  isChecked.value = value;
  useCalculations.updateMeasureGate({
    index: props.index,
    value,
    measureIndex: props.measureIndex,
  });
}
</script>

<template>
  <div class="flex items-center gap-2">
    <p class="">{{ props.measureIndex + 1 }}</p>

    <BaseInput
      v-if="!props.measure.kampas.exist && !props.measure.laiptas.exist"
      width="w-24"
      placeholder="Ilgis"
      type="number"
      variant="light"
      :name="props.measure.length"
      @EnterPressed="useCalculations.addMeasure(props.index)"
      @onChange="
        (value: number): void =>
          useCalculations.updateMeasureLength({
            index: props.index,
            value,
            measureIndex: props.measureIndex,
          })
      "
      :active="true"
    />

    <BaseInput
      v-if="!props.measure.kampas.exist && !props.measure.laiptas.exist"
      width="w-24"
      placeholder="Aukštis"
      type="number"
      variant="light"
      :name="props.measure.height"
      @EnterPressed="useCalculations.addMeasure(props.index)"
      @onChange="
        (value: number): void =>
          useCalculations.updateMeasureHeight({
            index: props.index,
            value,
            measureIndex: props.measureIndex,
          })
      "
    />

    <BaseCheckField
      v-if="!props.measure.kampas.exist && !props.measure.laiptas.exist"
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
          useCalculations.updateMeasureKampas({
            index: props.index,
            value,
            measureIndex: props.measureIndex,
          })
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
          useCalculations.updateMeasureLaiptas({
            index: props.index,
            value,
            measureIndex: props.measureIndex,
          })
      "
    />

    <NuxtImg
      src="/icons/delete.svg"
      width="20"
      height="20"
      decoding="auto"
      @click="
        useCalculations.deleteMeasure({
          index: props.index,
          measureIndex: props.measureIndex,
        })
      "
    />

    <div v-if="isChecked" class="flex gap-2">
      <BaseSelectField
        v-if="props.measure.length > 200"
        :values="twoSided"
        id="automatics"
        :defaultValue="props.measure.gates.automatics"
        width="w-24"
        @onChange="(value: string) => useCalculations.updateAutomatics({ index: props.index, value,measureIndex: props.measureIndex  })
        "
      />

      <BaseSelectField
        v-if="props.measure.length > 200"
        :values="gateTypes"
        id="gateTypes"
        :defaultValue="props.measure.gates.type"
        width="w-32"
        @onChange="(value: string) => useCalculations.updateGateType({ index: props.index, value,measureIndex: props.measureIndex  })
        "
      />

      <BaseSelectField
        v-if="props.measure.length <= 200"
        :values="gateDirection"
        id="gateDirection"
        :defaultValue="props.measure.gates.direction"
        width="w-36"
        @onChange="(value: string) => useCalculations.updateGateDirection({ index: props.index, value,measureIndex: props.measureIndex  })
        "
      />

      <BaseSelectField
        v-if="props.measure.length <= 200"
        :values="gateLock"
        id="gateLock"
        :defaultValue="props.measure.gates.lock"
        width="w-40"
        @onChange="(value: string) => useCalculations.updateGateLock({ index: props.index, value,measureIndex: props.measureIndex  })
        "
      />
      <BaseInput
        placeholder="Papidoma informacija"
        type="number"
        variant="light"
        width="w-full"
        :name="props.measure.gates.aditional"
        @onChange="(value: string) =>
        useCalculations.updateGateAditional({
          index: props.index, value,measureIndex: props.measureIndex
        })
        "
      />
    </div>
  </div>
</template>
<style scoped></style>
