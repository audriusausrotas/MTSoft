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
        @onChange="(value: string) => (searchQuery = value)"
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
    <div class="flex flex-col gap-2">
      <div
        class="grid grid-cols-[40px_auto_150px_150px_150px_200px_100px] gap-4 overflow-hidden font-semibold capitalize py-2 rounded-t-2xl bg-gray-ultra-light"
      >
        <div class="text-center">nr</div>
        <div class="pl-2">pavadinimas</div>
        <div class="pl-2">savikaina</div>
        <div class="pl-2">Didmena</div>
        <div class="pl-2">Mažmena</div>
        <div class="pl-2">Kategorija</div>
        <div class="pl-2">Veiksmai</div>
      </div>

      <PriceElement
        v-for="(product, index) in productsStore.search(searchQuery)"
        :key="product._id.toString()"
        :index="index"
        :product="product"
      />
    </div>
  </div>
</template>
