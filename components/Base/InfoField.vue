<script setup lang="ts">
const props = defineProps(["name", "width", "tel", "email", "disabled"]);
</script>

<template>
  <a
    v-if="props.tel"
    :href="'tel:' + props.name"
    class="flex items-center justify-center h-10 border px-2 rounded-lg shadow-sm border-dark-light bg-gray-ultra-light overflow-hidden"
    :class="props.width ? props.width : 'w-20'"
    >{{ props.name }}</a
  >

  <a
    v-else-if="props.email"
    :href="'mailto:' + props.name"
    class="flex items-center justify-center h-10 border px-2 overflow-hidden rounded-lg shadow-sm border-dark-light bg-gray-ultra-light"
    :class="props.width ? props.width : 'w-20'"
    >{{ props.name }}</a
  >

  <p
    v-else
    class="flex items-center justify-center h-10 px-2 border rounded-lg shadow-sm border-dark-light bg-gray-ultra-light overflow-hidden"
    :class="props.width ? props.width : 'w-20'"
  >
    {{ props.name }}
  </p>
</template>
<style scoped></style>
