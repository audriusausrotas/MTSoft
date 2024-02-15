<script setup lang="ts">
const props = defineProps(["work", "index"]);
</script>

<template>
  <div
    class="flex border-b even:bg-gray-ultra-light font-medium gap-10 px-2 py-2"
  >
    <div class="w-6 text-center">{{ props.index + 1 }}</div>
    <div class="flex-1">{{ props.work.name }}</div>
    <div class="w-20 gap-2 flex">
      <p>
        {{ props.work.quantity }}
      </p>
      <p>
        {{ props.work.name.includes("Tvoros montavimas") ? "m2" : "vnt" }}
      </p>
    </div>
    <div class="w-20 flex gap-2">
      <p>
        {{ props.work.price }}
      </p>
      <p>€</p>
    </div>
    <div class="w-20 flex gap-2">
      <p>
        {{ props.work.totalPrice }}
      </p>
      <p>€</p>
    </div>
  </div>
</template>
<style scoped></style>
