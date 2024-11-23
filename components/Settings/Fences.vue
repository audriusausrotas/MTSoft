<script setup lang="ts">
const useProducts = useProductsStore();

const fences = useProducts.products.filter(
  (item) => item.category.trim().toLowerCase() === "tvoros"
);
</script>

<template>
  <div class="flex flex-wrap gap-20 justify-around">
    <SettingsFencesElement v-for="fence in fences" :fence="fence" />
  </div>
</template>
<style scoped></style>
