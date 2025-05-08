<script setup lang="ts">
const props = defineProps([
  "priceWithDiscount",
  "priceVAT",
  "totalCost",
  "totalPrice",
  "totalMargin",
  "totalProfit",
]);
</script>

<template>
  <div
    class="flex max-w-[1000px] m-auto gap-8 justify-evenly items-start bg-red-ulta-light w-full py-8 rounded-xl border border-dashed font-medium text-lg border-dark-light flex-wrap"
  >
    <div class="flex flex-col gap-4">
      <div>Kaina: {{ props.totalPrice.toFixed(2) }}</div>
      <div>Savikaina: {{ props.totalCost.toFixed(2) }}</div>
    </div>
    <div class="flex flex-col gap-4">
      <div>Pelnas: {{ props.totalProfit.toFixed(2) }}</div>
      <div>Marža: {{ props.totalMargin.toFixed(2) }} %</div>
    </div>
    <div class="flex flex-col gap-4 items">
      <div>Suma su PVM: {{ props.priceVAT.toFixed(2) }}</div>
      <div v-if="props.priceWithDiscount" class="flex gap-2 items-center">
        Suma su nuolaida:
        <div>{{ props.priceWithDiscount }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
