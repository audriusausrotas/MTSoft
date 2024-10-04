<script setup lang="ts">
const useGamyba = useGamybaStore();

const readyOrders = computed(() => {
  return useGamyba.gamybaList.filter((item) => item.status === "Gaminama");
});

const waitingOrders = computed(() => {
  return useGamyba.gamybaList.filter((item) => item.status === "Laukiama");
});

const finishedOrders = computed(() => {
  return useGamyba.gamybaList.filter((item) => item.status === "Pagaminta");
});

const postonedOrders = computed(() => {
  return useGamyba.gamybaList.filter((item) => item.status === "Negaminti");
});
</script>

<template>
  <div class="flex flex-col gap-4 select-none mb-12">
    <GamybaNewOrder />
    <div
      v-if="readyOrders.length > 0"
      class="text-xl font-bold bg-green-500 rounded-lg p-2 text-center w-full"
    >
      Gaminama
    </div>
    <div v-for="(order, index) in readyOrders" :key="order._id" :data-index="index">
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="waitingOrders.length > 0"
      class="text-xl font-bold bg-orange-500 rounded-lg p-2 text-center w-full"
    >
      Laukiama
    </div>
    <div v-for="(order, index) in waitingOrders" :key="order._id" :data-index="index">
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="postonedOrders.length > 0"
      class="text-xl font-bold bg-red-600 rounded-lg p-2 text-center w-full"
    >
      Negaminti
    </div>
    <div v-for="(order, index) in postonedOrders" :key="order._id" :data-index="index">
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="finishedOrders.length > 0"
      class="text-xl font-bold bg-violet-500 rounded-lg p-2 text-center w-full"
    >
      Pagaminta
    </div>
    <div v-for="(order, index) in finishedOrders" :key="order._id" :data-index="index">
      <GamybaOrder :order="order" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
