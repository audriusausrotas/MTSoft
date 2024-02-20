<script setup lang="ts">
const useResults = useResultsStore();
useResults.calculateTotals();
</script>

<template>
  <div class="flex gap-8 items-center">
    <div>Kaina: {{ useResults.totalPrice }}</div>
    <div>Savikaina: {{ useResults.totalCost }}</div>
    <div>Pelnas: {{ useResults.totalProfit }}</div>
    <div>Marža: {{ useResults.totalMargin }} %</div>
    <div>Suma suPVM: {{ useResults.priceVAT }}</div>
    <div v-if="useResults.discount" class="flex gap-2 items-center">
      Suma su nuolaida:
      <BaseInput
        :name="useResults.priceWithDiscount"
        width="w-24"
        variant="light"
        type="number"
        @onChange="(value: number) => useResults.updateDiscount(value)"
      />
    </div>
  </div>
</template>
<style scoped></style>
