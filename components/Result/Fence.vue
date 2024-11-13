<script setup lang="ts">
const results = useResultsStore();
const useProducts = useProductsStore();

const parts = [];
const works = [];

useProducts?.products?.forEach((item) => {
  if (item.category === "Darbai") {
    works.push(item);
  } else {
    parts.push(item);
  }
});
</script>

<template>
  <ResultTotalElement :results="results" />
  <div class="flex flex-col gap-4 divide-y w-full text-center divide-red-full">
    <h3 v-if="results.results.length > 0" class="text-2xl font-bold m-auto">
      Medžiagos
    </h3>
    <ResultFenceElement
      v-for="(result, index) in results.results"
      :key="result.id"
      :result="result"
      :index="index"
      :parts="parts"
    />
    <h3 v-if="results.works.length > 0" class="text-2xl pt-4 w-full font-bold">
      Darbai
    </h3>
    <ResultFenceWorks
      v-for="(work, index) in results.works"
      :key="work.id"
      :work="work"
      :index="index"
      :works="works"
    />
  </div>
</template>
<style scoped></style>
