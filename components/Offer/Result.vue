<script setup lang="ts">
const props = defineProps(["result", "index", "hidePrices"]);
const measurement = ref<string>("vnt");

const isGate =
  props.result.category === "stumdomi" ||
  props.result.category === "varstomi" ||
  props.result.category === "varteliai" ||
  props.result.category === "segmentiniai";

if (props.result.name.toLowerCase().includes("apkausta")) measurement.value = "m";
else if (props.result.name.toLowerCase().includes("metras")) measurement.value = "m";
else if (props.result.category === "Tvora" && props.result.retail) measurement.value = "m2";
else if (props.result.category === "Tvora" && !props.result.retail) measurement.value = "m";
else measurement.value = "vnt";
</script>

<template>
  <div
    class="flex w-full flex-col sm:flex-row border-b-2 print:gap-6 gap-4 items-start sm:gap-10 sm:items-center font-medium print:text-xs print:border-b print:border-gray-full print:even:bg-transparent even:bg-gray-ultra-light px-8 sm:px-2 py-[10px] print:py-2 border-red-full sm:border-none"
  >
    <div class="flex">
      <p class="block sm:hidden font-bold">Nr.:</p>
      <div class="w-6 text-center">{{ props.index + 1 }}</div>
    </div>
    <div class="border sm:hidden w-full"></div>
    <div class="flex-1">
      <p class="block sm:hidden font-bold">Pavadinimas:</p>
      <div class="flex print:gap-4 gap-2 sm:gap-2 print:text-black">
        <span class="w-fit">{{ props.result.name }}</span>
        <span v-if="isGate">
          <span v-if="props.result.width < 200">
            <span v-if="props.result.category === 'varteliai'">
              <span>{{
                props.result.lock.includes("el.")
                  ? " su elektromagnetine spyna"
                  : " su paprasta spyna"
              }}</span>
              <span>
                {{
                  props.result.installation === "Taip" ? " ir montavimu" : " , be montavimo"
                }}</span
              >
            </span>
          </span>
          <span v-else>
            <span>{{ props.result.auto === "Taip" ? " su automatika" : " be automatikos" }}</span>
            <span>{{
              props.result.installation === "Taip" ? " ir montavimu" : " , be montavimo"
            }}</span>
          </span>
        </span>
        <span v-if="props.result.category === 'Tvora'">{{
          props?.result?.manufacturer === "Ukraina" ? "Eco" : "Premium"
        }}</span>
        <span v-if="props.result.category === 'Tvora'">{{ props.result.seeThrough }}</span>
        <span v-if="props.result.category === 'Tvoralentė' && props.result.height > 0"
          >H-{{ props.result.height }}</span
        >

        <span v-if="props.result.color && !props.result.name.includes('RAL')"
          >RAL {{ props.result.color }}</span
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
            {{ props.result.totalPrice.toFixed(2) }}
          </p>
          <p>€</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
