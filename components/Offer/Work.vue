<script setup lang="ts">
const props = defineProps(["work", "index"]);
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
      <p>{{ props.work.name }}</p>
    </div>
    <div class="border sm:hidden w-full"></div>
    <div class="flex print:gap-6 gap-10">
      <div>
        <p class="block sm:hidden font-bold">Kiekis:</p>
        <div class="w-20 gap-2 flex">
          <p>
            {{ props.work.quantity }}
          </p>
          <p>
            {{
              props.work.name.includes("Tvoros montavimas")
                ? "m2"
                : props.work.name.includes("Vartų pamato betonavimas")
                ? "m"
                : "vnt"
            }}
          </p>
        </div>
      </div>

      <div>
        <p class="block sm:hidden font-bold">Kaina:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.price }}
          </p>
          <p>€</p>
        </div>
      </div>
      <div>
        <p class="block sm:hidden font-bold">Viso:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.totalPrice }}
          </p>
          <p>€</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
