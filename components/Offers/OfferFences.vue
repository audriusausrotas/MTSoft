<script setup lang="ts">
const props = defineProps(["retail", "blinds"]);

const fences = [
  {
    name: "Daimond 60/90",
    imgDetail: "daimond6090s",
    imgView: "daimond6090",
    stepNepr: "12",
    stepVid: "13",
    premPriceM: props.retail ? "2.84" : "",
    premPriceMVat: props.retail ? "3.44" : "",
    premPriceM2Nepr: props.retail ? "25.35" : "32",
    premPriceM2VatNepr: props.retail ? "30.67" : "38.72",
    premPriceM2Vid: props.retail ? "23.5" : "29.50",
    premPriceM2VatVid: props.retail ? "28.44" : "35.70",
    ecoPriceM: props.retail ? "2.31" : "",
    ecoPriceMVat: props.retail ? "2.80" : "",
    ecoPriceM2Nepr: props.retail ? "20.7" : "26.20",
    ecoPriceM2VatNepr: props.retail ? "25.05" : "31.7",
    ecoPriceM2Vid: props.retail ? "19.20" : "24.20",
    ecoPriceM2VatVid: props.retail ? "23.23" : "29.28",
  },
  {
    name: "Daimond 60/130",
    imgDetail: "daimond60130s",
    imgView: "daimond60130",
    stepNepr: "16",
    stepVid: "17",
    premPriceM: props.retail ? "3.53" : "",
    premPriceMVat: props.retail ? "4.27" : "",
    premPriceM2Nepr: props.retail ? "23.80" : "28.50",
    premPriceM2VatNepr: props.retail ? "28.80" : "34.49",
    premPriceM2Vid: props.retail ? "21.60" : "26",
    premPriceM2VatVid: props.retail ? "26.14" : "31.46",
    ecoPriceM: props.retail ? "2.82" : "",
    ecoPriceMVat: props.retail ? "3.41" : "",
    ecoPriceM2Nepr: props.retail ? "19.00" : "23.30",
    ecoPriceM2VatNepr: props.retail ? "22.99" : "28.19",
    ecoPriceM2Vid: props.retail ? "17.30" : "21.20",
    ecoPriceM2VatVid: props.retail ? "20.93" : "25.65",
  },
  {
    name: "Daimond 40/105",
    imgDetail: "daimond40105s",
    imgView: "daimond40105",
    stepNepr: "13",
    stepVid: "14",
    premPriceM: props.retail ? "2.84" : "",
    premPriceMVat: props.retail ? "3.44" : "",
    premPriceM2Nepr: props.retail ? "23.50" : "29.50",
    premPriceM2VatNepr: props.retail ? "28.44" : "35.70",
    premPriceM2Vid: props.retail ? "21.70" : "27.50",
    premPriceM2VatVid: props.retail ? "26.26" : "33.28",
    ecoPriceM: props.retail ? "2.31" : "",
    ecoPriceMVat: props.retail ? "2.80" : "",
    ecoPriceM2Nepr: props.retail ? "19.20" : "24.30",
    ecoPriceM2VatNepr: props.retail ? "23.23" : "29.40",
    ecoPriceM2Vid: props.retail ? "17.70" : "22.30",
    ecoPriceM2VatVid: props.retail ? "21.42" : "26.98",
  },
  {
    name: "Daimond Vertical",
    imgDetail: "daimond40105s",
    imgView: "daimondVertical2",
    stepNepr: "13",
    stepVid: "15",
    premPriceM: props.retail ? "3.12" : "",
    premPriceMVat: props.retail ? "3.78" : "",
    premPriceM2Nepr: props.retail ? "33" : "50",
    premPriceM2VatNepr: props.retail ? "39.93" : "60.50",
    premPriceM2Vid: props.retail ? "30.40" : "47",
    premPriceM2VatVid: props.retail ? "36.78" : "56.87",
    ecoPriceM: props.retail ? "2.54" : "",
    ecoPriceMVat: props.retail ? "3.07" : "",
    ecoPriceM2Nepr: props.retail ? "25.00" : "40.00",
    ecoPriceM2VatNepr: props.retail ? "30.25" : "48.40",
    ecoPriceM2Vid: props.retail ? "23.00" : "38.00",
    ecoPriceM2VatVid: props.retail ? "27.83" : "45.98",
  },
  {
    name: "Plank",
    imgDetail: "planks",
    imgView: "plank",
    stepNepr: "13",
    stepVid: "15",
    premPriceM: props.retail ? "3.02" : "",
    premPriceMVat: props.retail ? "3.65" : "",
    premPriceM2Nepr: props.retail ? "24.90" : "32.50",
    premPriceM2VatNepr: props.retail ? "30.13" : "39.33",
    premPriceM2Vid: props.retail ? "21.80" : "26.50",
    premPriceM2VatVid: props.retail ? "26.38" : "32.07",
    ecoPriceM: props.retail ? "2.51" : "",
    ecoPriceMVat: props.retail ? "3.04" : "",
    ecoPriceM2Nepr: props.retail ? "20.70" : "26.00",
    ecoPriceM2VatNepr: props.retail ? "25.05" : "31.46",
    ecoPriceM2Vid: props.retail ? "16.90" : "22.00",
    ecoPriceM2VatVid: props.retail ? "20.45" : "26.62",
  },

  {
    name: "Eglė",
    imgDetail: "egles",
    imgView: "egle",
    stepNepr: "11",
    stepVid: "12.6",
    premPriceM: props.retail ? "2.59" : "",
    premPriceMVat: props.retail ? "3.13" : "",
    premPriceM2Nepr: props.retail ? "25.30" : "33.50",
    premPriceM2VatNepr: props.retail ? "30.61" : "40.54",
    premPriceM2Vid: props.retail ? "22.10" : "27",
    premPriceM2VatVid: props.retail ? "26.74" : "32.67",
    ecoPriceM: props.retail ? "2.21" : "",
    ecoPriceMVat: props.retail ? "2.67" : "",
    ecoPriceM2Nepr: props.retail ? "21.00" : "26.00",
    ecoPriceM2VatNepr: props.retail ? "25.41" : "31.46",
    ecoPriceM2Vid: props.retail ? "17.50" : "22.00",
    ecoPriceM2VatVid: props.retail ? "21.18" : "26.62",
  },
  {
    name: "Eglė Plus",
    imgDetail: "nameliss",
    imgView: "namelis",
    stepNepr: "10.5",
    stepVid: "12.1",
    premPriceM: props.retail ? "3.07" : "",
    premPriceMVat: props.retail ? "3.71" : "",
    premPriceM2Nepr: props.retail ? "30.50" : "35",
    premPriceM2VatNepr: props.retail ? "36.91" : "42.35",
    premPriceM2Vid: props.retail ? "26.70" : "30",
    premPriceM2VatVid: props.retail ? "32.31" : "36.30",
    ecoPriceM: props.retail ? "2.51" : "",
    ecoPriceMVat: props.retail ? "3.04" : "",
    ecoPriceM2Nepr: props.retail ? "25.40" : "31.00",
    ecoPriceM2VatNepr: props.retail ? "30.73" : "37.51",
    ecoPriceM2Vid: props.retail ? "22.20" : "25.00",
    ecoPriceM2VatVid: props.retail ? "26.86" : "30.25",
  },
  {
    name: "Žaliuzi",
    imgDetail: "zaliuzis",
    imgView: "zaliuzi",
    stepNepr: "8.6",
    stepVid: "10",
    premPriceM: props.retail ? "2.31" : "",
    premPriceMVat: props.retail ? "2.80" : "",
    premPriceM2Nepr: props.retail ? "28.50" : "35",
    premPriceM2VatNepr: props.retail ? "34.49" : "42.35",
    premPriceM2Vid: props.retail ? "25.90" : "32.50",
    premPriceM2VatVid: props.retail ? "31.34" : "39.33",
    ecoPriceM: props.retail ? "2.01" : "",
    ecoPriceMVat: props.retail ? "2.43" : "",
    ecoPriceM2Nepr: props.retail ? "24.80" : "28.00",
    ecoPriceM2VatNepr: props.retail ? "30.01" : "33.88",
    ecoPriceM2Vid: props.retail ? "21.60" : "26.00",
    ecoPriceM2VatVid: props.retail ? "26.14" : "31.46",
  },
  {
    name: "Dilė",
    imgDetail: "diles",
    imgView: "dile",
    stepNepr: "12",
    stepVid: "13",
    premPriceM: props.retail ? "2.77" : "3.60",
    premPriceMVat: props.retail ? "3.35" : "4.36",
    premPriceM2Nepr: props.retail ? "" : "",
    premPriceM2VatNepr: props.retail ? "" : "",
    premPriceM2Vid: props.retail ? "" : "",
    premPriceM2VatVid: props.retail ? "" : "",
    ecoPriceM: props.retail ? "2.41" : "3.00",
    ecoPriceMVat: props.retail ? "2.92" : "3.63",
    ecoPriceM2Nepr: props.retail ? "" : "",
    ecoPriceM2VatNepr: props.retail ? "" : "",
    ecoPriceM2Vid: props.retail ? "" : "",
    ecoPriceM2VatVid: props.retail ? "" : "",
  },
];

const blinds = [
  {
    name: "Lauko žaliuzė 20x100",
    imgDetail: "blind",
    imgView: "blinds",
    premPriceM: props.retail ? "5.45" : "7.41",
    premPriceMVat: props.retail ? "6.60" : "8.97",
    holders: props.retail ? "22.50" : "25.88",
    holdersVat: props.retail ? "27.22" : "31.32",
  },
  {
    name: "Lauko žaliuzė 18x100",
    imgDetail: "blind",
    imgView: "blinds2",
    premPriceM: props.retail ? "5.45" : "7.41",
    premPriceMVat: props.retail ? "6.60" : "8.97",
    holders: props.retail ? "22.50" : "25.88",
    holdersVat: props.retail ? "27.22" : "31.32",
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
      :retail="props.retail"
      :blinds="true"
    />
  </div>
  <div v-else>
    <OffersFenceCard
      v-for="fence in fences"
      :key="fence.name"
      :fence="fence"
      class="print:break-after-page"
      :retail="props.retail"
    />
  </div>
</template>
