<script setup lang="ts">
const useGamyba = useGamybaStore()
</script>

<template>
  <div class="flex flex-col gap-4">
    <GamybaOrder v-for="order, index in useGamyba.gamybaList" :key="order._id" :order="order" :index="index" />
  </div>
</template>
<style scoped></style>
