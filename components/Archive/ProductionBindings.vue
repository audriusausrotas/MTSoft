<script setup lang="ts">
const props = defineProps<{
  binding: any;
  index: any;
}>();
</script>

<template>
  <div class="flex even:bg-gray-ultra-light border-b h-8 border-black w-fit">
    <p class="w-10 border-x border-black text-center">
      {{ props.index + 1 }}
    </p>

    <div class="w-48 border-r border-black px-1 flex">
      {{ props.binding.name }}
    </div>

    <div class="w-16 border-r border-black px-1 flex">
      {{ props.binding.height }}
    </div>

    <div class="w-16 border-r border-black px-1 flex">
      {{ props.binding.quantity }}
    </div>

    <div class="w-16 border-r border-black px-1 flex">
      {{ props.binding.color }}
    </div>

    <div class="w-24 border-r border-black px-1 flex">
      {{ props.binding.cut }}
    </div>
    <div class="w-24 border-r border-black px-1 flex">
      {{ props.binding.done }}
    </div>
  </div>
</template>

<style scoped></style>
