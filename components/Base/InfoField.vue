<script setup lang="ts">
const props = defineProps(["name", "width", "tel"]);
</script>

<template>
  <a
    v-if="props.tel"
    :href="'tel:' + props.name"
    class="flex items-center justify-center h-10 border rounded-lg shadow-sm border-dark-light bg-gray-ultra-light sele"
    :class="props.width ? props.width : 'w-20'"
    >{{ props.name }}</a
  >
  <p
    v-else
    class="flex items-center justify-center h-10 border rounded-lg shadow-sm border-dark-light bg-gray-ultra-light"
    :class="props.width ? props.width : 'w-20'"
  >
    {{ props.name }}
  </p>
</template>
<style scoped></style>
