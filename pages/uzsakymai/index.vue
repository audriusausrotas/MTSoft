<script setup lang="ts"></script>

<template>
  <div>
    <OrdersMain
      v-for="(order, index) in useOrderStore().orders"
      :order="order"
      :key="order._id"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
