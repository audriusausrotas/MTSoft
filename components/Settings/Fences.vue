<script setup lang="ts">
const productsStore = useProductsStore();

const fences = productsStore.products.filter(
  (item) => item.category.trim().toLowerCase() === "tvoros"
);
</script>

<template>
  <div class="flex flex-wrap gap-20 justify-around">
    <SettingsFencesElement v-for="fence in fences" :fence="fence" />
  </div>
</template>
<style scoped></style>
