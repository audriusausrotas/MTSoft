<script setup lang="ts">
const props = defineProps(["fence", "retail"]);
console.log("fence");
</script>

<template>
  <OffersBoxWrap>
    <div class="print:break-after-page">
      <div class="font-bold text-2xl text-center mb-4">
        {{ props.fence.name }}
      </div>
      <div class="flex flex-wrap 2xl:justify-between justify-center gap-4 2xl:gap-0 w-full">
        <div class="flex flex-col gap-2 w-[400px] justify-evenly">
          <div v-if="props.fence.premPriceM" class="flex flex-col">
            <div class="text-center font-bold text-lg">{{ props.fence.name }} metro kaina</div>
            <div class="grid grid-cols-[1.2fr_1fr_1fr] border-2 rounded-md border-black">
              <div class="px-2 py-1 border-b-2 border-r border-inherit font-bold">
                Skardos tipas
              </div>
              <div class="px-2 py-1 border-b-2 border-inherit border-r font-bold">Premium</div>
              <div class="px-2 py-1 border-b-2 border-inherit font-bold">Eco</div>
              <div class="px-2 py-1 border-b border-inherit border-r">Kaina be PVM</div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                {{ props.fence.premPriceM }} €/m
              </div>
              <div class="px-2 py-1 border-b border-inherit">{{ props.fence.ecoPriceM }} €/m</div>
              <div class="px-2 py-1 border-r border-inherit flex">Kaina su PVM</div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{ props.fence.premPriceMVat }} €/m
              </div>
              <div class="px-2 py-1 flex">{{ props.fence.ecoPriceMVat }} €/m</div>
            </div>
          </div>

          <div v-if="props.fence.premPriceM2Nepr" class="flex flex-col">
            <div class="text-center font-bold text-lg">
              Nepramatoma - montavimo žingsnis {{ props.fence.stepNepr }} cm
            </div>
            <div class="grid grid-cols-[1.2fr_1fr_1fr] border-2 rounded-md border-black">
              <div class="px-2 py-1 border-b-2 border-r border-inherit font-bold">
                Skardos tipas
              </div>
              <div class="px-2 py-1 border-b-2 border-inherit border-r font-bold">Premium</div>
              <div class="px-2 py-1 border-b-2 border-inherit font-bold">Eco</div>
              <div class="px-2 py-1 border-b border-inherit border-r">Kaina be PVM</div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                {{ props.fence.premPriceM2Nepr }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-b border-inherit">
                {{ props.fence.ecoPriceM2Nepr }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{ props.fence.premPriceM2VatNepr }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 flex">
                {{ props.fence.ecoPriceM2VatNepr }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
            </div>
          </div>

          <div v-if="props.fence.premPriceM2Vid" class="flex flex-col">
            <div class="text-center font-bold text-lg">
              Vidutinė - montavimo žingsnis {{ props.fence.stepVid }} cm
            </div>
            <div class="grid grid-cols-[1.2fr_1fr_1fr] border-2 rounded-md border-black">
              <div class="px-2 py-1 border-b-2 border-r border-inherit font-bold">
                Skardos tipas
              </div>
              <div class="px-2 py-1 border-b-2 border-inherit border-r font-bold">Premium</div>
              <div class="px-2 py-1 border-b-2 border-inherit font-bold">Eco</div>
              <div class="px-2 py-1 border-b border-inherit border-r flex">Kaina be PVM</div>
              <div class="px-2 py-1 border-b border-inherit border-r flex">
                {{ props.fence.premPriceM2Vid }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-b border-inherit flex">
                {{ props.fence.ecoPriceM2Vid }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{ props.fence.premPriceM2VatVid }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 flex">
                {{ props.fence.ecoPriceM2VatVid }} €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
            </div>
          </div>
        </div>

        <NuxtImg
          :src="`/images/${props.fence.imgDetail}.jpg`"
          alt="Rombo tipo tvora maketas"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="h-[400px] min-w-[320px] w-auto object-contain"
        />

        <NuxtImg
          :src="`/images/${props.fence.imgView}.jpg`"
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
