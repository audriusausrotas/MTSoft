<script setup lang="ts">
const props = defineProps(["blind", "retail"]);
</script>

<template>
  <OffersBoxWrap>
    <div class="print:break-after-page">
      <div class="font-bold text-2xl text-center mb-4">
        {{ props.blind.name }}
      </div>
      <div
        class="flex flex-wrap 2xl:justify-between justify-center gap-4 2xl:gap-0 w-full"
      >
        <div class="flex flex-col gap-2 w-[400px] justify-evenly">
          <div class="flex flex-col">
            <div class="text-center font-bold text-lg">
              {{ props.blind.name }} metro kaina
            </div>
            <div
              class="grid grid-cols-[1fr_1fr] border-2 rounded-md border-black"
            >
              <div
                class="px-2 py-1 border-b-2 border-r border-inherit font-bold"
              >
                Skardos tipas
              </div>
              <div
                class="px-2 py-1 border-b-2 border-inherit border-r font-bold"
              >
                Premium
              </div>

              <div class="px-2 py-1 border-b border-inherit border-r">
                Kaina be PVM
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                {{ props.blind.premPriceM }} €/m
              </div>

              <div class="px-2 py-1 border-r border-inherit flex">
                Kaina su PVM
              </div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{ props.blind.premPriceMVat }} €/m
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="text-center font-bold text-lg">Žaliuzės laikikliai</div>
            <div
              class="grid grid-cols-[1fr_1fr] border-2 rounded-md border-black"
            >
              <div class="px-2 py-1 border-b border-inherit border-r">
                Kaina be PVM
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                {{ props.blind.holders }} €/vnt
              </div>

              <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{ props.blind.holdersVat }} €/vnt
              </div>
            </div>
          </div>
        </div>

        <NuxtImg
          :src="`/images/${props.blind.imgDetail}.jpg`"
          alt="Rombo tipo tvora maketas"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="h-[400px] min-w-[320px] w-auto object-contain"
        />

        <NuxtImg
          :src="`/images/${props.blind.imgView}.jpg`"
          alt="Rombo tipo tvora"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="h-[410px] max-w-[580px] w-full object-contain"
        />
      </div>
    </div>
  </OffersBoxWrap>
</template>

<style scoped></style>
