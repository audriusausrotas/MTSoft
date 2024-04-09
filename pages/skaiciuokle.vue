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
  <div class="flex flex-col ">
    <div class="flex flex-wrap gap-4 lg:sticky top-0 py-4 z-50 bg-white border-b">
      <BaseButton name="Sukurti Tvorą" @click="createFenceHandler" />
      <BaseButton name="Skaičiuoti sąmatą" @click="calculateResultsHandler" />
    </div>

    <div v-for="(fence, index) in useCalculations.fences" :key="fence.id">
      <CalcFence :fence="fence" :index="index" />
    </div>
  </div>
</template>
<style scoped></style>
