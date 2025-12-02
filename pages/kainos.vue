<script setup lang="ts">
const productsStore = useProductsStore();
const searchQuery = ref<string>("");
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <div class="flex gap-4 flex-col flex-wrap">
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
      <PriceNew />
    </div>
    <div class="overflow-auto">
      <div class="overflow-hidden font-semibold capitalize bg-gray-ultra-light">
        <div class="flex items-center gap-4">
          <div class="w-8 p-3 rounded-tl-2xl">nr</div>
          <div class="min-w-[500px]">pavadinimas</div>
          <div class="w-24 p-3">savikaina</div>
          <div class="w-24 p-3">Didmena</div>
          <div class="w-24 p-3">Mažmena</div>
          <div class="w-24 p-3">Kategorija</div>
          <div class="w-8 p-3"></div>
          <div class="w-8 p-3 rounded-tr-2xl"></div>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <PriceElement
          v-for="(product, index) in productsStore.search(searchQuery)"
          :key="product._id.toString()"
          :index="index"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
