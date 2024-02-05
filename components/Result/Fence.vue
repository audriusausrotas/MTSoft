<script setup lang="ts">
// import calculateResults from '~/utils/calculateResults';
const results = useResultsStore();

const resultsExist = ref<boolean>(results.results.length > 0);
const workExist = ref<boolean>(results.works.length > 0);

// calculateResults()
</script>

<template>
  <ResultTotalElement :results="results.results" />
  <div class="flex flex-col gap-4 divide-y text-center w-fit divide-red-full">
    <h3 v-if="resultsExist" class="text-2xl font-bold m-auto">Medžiagos</h3>
    <ResultFenceElement
      v-for="(result, index) in results.results"
      :key="result.id"
      :result="result"
      :index="index"
    />
    <h3 v-if="workExist" class="text-2xl pt-4 w-full font-bold">Darbai</h3>
    <ResultFenceWorks
      v-for="(work, index) in results.works"
      :key="work.id"
      :work="work"
      :index="index"
    />
  </div>
</template>
<style scoped></style>
