<script setup lang="ts">
// import calculateResults from '~/utils/calculateResults';
const results = useResultsStore();

// calculateResults()
</script>

<template>
  <ResultTotalElement :results="results.results" />
  <div class="flex flex-col gap-4 divide-y w-fit divide-red-full">
    <h3 class="text-2xl font-bold m-auto">Medžiagos</h3>
    <ResultFenceElement
      v-for="(result, index) in results.results"
      :key="result.id"
      :result="result"
      :index="index"
    />
    <h3 class="text-2xl font-bold m-auto">Darbai</h3>
    <ResultFenceWorks
      v-for="(work, index) in results.works"
      :key="work.id"
      :work="work"
      :index="index"
    />
  </div>
</template>
<style scoped></style>
