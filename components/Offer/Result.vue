<script setup lang="ts">
const props = defineProps(["result", "index"]);
const measurement = ref<string>("vnt");

if (props.result.type.includes("Apkaustai")) measurement.value = "m";
else if (
  props.result.type.includes("Daimond") ||
  props.result.type.includes("Plank") ||
  props.result.type.includes("Eglė") ||
  props.result.type.includes("Žaliuzi")
)
  measurement.value = "m2";
else measurement.value = "vnt";
</script>

<template>
  <div
    class="flex border-b print:gap-6 gap-10 items-center font-medium print:text-sm even:bg-gray-ultra-light px-2 py-[10px]"
  >
    <div class="w-6 text-center">{{ props.index + 1 }}</div>
    <div class="flex-1 flex print:gap-4 gap-8">
      <span>{{ props.result.type }}</span>
      <span v-if="props.result.seeThrough">{{ props.result.seeThrough }}</span>
      <span>{{ props.result.color }}</span>
    </div>
    <div class="w-20 flex gap-2">
      <p>
        {{ props.result.quantity }}
      </p>
      <p>{{ measurement }}</p>
    </div>
    <div class="w-20 flex gap-2">
      <p>
        {{ props.result.price }}
      </p>
      <p>€</p>
    </div>
    <div class="w-20 flex gap-2">
      <p>
        {{ props.result.totalPrice }}
      </p>
      <p>€</p>
    </div>
  </div>
</template>
<style scoped></style>
