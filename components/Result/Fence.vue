<script setup lang="ts">
// import calculateResults from '~/utils/calculateResults';
const results = useResultsStore();

// calculateResults()
</script>

<template>
  <!-- <div class="overflow-hidden font-semibold capitalize bg-gray-uldiva-light"> -->
  <!-- <div>
      <div class="w-8 p-3 rounded-tl-2xl">Nr</div>
      <div class="min-w-[400px]">Pavadinimas</div>
      <div class="w-20 p-3">Spalva</div>
      <div class="w-20 p-3">Tarpas</div>
      <div class="w-20 p-3">Kiekis</div>
      <div class="w-20 p-3">Kaina</div>
      <div class="w-20 p-3">viso</div>
      <div class="w-20 p-3">Savikaina</div>
      <div class="w-20 p-3">s.viso</div>
      <div class="w-20 p-3">pelnas</div>
      <div class="w-20 p-3">marža</div>
      <div class="w-8 p-3 rounded-div-2xl"></div>
    </div> -->
  <!-- </div> -->
  <div class="flex flex-col divide-y w-fit divide-red-full">
    <ResultFenceElement v-for="(result, index) in results.results" :key="result.id" :result="result" :index="index" />
  </div>
  <ResultTotalElement :results="results.results" />
</template>
<style scoped></style>
