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
  <div class="flex flex-col gap-8 py-8 rounded-lg shadow-lg border items-center">
    <div class="font-bold text-4xl text-center">{{ name }}</div>
    <div class="flex gap-4 flex-wrap">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-3 h-fit border rounded-md border-gray-500 min-w-fit">
          <div class="px-2 py-1 border-b border-r border-inherit">Skardos tipas</div>
          <div class="px-2 py-1 border-b border-inherit border-r font-bold">Premium</div>
          <div class="px-2 py-1 border-b border-inherit font-bold">Eco</div>
          <div class="px-2 py-1 border-b border-inherit border-r">Kaina be PVM</div>
          <div class="px-2 py-1 border-b border-inherit border-r">{{ pp }} €</div>
          <div class="px-2 py-1 border-b border-inherit">{{ ep }} €</div>
          <div class="px-2 py-1 border-b border-inherit border-r">Kaina su PVM</div>
          <div class="px-2 py-1 border-b border-inherit border-r">{{ ppv }} €</div>
          <div class="px-2 py-1 border-b border-inherit">{{ epv }} €</div>
          <div class="px-2 py-1 border-b border-inherit border-r flex">
            m <span class="text-[12px] items-start mr-1">2</span>kaina be PVM
          </div>
          <div class="px-2 py-1 border-b border-inherit border-r">{{ spp }} €</div>
          <div class="px-2 py-1 border-b border-inherit">{{ sep }} €</div>
          <div class="px-2 py-1 flex border-r border-inherit">
            m <span class="text-[12px] items-start mr-1">2</span>kaina su PVM
          </div>
          <div class="px-2 py-1 border-r border-inherit">{{ sppv }} €</div>
          <div class="px-2 py-1">{{ sepv }} €</div>
        </div>
        <p>Į kainą įtraukti U formos profiliai skirti tvoros montavimui</p>
        <p>cia dar galima prirasyt bendros info apie tvora</p>
      </div>

      <div class="max-w-[230px]">
        <NuxtImg
          :src="`/images/${img1}.jpg`"
          alt="Rombo tipo tvora maketas"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </div>
      <div class="max-w-[600px] max-h-[100px]">
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
</template>

<style scoped></style>
