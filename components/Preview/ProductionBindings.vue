<script setup lang="ts">
const props = defineProps(["binding", "index"]);
const indexColor = computed(() => {
  return props.binding.postone
    ? "bg-red-full text-white"
    : +props.binding.cut === 0 || props.binding.cut === undefined
    ? "bg-transparent"
    : +props.binding.cut === +props.binding.quantity
    ? "bg-green-500"
    : +props.binding.cut > +props.binding.quantity
    ? "bg-red-full"
    : +props.binding.cut === +props.binding.quantity
    ? "bg-green-300"
    : "bg-orange-400";
});
</script>

<template>
  <div
    class="flex even:bg-gray-ultra-light border-b h-8 border-black max-w-96 sm:max-w-[500px] w-full justify-center"
  >
    <p class="w-6 sm:w-8 border-x border-black text-center" :class="indexColor">
      {{ props?.index + 1 }}
    </p>

    <div class="flex-1 border-r border-black px-1">
      {{ props?.binding?.type }}
    </div>

    <div class="w-12 sm:w-16 border-r border-black px-1">
      {{ props?.binding?.height }}
    </div>

    <div class="w-12 sm:w-16 border-r border-black px-1">
      {{ props?.binding?.quantity }}
    </div>

    <div class="w-12 sm:w-16 border-r border-black px-1">
      {{ props?.binding?.color }}
    </div>
  </div>
</template>
<style scoped></style>
