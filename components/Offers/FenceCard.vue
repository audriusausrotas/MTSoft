<script setup lang="ts">
const props = defineProps([
  "pp",
  "ppv",
  "ep",
  "epv",
  "spp",
  "sppv",
  "sep",
  "sepv",
  "img1",
  "img2",
  "name",
]);
</script>

<template>
  <div
    class="flex flex-col gap-8 p-8 rounded-lg shadow-lg border border-gray-300 items-center"
  >
    <div class="flex gap-4 flex-wrap justify-between w-full">
      <div class="flex flex-col gap-1 flex-1 max-w-[430px]">
        <div class="text-center font-bold text-xl">
          {{ name }} - Nepramatoma
        </div>
        <div
          class="grid grid-cols-3 h-fit border-[3px] rounded-md border-gray-500"
        >
          <div
            class="px-2 py-1 border-b-[3px] border-r border-inherit font-bold"
          >
            Skardos tipas
          </div>
          <div
            class="px-2 py-1 border-b-[3px] border-inherit border-r font-bold"
          >
            Premium
          </div>
          <div class="px-2 py-1 border-b-[3px] border-inherit font-bold">
            Eco
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            Kaina be PVM
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            {{ pp }} €/m
          </div>
          <div class="px-2 py-1 border-b border-inherit">{{ ep }} €/m</div>
          <div class="px-2 py-1 border-b-[3px] border-inherit border-r flex">
            Kaina be PVM
          </div>
          <div class="px-2 py-1 border-b-[3px] border-inherit border-r flex">
            {{ spp }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
          <div class="px-2 py-1 border-b-[3px] border-inherit flex">
            {{ sep }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            Kaina su PVM
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            {{ ppv }} €/m
          </div>
          <div class="px-2 py-1 border-b border-inherit">{{ epv }} €/m</div>
          <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
          <div class="px-2 py-1 border-r border-inherit flex">
            {{ sppv }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
          <div class="px-2 py-1 flex">
            {{ sepv }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
        </div>

        <div class="text-center font-bold text-xl mt-2">
          {{ name }} - Vidutinis pramatomumas
        </div>
        <div
          class="grid grid-cols-3 h-fit border-[3px] rounded-md border-gray-500 min-w-fit"
        >
          <div
            class="px-2 py-1 border-b-[3px] border-r border-inherit font-semibold"
          >
            Skardos tipas
          </div>
          <div
            class="px-2 py-1 border-b-[3px] border-inherit border-r font-semibold"
          >
            Premium
          </div>
          <div class="px-2 py-1 border-b-[3px] border-inherit font-semibold">
            Eco
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            Kaina be PVM
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            {{ pp }} €/m
          </div>
          <div class="px-2 py-1 border-b border-inherit">{{ ep }} €/m</div>
          <div class="px-2 py-1 border-b-[3px] border-inherit border-r flex">
            Kaina be PVM
          </div>
          <div class="px-2 py-1 border-b-[3px] border-inherit border-r flex">
            {{ spp }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
          <div class="px-2 py-1 border-b-[3px] border-inherit flex">
            {{ sep }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            Kaina su PVM
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">
            {{ ppv }} €/m
          </div>
          <div class="px-2 py-1 border-b border-inherit">{{ epv }} €/m</div>
          <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
          <div class="px-2 py-1 border-r border-inherit flex">
            {{ sppv }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
          <div class="px-2 py-1 flex">
            {{ sepv }} €/m <span class="text-[12px] items-start mr-1">2</span>
          </div>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="h-[400px]">
          <NuxtImg
            :src="`/images/${img1}.jpg`"
            alt="Rombo tipo tvora maketas"
            decoding="auto"
            loading="lazy"
            :ismap="true"
            class="h-full w-auto object-cover"
          />
        </div>
        <div class="max-w-[600px] h-[400px]">
          <NuxtImg
            :src="`/images/${img2}.jpg`"
            alt="Rombo tipo tvora"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
