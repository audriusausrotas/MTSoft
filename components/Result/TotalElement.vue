<script setup lang="ts">
const props = defineProps(["results"]);
const useResults = useResultsStore();

useResults.calculateTotals();

if (!useResults.priceWithDiscount) useResults.calculatePriceWithDiscount();
</script>

<template>
  <div
    class="flex gap-20 items-start bg-red-ulta-light w-full justify-center p-8 rounded-xl border border-dashed font-medium text-lg border-dark-light"
  >
    <div class="flex flex-col gap-4">
      <div>Kaina: {{ props.results?.totalPrice }}</div>
      <div>Savikaina: {{ props.results?.totalCost }}</div>
    </div>
    <div class="flex flex-col gap-4">
      <div>Pelnas: {{ props.results?.totalProfit }}</div>
      <div>Marža: {{ props.results?.totalMargin }} %</div>
    </div>
    <div class="flex flex-col gap-4 items">
      <div>Suma su PVM: {{ props.results?.priceVAT }}</div>
      <div v-if="props.results?.discount" class="flex gap-2 items-center">
        Suma su nuolaida:
        <input
          type="number"
          class="bg-transparent w-24 px-2"
          :value="props.results?.priceWithDiscount"
          @change="(event: Event) => useResults.updateDiscount(+(event.target as HTMLInputElement)?.value)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
