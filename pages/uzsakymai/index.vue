<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-4">
    <OrdersOrder
      v-for="(order, index) in useOrderStore().orders"
      :order="order"
      :key="order._id"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
