<script setup lang="ts">
const useGamyba = useGamybaStore();

const readyOrders = computed(() => {
  return useGamyba.filteredGamybaList.filter(
    (item) => item.status === "Gaminama"
  );
});

const waitingOrders = computed(() => {
  return useGamyba.filteredGamybaList.filter(
    (item) => item.status === "Laukiama"
  );
});

const finishedOrders = computed(() => {
  return useGamyba.filteredGamybaList.filter(
    (item) => item.status === "Pagaminta"
  );
});

const postonedOrders = computed(() => {
  return useGamyba.filteredGamybaList.filter(
    (item) => item.status === "Negaminti"
  );
});
</script>

<template>
  <div class="flex flex-col gap-4 select-none mb-12 w-full max-w-[690px]">
    <div class="flex gap-4 flex-wrap">
      <GamybaNewOrder />
      <BaseInput
        placeholder="Paieška"
        width="flex-1"
        variant="light"
        @onChange="(value: string): void => useGamyba.searchGamyba(value)"
      >
        <NuxtImg
          src="/icons/search.svg"
          width="14"
          height="14"
          alt="search icon"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </BaseInput>
    </div>
    <div
      v-if="readyOrders.length > 0"
      class="text-xl font-bold bg-green-500 rounded-lg p-2 text-center w-full"
    >
      Gaminama
    </div>
    <div
      v-for="(order, index) in readyOrders"
      :key="order._id"
      :data-index="index"
    >
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="waitingOrders.length > 0"
      class="text-xl font-bold bg-orange-500 rounded-lg p-2 text-center w-full"
    >
      Laukiama
    </div>
    <div
      v-for="(order, index) in waitingOrders"
      :key="order._id"
      :data-index="index"
    >
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="postonedOrders.length > 0"
      class="text-xl font-bold bg-red-600 rounded-lg p-2 text-center w-full"
    >
      Negaminti
    </div>
    <div
      v-for="(order, index) in postonedOrders"
      :key="order._id"
      :data-index="index"
    >
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="finishedOrders.length > 0"
      class="text-xl font-bold bg-violet-500 rounded-lg p-2 text-center w-full"
    >
      Pagaminta
    </div>
    <div
      v-for="(order, index) in finishedOrders"
      :key="order._id"
      :data-index="index"
    >
      <GamybaOrder :order="order" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
