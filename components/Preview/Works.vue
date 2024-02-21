<script setup lang="ts">
const props = defineProps(["data"]);
</script>

<template>
  <div v-for="(work, index) in props.data" :key="work.id" class="flex gap-4">
    <p>{{ index + 1 }}</p>
    <p>{{ work.name }}</p>
    <p>{{ work.quantity }}</p>
    <p>{{ work.price }}</p>
    <p>{{ work.cost }}</p>
    <p>{{ work.totalPrice }}</p>
    <p>{{ work.totalCost }}</p>
    <p>{{ work.profit }}</p>
    <p>{{ work.margin }} %</p>
  </div>
</template>
<style scoped></style>
