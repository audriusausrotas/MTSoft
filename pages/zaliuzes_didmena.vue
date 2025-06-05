<script setup lang="ts">
definePageMeta({
  layout: false,
});

const files = [
  "blindsPDF1",
  "blindsPDF2",
  "blindsPDF3",
  "blindsPDF4",
  "blindsPDF5",
  "blindsPDF6",
];
</script>
<template>
  <div class="max-w-[1470px] m-auto py-8">
    <div class="flex flex-col gap-8">
      <OffersAbout
        class="print:break-after-page"
        phone="+370 690 36336"
        email="andrius@modernitvora.lt"
        image="/images/zaliuzeOffer.jpg"
      />

      <OffersBoxWrap>
        <div class="text-2xl font-bold text-center">Bendra informacija</div>
        <div class="divide-y text-justify">
          <li>Žaliuzių gamybos terminas 1-2 savaitės</li>
          <li>Žaliuzės gaminamos pagal užsakovo duotus ilgius</li>
          <li>Pristatymas visoje Lietuvoje</li>
        </div>
      </OffersBoxWrap>

      <OffersSteelInfo
        class="print:break-after-page"
        :hideEco="true"
        :blinds="true"
      />

      <OffersOfferFences :retail="true" :blinds="true" />

      <OffersColorsCard />

      <div class="flex flex-col gap-8 w-full items-center">
        <OffersBoxWrap v-for="file in files" :key="file" class="w-full">
          <NuxtImg
            :src="`/images/${file}.jpg`"
            alt="Lauko žaliužė"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
        </OffersBoxWrap>
      </div>
    </div>
  </div>
</template>
