<script setup lang="ts">
const props = defineProps(["retail", "blinds"]);

const settingsStore = useSettingsStore();

const fencess = settingsStore.fences.filter(
  (item) => item.category === "Tvora"
);

const blinds = [
  {
    name: "Lauko žaliuzė 20x100",
    imgDetail: "blind",
    imgView: "blinds",
    premPriceM: !props.retail ? "5.45" : "7.41",
    premPriceMVat: !props.retail ? "6.60" : "8.97",
    holders: !props.retail ? "22.50" : "25.88",
    holdersVat: !props.retail ? "27.22" : "31.32",
  },
  {
    name: "Lauko žaliuzė 18x100",
    imgDetail: "blind",
    imgView: "blinds2",
    premPriceM: !props.retail ? "5.45" : "7.41",
    premPriceMVat: !props.retail ? "6.60" : "8.97",
    holders: !props.retail ? "22.50" : "25.88",
    holdersVat: !props.retail ? "27.22" : "31.32",
  },
];
</script>

<template>
  <div v-if="props.blinds">
    <OffersBlindCard
      v-for="blind in blinds"
      :key="blind.name"
      :blind="blind"
      class="print:break-after-page"
      :retail="!props.retail"
      :blinds="true"
    />
  </div>
  <div v-else>
    <OffersFenceCard
      v-for="fence in fencess"
      :key="fence.name"
      :fence="fence"
      class="print:break-after-page"
      :retail="props.retail"
      :imgView="fence.name.replace('/', '').replace(' ', '').toLowerCase()"
      :imgDetail="
        fence.name.replace('/', '').replace(' ', '').toLowerCase() + 's'
      "
    />
  </div>
</template>
