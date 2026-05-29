<script setup lang="ts">
const results = useResultsStore();
const productsStore = useProductsStore();
const settingsStore = useSettingsStore();

const products = computed(() => {
  const parts: any = [];
  const works: any = [];

  productsStore?.products?.forEach((item) => {
    if (item.category === "Darbai") {
      works.push(item);
    } else {
      parts.push(item);
    }
  });
  return { parts: [...parts, ...settingsStore.fences, ...settingsStore.gates], works };
});
</script>

<template>
  <ResultTotalElement :results="results" />
  <div class="flex flex-col gap-4 divide-y w-full text-center divide-red-full">
    <h3 v-if="results.results.length > 0" class="text-2xl font-bold m-auto">Medžiagos</h3>
    <ResultFenceElement
      v-for="(result, index) in results.results"
      :key="result.id"
      :result="result"
      :index="index"
      :parts="products.parts"
    />
    <h3 v-if="results.works.length > 0" class="text-2xl pt-4 w-full font-bold">Darbai</h3>
    <ResultFenceWorks
      v-for="(work, index) in results.works"
      :key="work.id"
      :work="work"
      :index="index"
      :works="products.works"
    />
  </div>
</template>
<style scoped></style>
