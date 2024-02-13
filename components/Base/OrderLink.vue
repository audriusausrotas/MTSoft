<script setup lang="ts">
const props = defineProps(["id", "name"]);
</script>

<template>
  <NuxtLink
    :to="'/pasiulymas/' + props.id"
    class="hover:text-white py-3 w-48 rounded-lg capitalize text-center hover:bg-red-full hover:cursor-pointer font-medium"
  >
    {{ props.name }}
  </NuxtLink>
</template>
<style scoped></style>
