<script setup>
import { useProductsStore } from "~/store/products";
const useProducts = useProductsStore();
</script>
<template>
  <div class="flex flex-col gap-8">
    <PriceNew />
    <div class="overflow-auto">
      <table class="w-full">
        <thead
          class="overflow-hidden font-semibold capitalize bg-gray-ultra-light"
        >
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
        <tbody class="divide-y">
          <tr
            v-for="(product, index) in useProducts.products"
            :key="product._id"
          >
            <PriceElement :index="index" :product="product" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
