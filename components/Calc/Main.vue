<script setup lang="ts">
const emit = defineEmits(["onCalculate"]);
const useCalculations = useCalculationsStore();

const modalOpen = ref<boolean>(false);
const textArea = ref<string>("");
const units = ref<string>("Metrai");
const precision = ref<string>("Žemyn");
const unitValues = ["Metrai", "Centimetrai", "Milimetrai"];
const precisionValues = ["Žemyn", "Standartas", "Andriaus"];

const createFenceHandler = () => {
  useCalculations.addFence();
};

const calculateResultsHandler = () => {
  calculateResults();
  emit("onCalculate");
};

const confirmHandler = () => {
  useCalculations.lazerCalculate(textArea.value, units.value, precision.value);
  modalOpen.value = false;
};
</script>

<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-wrap justify-center gap-4 lg:sticky top-0 py-4 z-40 bg-white border-b">
      <BaseButton name="Sukurti Tvorą" @click="createFenceHandler" />
      <BaseButton name="Iš lazerio" @click="modalOpen = true" />
      <BaseModal
        v-if="modalOpen"
        @onClose="modalOpen = false"
        @onConfirm="confirmHandler"
        title="Automatinis BOSH lazelio skaičiuotuvas"
        width="w-fit"
      >
        <div class="flex gap-4 items-center">
          <BaseSelectField
            label="Pasirinkite matą"
            :values="unitValues"
            :defaultValue="units"
            @onChange="(value) => (units = value)"
          />

          <BaseSelectField
            label="Pasirinkite apvalinimą"
            :values="precisionValues"
            :defaultValue="precision"
            @onChange="(value) => (precision = value)"
          />
        </div>
        <textarea
          v-model="textArea"
          name="auto"
          id="auto"
          class="border border-dark-light w-full h-96 p-2 rounded-md"
        />
      </BaseModal>
      <BaseButton name="Skaičiuoti sąmatą" @click="calculateResultsHandler" />
    </div>

    <div v-for="(fence, index) in useCalculations.fences" :key="fence.id">
      <CalcFence :fence="fence" :index="index" />
    </div>
  </div>
</template>
<style scoped></style>
