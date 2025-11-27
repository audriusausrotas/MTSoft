<script setup lang="ts">
import type { FenceSetup } from "~/data/interfaces";

const props = defineProps<{
  fence: FenceSetup;
  retail: Boolean;
}>();

const img1 = `/images/${props.fence.name
  .replace("/", "")
  .replace(" ", "")
  .toLowerCase()}.jpg`;

const img2 = `/images/${
  props.fence.name.replace("/", "").replace(" ", "").toLowerCase() + "s"
}.jpg`;
</script>

<template>
  <OffersBoxWrap>
    <div class="print:break-after-page">
      <div class="font-bold text-2xl text-center mb-4">
        {{ props.fence.name }}
      </div>
      <div
        class="flex flex-wrap 2xl:justify-between justify-center gap-4 2xl:gap-0 w-full"
      >
        <div class="flex flex-col gap-2 w-[400px] justify-evenly">
          <div v-if="!props.retail" class="flex flex-col">
            <div class="text-center font-bold text-lg">
              {{ props.fence.name }} metro kaina
            </div>
            <div
              class="grid border-2 rounded-md border-black"
              :class="
                props.fence.name !== 'Dilė'
                  ? 'grid-cols-[1.2fr_1fr_1fr]'
                  : 'grid-cols-[1.2fr_1fr]'
              "
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
              <div
                v-if="props.fence.name !== 'Dilė'"
                class="px-2 py-1 border-b-2 border-inherit font-bold"
              >
                Eco
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                Kaina be PVM
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                {{
                  props.retail
                    ? props.fence.prices.premium.meter.priceRetail
                    : props.fence.prices.premium.meter.priceWholesale
                }}
                €/m
              </div>
              <div
                v-if="props.fence.name !== 'Dilė'"
                class="px-2 py-1 border-b border-inherit"
              >
                {{
                  props.retail
                    ? props.fence.prices.eco.meter.priceRetail
                    : props.fence.prices.eco.meter.priceWholesale
                }}
                €/m
              </div>
              <div class="px-2 py-1 border-r border-inherit flex">
                Kaina su PVM
              </div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{
                  (props.retail
                    ? props.fence.prices.premium.meter.priceRetail * 1.21
                    : props.fence.prices.premium.meter.priceWholesale * 1.21
                  ).toFixed(2)
                }}
                €/m
              </div>
              <div v-if="props.fence.name !== 'Dilė'" class="px-2 py-1 flex">
                {{
                  (props.retail
                    ? props.fence.prices.eco.meter.priceRetail * 1.21
                    : props.fence.prices.eco.meter.priceWholesale * 1.21
                  ).toFixed(2)
                }}
                €/m
              </div>
            </div>
          </div>

          <div v-if="props.fence.name !== 'Dilė'" class="flex flex-col">
            <div class="text-center font-bold text-lg">
              Nepramatoma - montavimo žingsnis
              {{ props.fence.steps.nepramatoma }} cm
            </div>
            <div
              class="grid grid-cols-[1.2fr_1fr_1fr] border-2 rounded-md border-black"
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
              <div class="px-2 py-1 border-b-2 border-inherit font-bold">
                Eco
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                Kaina be PVM
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r">
                {{
                  props.retail
                    ? props.fence.prices.premium.nepramatoma.priceRetail
                    : props.fence.prices.premium.nepramatoma.priceWholesale
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-b border-inherit">
                {{
                  props.retail
                    ? props.fence.prices.eco.nepramatoma.priceRetail
                    : props.fence.prices.eco.nepramatoma.priceWholesale
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{
                  (props.retail
                    ? props.fence.prices.premium.nepramatoma.priceRetail * 1.21
                    : props.fence.prices.premium.nepramatoma.priceWholesale *
                      1.21
                  ).toFixed(2)
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 flex">
                {{
                  (props.retail
                    ? props.fence.prices.eco.nepramatoma.priceRetail * 1.21
                    : props.fence.prices.eco.nepramatoma.priceWholesale * 1.21
                  ).toFixed(2)
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
            </div>
          </div>

          <div v-if="props.fence.name !== 'Dilė'" class="flex flex-col">
            <div class="text-center font-bold text-lg">
              Vidutinė - montavimo žingsnis
              {{ props.fence.steps.vidutiniska }} cm
            </div>
            <div
              class="grid grid-cols-[1.2fr_1fr_1fr] border-2 rounded-md border-black"
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
              <div class="px-2 py-1 border-b-2 border-inherit font-bold">
                Eco
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r flex">
                Kaina be PVM
              </div>
              <div class="px-2 py-1 border-b border-inherit border-r flex">
                {{
                  props.retail
                    ? props.fence.prices.premium.vidutiniska.priceRetail
                    : props.fence.prices.premium.vidutiniska.priceWholesale
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-b border-inherit flex">
                {{
                  props.retail
                    ? props.fence.prices.eco.vidutiniska.priceRetail
                    : props.fence.prices.eco.vidutiniska.priceWholesale
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 border-r border-inherit">Kaina su PVM</div>
              <div class="px-2 py-1 border-r border-inherit flex">
                {{
                  (props.retail
                    ? props.fence.prices.premium.vidutiniska.priceRetail * 1.21
                    : props.fence.prices.premium.vidutiniska.priceWholesale *
                      1.21
                  ).toFixed(2)
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
              <div class="px-2 py-1 flex">
                {{
                  (props.retail
                    ? props.fence.prices.eco.vidutiniska.priceRetail * 1.21
                    : props.fence.prices.eco.vidutiniska.priceWholesale * 1.21
                  ).toFixed(2)
                }}
                €/m
                <span class="text-[12px] items-start mr-1">2</span>
              </div>
            </div>
          </div>
        </div>

        <NuxtImg
          :src="img2"
          alt="Rombo tipo tvora maketas"
          -
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="h-[400px] min-w-[320px] w-auto object-contain"
        />

        <NuxtImg
          :src="img1"
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
