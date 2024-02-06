<script setup lang="ts">
const useResults = useResultsStore();
useResults.calculateTotals();
</script>

<template>
  <div class="flex gap-8">
    <div>Kaina: {{ useResults.totalPrice }}</div>
    <div>Savikaina: {{ useResults.totalCost }}</div>
    <div>Pelnas: {{ useResults.totalProfit }}</div>
    <div>Marža: {{ useResults.totalMargin }} %</div>
    <div>Suma suPVM: {{ useResults.priceVAT }}</div>
  </div>

  <div v-if="useResults.priceWithDiscount > 0">
    Kaina su nuolaida: {{ useResults.priceWithDiscount }}
  </div>
</template>
<style scoped></style>
