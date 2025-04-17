<script setup lang="ts">
const useProducts = useProductsStore();
const searchQuery = ref<string>("");
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <div class="flex gap-4 flex-wrap">
      <PriceNew />
      <BaseInput
        placeholder="Paieška"
        width="flex-1"
        variant="light"
        @onChange="(value: string) => searchQuery = value"
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
    <div class="overflow-auto">
      <table class="w-full">
        <thead class="overflow-hidden font-semibold capitalize bg-gray-ultra-light">
          <tr>
            <th class="w-8 p-3 rounded-tl-2xl">nr</th>
            <th class="min-w-[500px]">pavadinimas</th>
            <th class="w-24 p-3">kaina</th>
            <th class="w-24 p-3">savikaina</th>
            <th class="w-24 p-3">Kategorija</th>
            <th class="w-8 p-3"></th>
            <th class="w-8 p-3 rounded-tr-2xl"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in useProducts.search(searchQuery)" :key="product._id">
            <PriceElement :index="index" :product="product" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
