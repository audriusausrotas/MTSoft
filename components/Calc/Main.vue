<script setup lang="ts">
const emit = defineEmits(["onCalculate"]);
const useCalculations = useCalculationsStore();

const createFenceHandler = () => {
  useCalculations.addFence();
};

const calculateResultsHandler = () => {
  calculateResults();
  emit("onCalculate");
};
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex flex-wrap justify-center gap-4 lg:sticky top-0 py-4 z-40 bg-white border-b"
    >
      <BaseButton name="Sukurti Tvorą" @click="createFenceHandler" />
      <BaseButton name="Skaičiuoti sąmatą" @click="calculateResultsHandler" />
    </div>

    <div v-for="(fence, index) in useCalculations.fences" :key="fence.id">
      <CalcFence :fence="fence" :index="index" />
    </div>
  </div>
</template>
<style scoped></style>
