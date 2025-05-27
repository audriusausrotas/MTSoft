<script setup lang="ts">
const props = defineProps(["order", "index"]);

console.log(props.order);
</script>

<template>
  <div class="flex gap-4">
    <div>{{ index + 1 }}</div>
    <div>{{ order.orderDate }}</div>
    <div>{{ order.deliveryDate }}</div>
    <div>{{ order.client.address }}</div>
    <div>{{ order.deliveryMethod }}</div>
    <div>{{ order.user.username }}</div>
    <div></div>
  </div>
</template>

<style scoped></style>
