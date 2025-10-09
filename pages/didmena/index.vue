<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="max-w-[1470px] m-auto py-8">
    <div class="flex flex-col gap-8">
      <OffersAbout
        class="print:break-after-page"
        phone="+370 600 97 933"
        email="dalius@modernitvora.lt"
        image="/images/cover.jpg"
      />
      <OffersInfoCard />
      <OffersSteelInfo class="print:break-after-page" />
      <OffersOfferFences :retail="true" :blinds="false" />
      <OffersAditional />
      <OffersColorsCard />
    </div>
  </div>
</template>
