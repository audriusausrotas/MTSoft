<script setup lang="ts">
import { laserInstructions } from "~/data/laserInstruction";
import calculateResults from "~/utils/calculations/calculateResults";
const emit = defineEmits(["onCalculate"]);
const calculationsStore = useCalculationsStore();

const modalOpen = ref<boolean>(false);
const textArea = ref<string>("");
const units = ref<string>("Metrai");
const precision = ref<string>("Žemyn");
const unitValues = ["Metrai", "Centimetrai", "Milimetrai"];
const precisionValues = ["Žemyn", "Standartas", "Andriaus"];
const instructionOpen = ref<boolean>(false);

const createFenceHandler = () => {
  calculationsStore.addFence();
};

const calculateResultsHandler = () => {
  calculateResults();
  emit("onCalculate");
};

const confirmHandler = () => {
  calculationsStore.lazerCalculate(
    textArea.value,
    units.value,
    precision.value
  );
  modalOpen.value = false;
};

const retailHandler = (value: string) => {
  calculationsStore.updateRetail(value === "Mažmena");
};

const unitHandler = (value: string) => {
  calculationsStore.updateUnits(value === "Kvadratinis metras");
};
</script>

<template>
  <div class="flex w-full flex-col">
    <div
      class="flex flex-wrap justify-center gap-4 lg:sticky top-0 py-4 z-40 bg-white border-b"
    >
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
          <div
            @mouseenter="instructionOpen = true"
            @mouseleave="instructionOpen = false"
            class="relative hover:cursor-pointer"
          >
            <NuxtImg
              src="/icons/info.svg"
              alt="information"
              width="20"
              height="20"
              decoding="auto"
              loading="lazy"
              :ismap="true"
              class="mt-5"
            />
            <div
              v-if="instructionOpen"
              class="absolute top-10 right-0 bg-white border rounded-md border-dark-light h-[500px] overflow-auto md:block hidden"
            >
              <div
                class="flex gap-4 divide-x-2 border-b-2 border-dark-full divide-dark-full font-semibold"
              >
                <div class="w-40 p-4">Pavadinimas</div>
                <div class="w-40 p-4">Komanda</div>
                <div class="w-48 p-4">Pavyzdys</div>
                <div class="w-80 p-4">Paaiškinimas</div>
              </div>
              <div
                v-for="instruction in laserInstructions"
                class="flex gap-4 divide-x border-b border-dark-full divide-dark-full"
              >
                <div class="w-40 p-4">{{ instruction.name }}</div>
                <div class="w-40 p-4">{{ instruction.command }}</div>
                <div class="w-48 p-4">{{ instruction.example }}</div>
                <div class="w-80 p-4">{{ instruction.comment }}</div>
              </div>
            </div>
          </div>
        </div>
        <textarea
          v-model="textArea"
          name="auto"
          id="auto"
          class="border border-dark-light w-full h-96 p-2 rounded-md"
        />
      </BaseModal>
      <BaseButton name="skaičiuoti sąmatą" @click="calculateResultsHandler" />
      <BaseSelectField
        :values="['Didmena', 'Mažmena']"
        id="parts"
        :defaultValue="calculationsStore.retail ? 'Mažmena' : 'Didmena'"
        width="w-48"
        :name="calculationsStore.retail ? 'Mažmena' : 'Didmena'"
        @onChange="retailHandler"
      />
      <BaseSelectField
        :values="['Kvadratinis metras', 'Metras']"
        id="units"
        :defaultValue="units ? 'Kvadratinis metras' : 'Metras'"
        width="w-60"
        @onChange="unitHandler"
      />
    </div>

    <div v-for="(fence, index) in calculationsStore.fences" :key="fence.id">
      <CalcFence :fence="fence" :index="index" />
    </div>
  </div>
</template>
<style scoped></style>
