<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="max-w-[1470px] m-auto py-8">
    <div class="flex flex-col gap-8">
      <OffersAbout class="print:break-after-page" />
      <OffersSteelInfo class="print:break-after-page" />
      <OffersOfferFences :retail="false" />
      <OffersColorsCard />
    </div>
  </div>
</template>
