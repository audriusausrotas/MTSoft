<script setup lang="ts">
const props = defineProps(["name", "width", "type", "isLoading"]);
</script>

<template>
  <button
    class="flex items-center justify-center h-10 gap-2 px-4 py-2 capitalize transition-colors rounded-lg shadow-sm"
    :class="[
      props.width ? props.width : 'w-60',
      props.type === 'special'
        ? 'text-black  hover:bg-red-full hover:text-white border border-inputBorder'
        : 'text-white bg-dark-full hover:bg-red-full hover:text-white',
    ]">
    <slot />
    <span v-if="!props.isLoading">
      {{ props.name }}
    </span>
    <span v-else :class="props.isLoading ? 'animate-spin' : ''"
      class="border-4 border-b-red-full h-8 w-8 rounded-full"></span>
  </button>
</template>
<style scoped></style>
