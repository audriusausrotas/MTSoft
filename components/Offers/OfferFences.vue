<script setup lang="ts">
const props = defineProps(["retail"]);

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
    ecoPriceM: "2.54",
    ecoPriceMVat: "3.07",
    ecoPriceM2Nepr: props.retail ? "22.7" : "28",
    ecoPriceM2VatNepr: props.retail ? "27.47" : "33.88",
    ecoPriceM2Vid: props.retail ? "21" : "25.60",
    ecoPriceM2VatVid: props.retail ? "25.41" : "30.98",
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
    ecoPriceM: "3.13",
    ecoPriceMVat: "3.79",
    ecoPriceM2Nepr: props.retail ? "21.10" : "25.60",
    ecoPriceM2VatNepr: props.retail ? "25.53" : "30.98",
    ecoPriceM2Vid: props.retail ? "19.20" : "22.80",
    ecoPriceM2VatVid: props.retail ? "23.23" : "27.59",
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
    ecoPriceM: "2.54",
    ecoPriceMVat: "3.07",
    ecoPriceM2Nepr: props.retail ? "21" : "25.60",
    ecoPriceM2VatNepr: props.retail ? "25.41" : "30.98",
    ecoPriceM2Vid: props.retail ? "19.40" : "23.50",
    ecoPriceM2VatVid: props.retail ? "23.47" : "28.44",
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
    ecoPriceM: "2.79",
    ecoPriceMVat: "3.38",
    ecoPriceM2Nepr: props.retail ? "30" : "45",
    ecoPriceM2VatNepr: props.retail ? "36.30" : "54.45",
    ecoPriceM2Vid: props.retail ? "27.30" : "42",
    ecoPriceM2VatVid: props.retail ? "33.03" : "50.82",
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
    ecoPriceM: "2.70",
    ecoPriceMVat: "3.27",
    ecoPriceM2Nepr: props.retail ? "22.50" : "27",
    ecoPriceM2VatNepr: props.retail ? "27.23" : "32,67",
    ecoPriceM2Vid: props.retail ? "19.70" : "24",
    ecoPriceM2VatVid: props.retail ? "23.84" : "29.04",
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
    ecoPriceM: "2.37",
    ecoPriceMVat: "2.87",
    ecoPriceM2Nepr: props.retail ? "23.10" : "28",
    ecoPriceM2VatNepr: props.retail ? "27.95" : "33.88",
    ecoPriceM2Vid: props.retail ? "20.20" : "24.6",
    ecoPriceM2VatVid: props.retail ? "24.44" : "29.77",
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
    ecoPriceM: "2.73",
    ecoPriceMVat: "3.30",
    ecoPriceM2Nepr: props.retail ? "27.50" : "32",
    ecoPriceM2VatNepr: props.retail ? "33.28" : "38.72",
    ecoPriceM2Vid: props.retail ? "23.40" : "28",
    ecoPriceM2VatVid: props.retail ? "28.31" : "33.88",
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
    ecoPriceM: "2.13",
    ecoPriceMVat: "2.58",
    ecoPriceM2Nepr: props.retail ? "26.30" : "30",
    ecoPriceM2VatNepr: props.retail ? "31.82" : "36.3",
    ecoPriceM2Vid: props.retail ? "23.90" : "27.3",
    ecoPriceM2VatVid: props.retail ? "28.92" : "33.03",
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
    ecoPriceM: props.retail ? "2.56" : "3.30",
    ecoPriceMVat: props.retail ? "3.10" : "3.99",
    ecoPriceM2Nepr: props.retail ? "" : "",
    ecoPriceM2VatNepr: props.retail ? "" : "",
    ecoPriceM2Vid: props.retail ? "" : "",
    ecoPriceM2VatVid: props.retail ? "" : "",
  },
];
</script>

<template>
  <OffersFenceCard
    v-for="fence in fences"
    :key="fence.name"
    :fence="fence"
    class="print:break-after-page"
    :retail="props.retail"
  />
</template>
