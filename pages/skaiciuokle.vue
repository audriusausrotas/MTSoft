<script setup lang="ts">
const useCalculations = useCalculationsStore();
const router = useRouter();

const createFenceHandler = () => {
  useCalculations.addFence();
};

const calculateResultsHandler = () => {
  calculateResults();
  router.replace("/samata");
};
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="flex flex-col items-center gap-8 xl:items-start">
      <CalcClient />
      <div class="flex justify-center flex-wrap gap-4">
        <BaseButton name="Sukurti Tvorą" @click="createFenceHandler" />
        <BaseButton name="Skaičiuoti sąmatą" @click="calculateResultsHandler" />
      </div>
    </div>

    <div v-for="(fence, index) in useCalculations.fences" :key="fence.id">
      <CalcFence :fence="fence" :index="index" />
    </div>
  </div>
</template>
<style scoped></style>
