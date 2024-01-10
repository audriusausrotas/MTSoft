<script setup lang="js">
const props = defineProps(["name", "width", "type"]);
</script>

<template>
  <button
    class="flex items-center justify-center h-10 gap-2 px-4 py-2 capitalize transition-colors rounded-lg shadow-sm"
    :class="[
      props.width ? props.width : 'w-60',
      props.type === 'special'
        ? 'text-black  hover:bg-red-full hover:text-white border border-inputBorder'
        : 'text-white bg-dark-full hover:bg-red-full hover:text-white',
    ]"
  >
    <slot />
    {{ props.name }}
  </button>
</template>
<style scoped></style>
