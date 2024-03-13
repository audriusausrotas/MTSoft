<script setup lang="ts">
const props = defineProps(["result", "index", "hidePrices"]);
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
    class="flex flex-col sm:flex-row border-b-2 print:gap-6 gap-4 items-start sm:gap-10 sm:items-center font-medium print:text-xs print:border-b print:border-gray-full print:even:bg-transparent even:bg-gray-ultra-light px-8 sm:px-2 py-[10px] print:py-2 border-red-full sm:border-none"
  >
    <div class="flex">
      <p class="block sm:hidden font-bold">Nr.:</p>
      <div class="w-6 text-center">{{ props.index + 1 }}</div>
    </div>
    <div class="border sm:hidden w-full"></div>
    <div class="flex-1">
      <p class="block sm:hidden font-bold">Pavadinimas:</p>
      <div class="flex print:gap-4 gap-2 md:gap-8">
        <span class="w-fit">{{ props.result.type }}</span>
        <span v-if="props.result.seeThrough">{{
          props.result.seeThrough
        }}</span>
        <span
          v-if="
            props.result.height &&
            props.result.category.toLowerCase() === 'tvoros' &&
            !props.result.type.includes('Segmentas')
          "
          >H-{{ props.result.height }}</span
        >
        <span v-if="props.result.color && !props.result.type.includes('RAL')"
          >RAL{{ props.result.color }}</span
        >
        <span v-if="props.result.category.toLowerCase() === 'vartai'"
          >plotis: {{ props.result.width }} cm
        </span>
      </div>
    </div>
    <div class="border sm:hidden w-full"></div>
    <div class="flex print:gap-6 gap-10">
      <div>
        <p class="block sm:hidden font-bold">Kiekis:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.result.quantity }}
          </p>
          <p>{{ measurement }}</p>
        </div>
      </div>
      <div v-if="!props.hidePrices">
        <p class="block sm:hidden font-bold">Kaina:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.result.price }}
          </p>
          <p>€</p>
        </div>
      </div>
      <div v-if="!props.hidePrices">
        <p class="block sm:hidden font-bold">Viso:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.result.totalPrice }}
          </p>
          <p>€</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
