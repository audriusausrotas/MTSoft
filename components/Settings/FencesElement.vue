<script setup lang="ts">
import { fenceTypes, fenceDirection } from "~/data/selectFieldData";
import FencesElementBlock from "./FencesElementBlock.vue";
import { calculateFencePrice } from "@/utils/calculations/calculateFencePrice";
import { calculateProductPrice } from "@/utils/calculations/calculateProductPrice";
import type { Product } from "~/data/interfaces";
const props = defineProps(["fence", "index"]);

const { setError, setSuccess } = useCustomError();
const settingsStore = useSettingsStore();

const editable = ref<boolean>(false);
const fenceOpen = ref<boolean>(false);

const isFence = props.fence?.category === "Tvora";
const isSegment = props.fence?.category === "Segmentas";

const name = ref(props.fence.name);
const category = ref(props.fence.category);
const defaultDirection = ref(props.fence.defaultDirection);

const aditional = reactive({
  show: props.fence.aditional?.show || false,
  description: props.fence.aditional?.description || "",
  seoTitle: props.fence.aditional?.seoTitle || "",
  seoDescription: props.fence.aditional?.seoDescription || "",
  descriptionEn: props.fence.aditional?.descriptionEn || "",
  seoTitleEn: props.fence.aditional?.seoTitleEn || "",
  seoDescriptionEn: props.fence.aditional?.seoDescriptionEn || "",
  images: props.fence.aditional?.images || [],
});

const profit = reactive({
  premiumRetail: props.fence?.profit?.premiumRetail || 0,
  premiumWholesale: props.fence?.profit?.premiumWholesale || 0,
  ecoRetail: props.fence?.profit?.ecoRetail || 0,
  ecoWholesale: props.fence?.profit?.ecoWholesale || 0,
});

const details = reactive({
  height: props.fence?.details?.height,
  width: props.fence?.details?.width,
  bends: props.fence?.details?.bends,
  holes: props.fence?.details?.holes,
});

const steps = reactive({
  aklina: props.fence?.steps?.aklina,
  nepramatoma: props.fence?.steps?.nepramatoma,
  vidutiniska: props.fence?.steps?.vidutiniska,
  pramatoma: props.fence?.steps?.pramatoma,
  pramatoma25: props.fence?.steps?.pramatoma25,
  pramatoma50: props.fence?.steps?.pramatoma50,
});

const prices = reactive({
  cost: props.fence?.prices?.cost,
  priceRetail: props.fence?.prices?.priceRetail,
  priceWholesale: props.fence?.prices?.priceWholesale,
  premium: {
    meter: {
      cost: props.fence?.prices?.premium?.meter?.cost,
      priceRetail: props.fence?.prices?.premium?.meter?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.meter?.priceWholesale,
    },
    aklina: {
      cost: props.fence?.prices?.premium?.aklina?.cost,
      priceRetail: props.fence?.prices?.premium?.aklina?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.aklina?.priceWholesale,
    },
    nepramatoma: {
      cost: props.fence?.prices?.premium?.nepramatoma?.cost,
      priceRetail: props.fence?.prices?.premium?.nepramatoma?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.nepramatoma?.priceWholesale,
    },
    vidutiniska: {
      cost: props.fence?.prices?.premium?.vidutiniska?.cost,
      priceRetail: props.fence?.prices?.premium?.vidutiniska?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.vidutiniska?.priceWholesale,
    },
    pramatoma: {
      cost: props.fence?.prices?.premium?.pramatoma?.cost,
      priceRetail: props.fence?.prices?.premium?.pramatoma?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.pramatoma?.priceWholesale,
    },
    pramatoma25: {
      cost: props.fence?.prices?.premium?.pramatoma25?.cost,
      priceRetail: props.fence?.prices?.premium?.pramatoma25?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.pramatoma25?.priceWholesale,
    },
    pramatoma50: {
      cost: props.fence?.prices?.premium?.pramatoma50?.cost,
      priceRetail: props.fence?.prices?.premium?.pramatoma50?.priceRetail,
      priceWholesale: props.fence?.prices?.premium?.pramatoma50?.priceWholesale,
    },
  },
  eco: {
    meter: {
      cost: props.fence?.prices?.eco?.meter?.cost,
      priceRetail: props.fence?.prices?.eco?.meter?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.meter?.priceWholesale,
    },
    aklina: {
      cost: props.fence?.prices?.eco?.aklina?.cost,
      priceRetail: props.fence?.prices?.eco?.aklina?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.aklina?.priceWholesale,
    },
    nepramatoma: {
      cost: props.fence?.prices?.eco?.nepramatoma?.cost,
      priceRetail: props.fence?.prices?.eco?.nepramatoma?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.nepramatoma?.priceWholesale,
    },
    vidutiniska: {
      cost: props.fence?.prices?.eco?.vidutiniska?.cost,
      priceRetail: props.fence?.prices?.eco?.vidutiniska?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.vidutiniska?.priceWholesale,
    },
    pramatoma: {
      cost: props.fence?.prices?.eco?.pramatoma?.cost,
      priceRetail: props.fence?.prices?.eco?.pramatoma?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.pramatoma?.priceWholesale,
    },
    pramatoma25: {
      cost: props.fence?.prices?.eco?.pramatoma25?.cost,
      priceRetail: props.fence?.prices?.eco?.pramatoma25?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.pramatoma25?.priceWholesale,
    },
    pramatoma50: {
      cost: props.fence?.prices?.eco?.pramatoma50?.cost,
      priceRetail: props.fence?.prices?.eco?.pramatoma50?.priceRetail,
      priceWholesale: props.fence?.prices?.eco?.pramatoma50?.priceWholesale,
    },
  },
});

const saveHandler = async () => {
  const requestData = {
    _id: props.fence._id,
    name: name.value,
    category: category.value,
    defaultDirection: defaultDirection.value,
    profit: { ...profit },
    details: { ...details },
    aditional: { ...aditional },
    steps: { ...steps },
    prices: { ...prices },
  };

  const response: any = await request.patch("updateFenceData", requestData);
  if (response.success) {
    !useSocketStore().connected && settingsStore.updateFenceSettings(response.data);
    editable.value = false;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async () => {
  if (!confirm("Ar tikrai norite ištrinti šią tvorą?")) return;

  const response: any = await request.delete(`deleteFenceSettings/${props.fence._id}`);
  if (response.success) {
    !useSocketStore().connected && settingsStore.deleteFence(props.fence._id);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const recalculateHandler = () => {
  if (isFence) {
    if (!prices.premium.meter.cost || !prices.eco.meter.cost) return;

    const legNamePremium = settingsStore.defaultValues.retailDoubleLeg;
    const legNameEco = settingsStore.defaultValues.retailDoubleLegEco;
    const legPricePremium: Product | undefined = useProductsStore().products.find(
      (item) => item.name === legNamePremium,
    );
    const legPriceEco: Product | undefined = useProductsStore().products.find(
      (item) => item.name === legNameEco,
    );

    if (!legPricePremium || !legPriceEco) return;

    prices.premium.meter.priceRetail = (
      prices.premium.meter.cost /
      ((100 - profit.premiumRetail) / 100)
    ).toFixed(2);

    prices.premium.meter.priceWholesale = (
      prices.premium.meter.cost /
      ((100 - profit.premiumWholesale) / 100)
    ).toFixed(2);

    prices.eco.meter.priceRetail = (
      prices.eco.meter.cost /
      ((100 - profit.ecoRetail) / 100)
    ).toFixed(2);

    prices.eco.meter.priceWholesale = (
      prices.eco.meter.cost /
      ((100 - profit.ecoWholesale) / 100)
    ).toFixed(2);

    //cost
    prices.premium.aklina.cost = calculateFencePrice(
      steps.aklina,
      prices.premium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    prices.premium.nepramatoma.cost = calculateFencePrice(
      steps.nepramatoma,
      prices.premium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    prices.premium.vidutiniska.cost = calculateFencePrice(
      steps.vidutiniska,
      prices.premium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    prices.premium.pramatoma.cost = calculateFencePrice(
      steps.pramatoma,
      prices.premium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    prices.premium.pramatoma25.cost = calculateFencePrice(
      steps.pramatoma25,
      prices.premium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    prices.premium.pramatoma50.cost = calculateFencePrice(
      steps.pramatoma50,
      prices.premium.meter.cost,
      legPricePremium?.prices?.cost,
    );

    // wholesale
    prices.premium.aklina.priceWholesale = calculateFencePrice(
      steps.aklina,
      prices.premium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    prices.premium.nepramatoma.priceWholesale = calculateFencePrice(
      steps.nepramatoma,
      prices.premium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    prices.premium.vidutiniska.priceWholesale = calculateFencePrice(
      steps.vidutiniska,
      prices.premium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    prices.premium.pramatoma.priceWholesale = calculateFencePrice(
      steps.pramatoma,
      prices.premium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    prices.premium.pramatoma25.priceWholesale = calculateFencePrice(
      steps.pramatoma25,
      prices.premium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    prices.premium.pramatoma50.priceWholesale = calculateFencePrice(
      steps.pramatoma50,
      prices.premium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    // Retail
    prices.premium.aklina.priceRetail = calculateFencePrice(
      steps.aklina,
      prices.premium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    prices.premium.nepramatoma.priceRetail = calculateFencePrice(
      steps.nepramatoma,
      prices.premium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    prices.premium.vidutiniska.priceRetail = calculateFencePrice(
      steps.vidutiniska,
      prices.premium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    prices.premium.pramatoma.priceRetail = calculateFencePrice(
      steps.pramatoma,
      prices.premium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    prices.premium.pramatoma25.priceRetail = calculateFencePrice(
      steps.pramatoma25,
      prices.premium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    prices.premium.pramatoma50.priceRetail = calculateFencePrice(
      steps.pramatoma50,
      prices.premium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );

    //// eco
    //cost
    prices.eco.aklina.cost = calculateFencePrice(
      steps.aklina,
      prices.eco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    prices.eco.nepramatoma.cost = calculateFencePrice(
      steps.nepramatoma,
      prices.eco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    prices.eco.vidutiniska.cost = calculateFencePrice(
      steps.vidutiniska,
      prices.eco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    prices.eco.pramatoma.cost = calculateFencePrice(
      steps.pramatoma,
      prices.eco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    prices.eco.pramatoma25.cost = calculateFencePrice(
      steps.pramatoma25,
      prices.eco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    prices.eco.pramatoma50.cost = calculateFencePrice(
      steps.pramatoma50,
      prices.eco.meter.cost,
      legPriceEco?.prices?.cost,
    );

    // wholesale
    prices.eco.aklina.priceWholesale = calculateFencePrice(
      steps.aklina,
      prices.eco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    prices.eco.nepramatoma.priceWholesale = calculateFencePrice(
      steps.nepramatoma,
      prices.eco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    prices.eco.vidutiniska.priceWholesale = calculateFencePrice(
      steps.vidutiniska,
      prices.eco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    prices.eco.pramatoma.priceWholesale = calculateFencePrice(
      steps.pramatoma,
      prices.eco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    prices.eco.pramatoma25.priceWholesale = calculateFencePrice(
      steps.pramatoma25,
      prices.eco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    prices.eco.pramatoma50.priceWholesale = calculateFencePrice(
      steps.pramatoma50,
      prices.eco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    // Retail
    prices.eco.aklina.priceRetail = calculateFencePrice(
      steps.aklina,
      prices.eco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    prices.eco.nepramatoma.priceRetail = calculateFencePrice(
      steps.nepramatoma,
      prices.eco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    prices.eco.vidutiniska.priceRetail = calculateFencePrice(
      steps.vidutiniska,
      prices.eco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    prices.eco.pramatoma.priceRetail = calculateFencePrice(
      steps.pramatoma,
      prices.eco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    prices.eco.pramatoma25.priceRetail = calculateFencePrice(
      steps.pramatoma25,
      prices.eco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    prices.eco.pramatoma50.priceRetail = calculateFencePrice(
      steps.pramatoma50,
      prices.eco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
  } else {
    if (!prices.cost) return;
    prices.priceRetail = calculateProductPrice(prices.cost, profit.premiumRetail);

    prices.priceWholesale = (prices.cost / ((100 - profit.premiumWholesale) / 100)).toFixed(2);
  }
};

const addImage = () => {
  aditional.images.push({
    url: "",
    alt: "",
    altEN: "",
  });
};
</script>

<template>
  <div class="flex flex-col w-full border border-gray-full p-2 rounded-xl relative gap-8">
    <div class="flex justify-between items-center">
      <div @click="fenceOpen = !fenceOpen" class="flex gap-4 hover:cursor-pointer select-none">
        <NuxtImg
          src="/icons/arrowDown.svg"
          alt="arrow-down"
          class="w-4 transition-transform duration-300"
          :class="fenceOpen ? 'rotate-180' : ''"
        />
        <div class="font-bold text-xl">{{ name }}</div>
      </div>

      <BaseActionButtons
        @onSave="saveHandler"
        @onEdit="editable = true"
        @onDelete="deleteHandler"
        @onCancel="editable = false"
      />
    </div>

    <div v-if="fenceOpen" class="flex flex-col gap-4">
      <SettingsFenceElementWraper name="lankstinio informacija">
        <div v-if="editable" class="flex flex-col">
          <p class="font-semibold text-lg">Maržos skaičiavimui</p>
          <div class="flex gap-4 items-end">
            <BaseButton name="Skaičiuoti" @click="recalculateHandler" />
            <BaseInput
              :name="profit.premiumWholesale"
              placeholder="Didmenos %"
              :label="props.fence.category === 'Tvora' ? 'Didmena Premium' : 'Didmena'"
              type="number"
              width="w-40"
              @onChange="(value) => (profit.premiumWholesale = +value)"
            />
            <BaseInput
              :name="profit.premiumRetail"
              placeholder="Mažmenos %"
              :label="props.fence.category === 'Tvora' ? 'Mažmena Premium' : 'Mažmena'"
              type="number"
              width="w-40"
              @onChange="(value) => (profit.premiumRetail = +value)"
            />
            <BaseInput
              v-if="props.fence.category === 'Tvora'"
              :name="profit.ecoWholesale"
              placeholder="Didmenos %"
              label="Didmena Eco"
              type="number"
              width="w-40"
              @onChange="(value) => (profit.ecoWholesale = +value)"
            />
            <BaseInput
              v-if="props.fence.category === 'Tvora'"
              :name="profit.ecoRetail"
              placeholder="Mažmenos %"
              label="Mažmena Eco"
              type="number"
              width="w-40"
              @onChange="(value) => (profit.ecoRetail = +value)"
            />
          </div>
        </div>

        <div class="flex gap-4 w-full">
          <BaseInput
            :name="name"
            width="max-w-96 w-full "
            label="Tvoros Pavadinimas"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (name = value)"
          />

          <BaseSelectField
            label="Tvoros Tipas"
            :values="fenceTypes"
            :defaultValue="category"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            width="w-40"
            @onChange="(value) => (category = value)"
          />

          <BaseSelectField
            v-if="!isSegment"
            label="Kryptis"
            :values="fenceDirection"
            :defaultValue="defaultDirection.value"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            width="w-40"
            @onChange="(value) => (defaultDirection.value = value)"
          />

          <BaseInput
            :name="details?.height"
            label="aukštis"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (details.height = +value)"
          />

          <BaseInput
            :name="details?.width"
            label="plotis"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (details.width = +value)"
          />

          <BaseInput
            v-if="isFence"
            :name="details?.bends"
            label="lenkimai"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (details.bends = +value)"
          />

          <BaseInput
            v-if="isFence"
            :name="details?.holes"
            label="Skyluės lankstinyje"
            width="w-36"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (details.holes = +value)"
          />
        </div>
      </SettingsFenceElementWraper>

      <SettingsFenceElementWraper v-if="isFence" name="Montavimo žingsnis">
        <div class="flex gap-4">
          <BaseInput
            :name="steps.aklina"
            label="Aklina"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.aklina = +value)"
          />
          <BaseInput
            :name="steps.nepramatoma"
            label="Nepramatoma"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.nepramatoma = +value)"
          />
          <BaseInput
            :name="steps.vidutiniska"
            label="Vidutiniška"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.vidutiniska = +value)"
          />
          <BaseInput
            :name="steps.pramatoma"
            label="Pramatoma"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.pramatoma = +value)"
          />
          <BaseInput
            :name="steps.pramatoma25"
            label="25%"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.pramatoma25 = +value)"
          />
          <BaseInput
            :name="steps.pramatoma50"
            label="50%"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.pramatoma50 = +value)"
          />
        </div>
      </SettingsFenceElementWraper>

      <SettingsFenceElementWraper v-if="!isFence" name="Kainos">
        <div class="flex gap-4">
          <BaseInput
            :name="prices.cost"
            label="Savikaina"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (prices.cost = +value)"
          />
          <BaseInput
            :name="prices.priceWholesale"
            label="Didmena"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (prices.priceWholesale = +value)"
          />
          <BaseInput
            :name="prices.priceRetail"
            label="Mažmena"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (prices.priceRetail = +value)"
          />
        </div>
      </SettingsFenceElementWraper>

      <SettingsFenceElementWraper v-if="isFence" name="Premium skardos kainos">
        <div class="flex gap-4">
          <FencesElementBlock
            name="Metras"
            :editable="editable"
            :cost="prices.premium.meter.cost"
            :wholesale="prices.premium.meter.priceWholesale"
            :retail="prices.premium.meter.priceRetail"
            @cost="(value) => (prices.premium.meter.cost = +value)"
            @wholesale="(value) => (prices.premium.meter.priceWholesale = +value)"
            @retail="(value) => (prices.premium.meter.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Aklina"
            :editable="editable"
            :cost="prices.premium.aklina.cost"
            :wholesale="prices.premium.aklina.priceWholesale"
            :retail="prices.premium.aklina.priceRetail"
            @cost="(value) => (prices.premium.aklina.cost = +value)"
            @wholesale="(value) => (prices.premium.aklina.priceWholesale = +value)"
            @retail="(value) => (prices.premium.aklina.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Nepramatoma"
            :editable="editable"
            :cost="prices.premium.nepramatoma.cost"
            :wholesale="prices.premium.nepramatoma.priceWholesale"
            :retail="prices.premium.nepramatoma.priceRetail"
            @cost="(value) => (prices.premium.nepramatoma.cost = +value)"
            @wholesale="(value) => (prices.premium.nepramatoma.priceWholesale = +value)"
            @retail="(value) => (prices.premium.nepramatoma.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Vidutiniska"
            :editable="editable"
            :cost="prices.premium.vidutiniska.cost"
            :wholesale="prices.premium.vidutiniska.priceWholesale"
            :retail="prices.premium.vidutiniska.priceRetail"
            @cost="(value) => (prices.premium.vidutiniska.cost = +value)"
            @wholesale="(value) => (prices.premium.vidutiniska.priceWholesale = +value)"
            @retail="(value) => (prices.premium.vidutiniska.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Pramatoma"
            :editable="editable"
            :cost="prices.premium.pramatoma.cost"
            :wholesale="prices.premium.pramatoma.priceWholesale"
            :retail="prices.premium.pramatoma.priceRetail"
            @cost="(value) => (prices.premium.pramatoma.cost = +value)"
            @wholesale="(value) => (prices.premium.pramatoma.priceWholesale = +value)"
            @retail="(value) => (prices.premium.pramatoma.priceRetail = +value)"
          />
          <FencesElementBlock
            name="25% pramatomumas"
            :editable="editable"
            :cost="prices.premium.pramatoma25.cost"
            :wholesale="prices.premium.pramatoma25.priceWholesale"
            :retail="prices.premium.pramatoma25.priceRetail"
            @cost="(value) => (prices.premium.pramatoma25.cost = +value)"
            @wholesale="(value) => (prices.premium.pramatoma25.priceWholesale = +value)"
            @retail="(value) => (prices.premium.pramatoma25.priceRetail = +value)"
          />
          <FencesElementBlock
            name="50% pramatomumas"
            :editable="editable"
            :cost="prices.premium.pramatoma50.cost"
            :wholesale="prices.premium.pramatoma50.priceWholesale"
            :retail="prices.premium.pramatoma50.priceRetail"
            @cost="(value) => (prices.premium.pramatoma50.cost = +value)"
            @wholesale="(value) => (prices.premium.pramatoma50.priceWholesale = +value)"
            @retail="(value) => (prices.premium.pramatoma50.priceRetail = +value)"
          />
        </div>
      </SettingsFenceElementWraper>

      <SettingsFenceElementWraper v-if="isFence" name="Eco skardos kainos">
        <div class="flex gap-4">
          <FencesElementBlock
            name="Metras"
            :editable="editable"
            :cost="prices.eco.meter.cost"
            :wholesale="prices.eco.meter.priceWholesale"
            :retail="prices.eco.meter.priceRetail"
            @cost="(value) => (prices.eco.meter.cost = +value)"
            @wholesale="(value) => (prices.eco.meter.priceWholesale = +value)"
            @retail="(value) => (prices.eco.meter.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Aklina"
            :editable="editable"
            :cost="prices.eco.aklina.cost"
            :wholesale="prices.eco.aklina.priceWholesale"
            :retail="prices.eco.aklina.priceRetail"
            @cost="(value) => (prices.eco.aklina.cost = +value)"
            @wholesale="(value) => (prices.eco.aklina.priceWholesale = +value)"
            @retail="(value) => (prices.eco.aklina.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Nepramatoma"
            :editable="editable"
            :cost="prices.eco.nepramatoma.cost"
            :wholesale="prices.eco.nepramatoma.priceWholesale"
            :retail="prices.eco.nepramatoma.priceRetail"
            @cost="(value) => (prices.eco.nepramatoma.cost = +value)"
            @wholesale="(value) => (prices.eco.nepramatoma.priceWholesale = +value)"
            @retail="(value) => (prices.eco.nepramatoma.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Vidutiniska"
            :editable="editable"
            :cost="prices.eco.vidutiniska.cost"
            :wholesale="prices.eco.vidutiniska.priceWholesale"
            :retail="prices.eco.vidutiniska.priceRetail"
            @cost="(value) => (prices.eco.vidutiniska.cost = +value)"
            @wholesale="(value) => (prices.eco.vidutiniska.priceWholesale = +value)"
            @retail="(value) => (prices.eco.vidutiniska.priceRetail = +value)"
          />
          <FencesElementBlock
            name="Pramatoma"
            :editable="editable"
            :cost="prices.eco.pramatoma.cost"
            :wholesale="prices.eco.pramatoma.priceWholesale"
            :retail="prices.eco.pramatoma.priceRetail"
            @cost="(value) => (prices.eco.pramatoma.cost = +value)"
            @wholesale="(value) => (prices.eco.pramatoma.priceWholesale = +value)"
            @retail="(value) => (prices.eco.pramatoma.priceRetail = +value)"
          />
          <FencesElementBlock
            name="25% pramatomumas"
            :editable="editable"
            :cost="prices.eco.pramatoma25.cost"
            :wholesale="prices.eco.pramatoma25.priceWholesale"
            :retail="prices.eco.pramatoma25.priceRetail"
            @cost="(value) => (prices.eco.pramatoma25.cost = +value)"
            @wholesale="(value) => (prices.eco.pramatoma25.priceWholesale = +value)"
            @retail="(value) => (prices.eco.pramatoma25.priceRetail = +value)"
          />
          <FencesElementBlock
            name="50% pramatomumas"
            :editable="editable"
            :cost="prices.eco.pramatoma50.cost"
            :wholesale="prices.eco.pramatoma50.priceWholesale"
            :retail="prices.eco.pramatoma50.priceRetail"
            @cost="(value) => (prices.eco.pramatoma50.cost = +value)"
            @wholesale="(value) => (prices.eco.pramatoma50.priceWholesale = +value)"
            @retail="(value) => (prices.eco.pramatoma50.priceRetail = +value)"
          />
        </div>
      </SettingsFenceElementWraper>

      <SettingsFenceElementWraper name="Papildoma informacija">
        <div class="flex gap-4 items-center">
          <div class="text-xl font font-semibold">Rodyti tinklapyje</div>
          <BaseCheckField
            :disabled="!editable"
            :name="'FenceAditionalShowCheckbox' + index"
            @onChange="(value: boolean) => (aditional.show = value)"
            :checked="aditional.show"
            height="h-4"
          />
        </div>
        <div>
          <label for="fenceDescription" class="text-lg font-semibold">Tvoros aprašymas</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.description"
            name="description"
            id="fenceDescription"
            class="border border-dark-light w-full h-40 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceDescriptionEn" class="text-lg font-semibold"
            >Tvoros aprašymas Anglų kalba</label
          >
          <textarea
            :disabled="!editable"
            v-model="aditional.descriptionEn"
            name="descriptionEn"
            id="fenceDescriptionEn"
            class="border border-dark-light w-full h-40 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoTitle" class="text-lg font-semibold">Seo pavadinimas</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.seoTitle"
            name="seoTitle"
            id="fenceSeoTitle"
            class="border border-dark-light w-full h-12 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoTitleEn" class="text-lg font-semibold"
            >Seo Pavadinimas Anglų kalba</label
          >
          <textarea
            :disabled="!editable"
            v-model="aditional.seoTitleEn"
            name="seoTitleEn"
            id="fenceSeoTitleEn"
            class="border border-dark-light w-full h-12 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoDescription" class="text-lg font-semibold">Seo aprašymas</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.seoDescription"
            name="seoDescription"
            id="fenceSeoDescription"
            class="border border-dark-light w-full h-20 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoDescriptionEn" class="text-lg font-semibold"
            >Seo aprašymas Anglų kalba</label
          >
          <textarea
            :disabled="!editable"
            v-model="aditional.seoDescriptionEn"
            name="seoDescriptionEn"
            id="fenceSeoDescriptionEn"
            class="border border-dark-light w-full h-20 p-2 rounded-md"
          />
        </div>
        <div class="flex flex-col gap-4">
          <BaseButton @click="addImage" :disabled="!editable">Pridėti nuotrauką</BaseButton>

          <div v-for="(image, index) in aditional.images" :key="index" class="flex gap-4">
            <BaseInput
              :disable="!editable"
              label="Nuotraukos pavadinimas"
              :name="image.name"
              @onChange="(value: string) => (aditional.images[index].name = value)"
            />
            <BaseInput
              :disable="!editable"
              label="Nuotraukos URL"
              :name="image.url"
              width="flex-1"
              @onChange="(value: string) => (aditional.images[index].url = value)"
            />
            <BaseInput
              :disable="!editable"
              label="Nuotraukos aprašymas"
              :name="image.alt"
              width="flex-1"
              @onChange="(value: string) => (aditional.images[index].alt = value)"
            />
            <BaseInput
              :disable="!editable"
              label="Nuotraukos aprašymas EN"
              :name="image.altEN"
              width="flex-1"
              @onChange="(value: string) => (aditional.images[index].altEN = value)"
            />
          </div>
        </div>
      </SettingsFenceElementWraper>
    </div>
  </div>
</template>

<style scoped></style>

<style scoped></style>
