<script setup lang="js">
const useResults = useResultsStore();


</script>

<template>
  <div class="flex gap-8">
    <div> Viso Kaina: {{ useResults.totalPrice }}</div>
    <div>Viso Savikaina: {{ useResults.totalCost }}</div>
    <div>Viso Pelnas: {{ useResults.totalProfit }}</div>
    <div>Viso Marža: {{ useResults.totalMargin }}</div>
  </div>
</template>
<style scoped></style>
