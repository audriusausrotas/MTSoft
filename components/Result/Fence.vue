<script setup lang="ts">
const results = useResultsStore();
</script>

<template>
  <ResultTotalElement :results="results.results" />
  <div class="flex flex-col gap-4 divide-y text-center w-fit divide-red-full">
    <h3 v-if="results.results.length > 0" class="text-2xl font-bold m-auto">
      Medžiagos
    </h3>
    <ResultFenceElement
      v-for="(result, index) in results.results"
      :key="result.id"
      :result="result"
      :index="index"
    />
    <h3 v-if="results.works.length > 0" class="text-2xl pt-4 w-full font-bold">
      Darbai
    </h3>
    <ResultFenceWorks
      v-for="(work, index) in results.works"
      :key="work.id"
      :work="work"
      :index="index"
    />
  </div>
</template>
<style scoped></style>
