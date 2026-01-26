<script setup lang="ts">
import { yesno, gateDirection, laiptasDirection } from "~/data/selectFieldData";
const props = defineProps(["measureIndex", "index", "measure", "lastElement"]);

const calculationsStore = useCalculationsStore();
const settingsStore = useSettingsStore();

const isChecked = ref(props.measure.gates.exist);
const isData = !props.measure.kampas.exist && !props.measure.laiptas.exist;

const isSegment = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === calculationsStore.fences[props.index].name)
      ?.category === "Segmentas",
);

const toggleCheckbox = (value: boolean) => {
  isChecked.value = value;
  calculationsStore.updateMeasureGate(props.index, value, props.measureIndex);
};
</script>

<template>
  <div class="flex flex-col gap-4 w-[500px] border rounded-lg p-4 shadow-md border-gray-300">
    <div class="flex items-end gap-4 max-w-[500px] relative group">
      <BaseInput
        :name="props.measureIndex + 1"
        label="Nr"
        width="w-40"
        class="font-medium"
        disable="true"
      />

      <BaseInput
        v-if="isData"
        width=""
        placeholder="Ilgis"
        label="ilgis"
        type="number"
        variant="light"
        :active="calculationsStore.fences[props.index].measures.length - 1 === props.measureIndex"
        :name="props.measure.length"
        @EnterPressed="calculationsStore.addMeasure(props.index)"
        @onChange="
          (value: number): void =>
            calculationsStore.updateMeasureLength(props.index, props.measureIndex, value)
        "
      />

      <BaseInput
        v-if="isData"
        width=""
        placeholder="Aukštis"
        type="number"
        label="aukštis"
        :variant="'light'"
        :name="props.measure.height"
        @EnterPressed="calculationsStore.addMeasure(props.index)"
        @onChange="
          (value: number): void =>
            calculationsStore.updateMeasureHeight(props.index, props.measureIndex, value)
        "
      />

      <BaseInput
        v-if="isData"
        width=""
        :disable="calculationsStore.retail || isSegment"
        label="elementai"
        :variant="isSegment ? '' : !calculationsStore.retail ? 'light' : ''"
        :name="isSegment ? Math.ceil(props.measure.length / 255) : props.measure.elements"
        @onChange="
          (value: number): void =>
            calculationsStore.updateMeasureElements(props.index, props.measureIndex, value)
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
        disable="true"
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
            calculationsStore.updateMeasureKampas(props.index, value, props.measureIndex)
        "
      />
      <BaseInput
        v-if="props.measure.kampas.exist"
        width="w-32"
        variant="light"
        label="komentaras"
        placeholder="Papildoma"
        :name="props.measure.kampas.comment"
        @onChange="
          (value: string): void =>
            calculationsStore.updateMeasureKampasComment(props.index, value, props.measureIndex)
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
            calculationsStore.updateMeasureLaiptas(props.index, value, props.measureIndex)
        "
      />
      <BaseSelectField
        v-if="props.measure.laiptas.exist"
        :values="laiptasDirection"
        id="laiptasDirection"
        label="kryptis"
        :defaultValue="props.measure.laiptas.direction"
        width="w-32"
        @onChange="
          (value: string) =>
            calculationsStore.updateMeasureLaiptasDirection(props.index, value, props.measureIndex)
        "
      />

      <NuxtImg
        src="/icons/delete.svg"
        width="20"
        height="20"
        decoding="auto"
        class="hover:scale-125 transition-transform hover:cursor-pointer absolute top-0 left-8 group-hover:flex hidden"
        @click="calculationsStore.deleteMeasure(props.index, props.measureIndex)"
      />
    </div>

    <div v-if="isChecked" class="flex flex-wrap justify-center md:justify-between gap-2">
      <BaseSelectField
        :values="yesno"
        id="gateInstallation"
        label="Montavimas"
        :defaultValue="props.measure.gates.installation"
        width="w-36"
        @onChange="
          (value: string) =>
            calculationsStore.updateInstallation(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="props.measure.length > 200 && props.measure.gates.option !== 'Segmentiniai'"
        :values="yesno"
        label="Automatika"
        id="automatics"
        :defaultValue="props.measure.gates.automatics"
        width="w-36"
        @onChange="
          (value: string) =>
            calculationsStore.updateAutomatics(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="props.measure.length <= 200 && props.measure.gates.option !== 'Segmentiniai'"
        :values="settingsStore.selectValues.gateLock"
        id="gateLock"
        label="vartelių spyna"
        :defaultValue="props.measure.gates.lock"
        width="w-36"
        @onChange="
          (value: string) =>
            calculationsStore.updateGateLock(props.index, value, props.measureIndex)
        "
      />

      <BaseSelectField
        v-if="props.measure.length > 200"
        :values="settingsStore.selectValues.gateTypes"
        id="gateTypes"
        label="vartų tipas"
        :defaultValue="props.measure.gates.option"
        width="w-36"
        @onChange="
          (value: string) =>
            calculationsStore.updateGateOption(props.index, value, props.measureIndex)
        "
      />
      <BaseSelectField
        v-else
        :values="settingsStore.selectValues.gateOption"
        id="gateOption"
        label="Vartelių tipas"
        :defaultValue="props.measure.gates.option"
        width="w-36"
        @onChange="
          (value: string) =>
            calculationsStore.updateGateOption(props.index, value, props.measureIndex)
        "
      />
    </div>

    <div v-if="isChecked" class="flex gap-4">
      <BaseSelectField
        v-if="props.measure.length > 200 && props.measure.gates.option === 'Stumdomi'"
        :values="yesno"
        id="bankette"
        label="vartų pamatas"
        :defaultValue="props.measure.gates.bankette"
        width="w-36"
        @onChange="
          (value: string) =>
            calculationsStore.updateBankette(props.index, value, props.measureIndex)
        "
      />

      <BaseInput
        placeholder="Papidoma informacija"
        variant="light"
        width="w-full"
        label="Komentaras"
        :name="props.measure.gates.comment"
        @onChange="
          (value: string) =>
            calculationsStore.updateGateComment(props.index, value, props.measureIndex)
        "
      />
    </div>
  </div>
</template>
<style scoped></style>
