<template>
  <div class="flex flex-col gap-8">
    <OffersAbout class="print:break-after-page" />
    <OffersInfoCard />
    <OffersSteelInfo class="print:break-after-page" />
    <OffersOfferFences :retail="true" />
    <OffersAditional />
    <OffersColorsCard />
  </div>
</template>
