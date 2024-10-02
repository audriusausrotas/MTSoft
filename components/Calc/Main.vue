<script setup lang="ts">
const emit = defineEmits(["onCalculate"]);
const useCalculations = useCalculationsStore();

const modalOpen = ref<boolean>(false);
const textArea = ref<string>("");

const createFenceHandler = () => {
  useCalculations.addFence();
};

const calculateResultsHandler = () => {
  calculateResults();
  emit("onCalculate");
};

const confirmHandler = () => {
  useCalculations.lazerCalculate(textArea.value);
  modalOpen.value = false;
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
