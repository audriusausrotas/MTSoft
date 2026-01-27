<script setup lang="ts">
import { fenceTypes, fenceDirection } from "~/data/selectFieldData";
import FencesElementBlock from "./FencesElementBlock.vue";
import { calculateFencePrice } from "@/utils/calculations/calculateFencePrice";
import { calculateProductPrice } from "@/utils/calculations/calculateProductPrice";
import type { Product } from "~/data/interfaces";
const props = defineProps(["fence"]);

const { setError, setSuccess } = useCustomError();
const settingsStore = useSettingsStore();

const editable = ref<boolean>(false);

const profit = reactive({
  premiumRetail: props.fence?.profit?.premiumRetail || 0,
  premiumWholesale: props.fence?.profit?.premiumWholesale || 0,
  ecoRetail: props.fence?.profit?.ecoRetail || 0,
  ecoWholesale: props.fence?.profit?.ecoWholesale || 0,
});

const fenceDetails = reactive({
  name: props.fence.name,
  height: props.fence?.details?.height,
  width: props.fence?.details?.width,
  bends: props.fence?.details?.bends,
  holes: props.fence?.details?.holes,
  category: props.fence?.category,
  defaultDirection: props.fence?.defaultDirection,
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
});

const pricesPremium = reactive({
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
});

const pricesEco = reactive({
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
});

const saveHandler = async () => {
  const requestData = {
    _id: props.fence._id,
    name: fenceDetails.name,
    category: fenceDetails.category,
    defaultDirection: fenceDetails.defaultDirection,
    profit: {
      premiumRetail: profit.premiumRetail,
      premiumWholesale: profit.premiumWholesale,
      ecoRetail: profit.ecoRetail,
      ecoWholesale: profit.ecoWholesale,
    },
    details: {
      height: +fenceDetails.height,
      width: +fenceDetails.width,
      bends: +fenceDetails.bends,
      holes: +fenceDetails.holes,
    },
    steps: {
      aklina: +steps.aklina,
      nepramatoma: +steps.nepramatoma,
      vidutiniska: +steps.vidutiniska,
      pramatoma: +steps.pramatoma,
      pramatoma25: +steps.pramatoma25,
      pramatoma50: +steps.pramatoma50,
    },
    prices: {
      cost: +prices.cost,
      priceRetail: +prices.priceRetail,
      priceWholesale: +prices.priceWholesale,
      premium: {
        meter: {
          cost: +pricesPremium.meter.cost,
          priceRetail: +pricesPremium.meter.priceRetail,
          priceWholesale: +pricesPremium.meter.priceWholesale,
        },
        aklina: {
          cost: +pricesPremium.aklina.cost,
          priceRetail: +pricesPremium.aklina.priceRetail,
          priceWholesale: +pricesPremium.aklina.priceWholesale,
        },
        nepramatoma: {
          cost: +pricesPremium.nepramatoma.cost,
          priceRetail: +pricesPremium.nepramatoma.priceRetail,
          priceWholesale: +pricesPremium.nepramatoma.priceWholesale,
        },
        vidutiniska: {
          cost: +pricesPremium.vidutiniska.cost,
          priceRetail: +pricesPremium.vidutiniska.priceRetail,
          priceWholesale: +pricesPremium.vidutiniska.priceWholesale,
        },
        pramatoma: {
          cost: +pricesPremium.pramatoma.cost,
          priceRetail: +pricesPremium.pramatoma.priceRetail,
          priceWholesale: +pricesPremium.pramatoma.priceWholesale,
        },
        pramatoma25: {
          cost: +pricesPremium.pramatoma25.cost,
          priceRetail: +pricesPremium.pramatoma25.priceRetail,
          priceWholesale: +pricesPremium.pramatoma25.priceWholesale,
        },
        pramatoma50: {
          cost: +pricesPremium.pramatoma50.cost,
          priceRetail: +pricesPremium.pramatoma50.priceRetail,
          priceWholesale: +pricesPremium.pramatoma50.priceWholesale,
        },
      },
      eco: {
        meter: {
          cost: +pricesEco.meter.cost,
          priceRetail: +pricesEco.meter.priceRetail,
          priceWholesale: +pricesEco.meter.priceWholesale,
        },
        aklina: {
          cost: +pricesEco.aklina.cost,
          priceRetail: +pricesEco.aklina.priceRetail,
          priceWholesale: +pricesEco.aklina.priceWholesale,
        },
        nepramatoma: {
          cost: +pricesEco.nepramatoma.cost,
          priceRetail: +pricesEco.nepramatoma.priceRetail,
          priceWholesale: +pricesEco.nepramatoma.priceWholesale,
        },
        vidutiniska: {
          cost: +pricesEco.vidutiniska.cost,
          priceRetail: +pricesEco.vidutiniska.priceRetail,
          priceWholesale: +pricesEco.vidutiniska.priceWholesale,
        },
        pramatoma: {
          cost: +pricesEco.pramatoma.cost,
          priceRetail: +pricesEco.pramatoma.priceRetail,
          priceWholesale: +pricesEco.pramatoma.priceWholesale,
        },
        pramatoma25: {
          cost: +pricesEco.pramatoma25.cost,
          priceRetail: +pricesEco.pramatoma25.priceRetail,
          priceWholesale: +pricesEco.pramatoma25.priceWholesale,
        },
        pramatoma50: {
          cost: +pricesEco.pramatoma50.cost,
          priceRetail: +pricesEco.pramatoma50.priceRetail,
          priceWholesale: +pricesEco.pramatoma50.priceWholesale,
        },
      },
    },
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
  if (props.fence?.category === "Tvora") {
    if (!pricesPremium.meter.cost || !pricesEco.meter.cost) return;

    const legNamePremium = settingsStore.defaultValues.retailDoubleLeg;
    const legNameEco = settingsStore.defaultValues.retailDoubleLegEco;
    const legPricePremium: Product | undefined = useProductsStore().products.find(
      (item) => item.name === legNamePremium,
    );
    const legPriceEco: Product | undefined = useProductsStore().products.find(
      (item) => item.name === legNameEco,
    );

    if (!legPricePremium || !legPriceEco) return;

    pricesPremium.meter.priceRetail = (
      pricesPremium.meter.cost /
      ((100 - profit.premiumRetail) / 100)
    ).toFixed(2);

    pricesPremium.meter.priceWholesale = (
      pricesPremium.meter.cost /
      ((100 - profit.premiumWholesale) / 100)
    ).toFixed(2);

    pricesEco.meter.priceRetail = (pricesEco.meter.cost / ((100 - profit.ecoRetail) / 100)).toFixed(
      2,
    );

    pricesEco.meter.priceWholesale = (
      pricesEco.meter.cost /
      ((100 - profit.ecoWholesale) / 100)
    ).toFixed(2);

    //cost
    pricesPremium.aklina.cost = calculateFencePrice(
      steps.aklina,
      pricesPremium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    pricesPremium.nepramatoma.cost = calculateFencePrice(
      steps.nepramatoma,
      pricesPremium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    pricesPremium.vidutiniska.cost = calculateFencePrice(
      steps.vidutiniska,
      pricesPremium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    pricesPremium.pramatoma.cost = calculateFencePrice(
      steps.pramatoma,
      pricesPremium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    pricesPremium.pramatoma25.cost = calculateFencePrice(
      steps.pramatoma25,
      pricesPremium.meter.cost,
      legPricePremium?.prices?.cost,
    );
    pricesPremium.pramatoma50.cost = calculateFencePrice(
      steps.pramatoma50,
      pricesPremium.meter.cost,
      legPricePremium?.prices?.cost,
    );

    // wholesale
    pricesPremium.aklina.priceWholesale = calculateFencePrice(
      steps.aklina,
      pricesPremium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    pricesPremium.nepramatoma.priceWholesale = calculateFencePrice(
      steps.nepramatoma,
      pricesPremium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    pricesPremium.vidutiniska.priceWholesale = calculateFencePrice(
      steps.vidutiniska,
      pricesPremium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    pricesPremium.pramatoma.priceWholesale = calculateFencePrice(
      steps.pramatoma,
      pricesPremium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    pricesPremium.pramatoma25.priceWholesale = calculateFencePrice(
      steps.pramatoma25,
      pricesPremium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    pricesPremium.pramatoma50.priceWholesale = calculateFencePrice(
      steps.pramatoma50,
      pricesPremium.meter.priceWholesale,
      legPricePremium?.prices?.priceWholesale,
    );
    // Retail
    pricesPremium.aklina.priceRetail = calculateFencePrice(
      steps.aklina,
      pricesPremium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    pricesPremium.nepramatoma.priceRetail = calculateFencePrice(
      steps.nepramatoma,
      pricesPremium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    pricesPremium.vidutiniska.priceRetail = calculateFencePrice(
      steps.vidutiniska,
      pricesPremium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    pricesPremium.pramatoma.priceRetail = calculateFencePrice(
      steps.pramatoma,
      pricesPremium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    pricesPremium.pramatoma25.priceRetail = calculateFencePrice(
      steps.pramatoma25,
      pricesPremium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );
    pricesPremium.pramatoma50.priceRetail = calculateFencePrice(
      steps.pramatoma50,
      pricesPremium.meter.priceRetail,
      legPricePremium?.prices?.priceRetail,
    );

    //// eco
    //cost
    pricesEco.aklina.cost = calculateFencePrice(
      steps.aklina,
      pricesEco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    pricesEco.nepramatoma.cost = calculateFencePrice(
      steps.nepramatoma,
      pricesEco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    pricesEco.vidutiniska.cost = calculateFencePrice(
      steps.vidutiniska,
      pricesEco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    pricesEco.pramatoma.cost = calculateFencePrice(
      steps.pramatoma,
      pricesEco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    pricesEco.pramatoma25.cost = calculateFencePrice(
      steps.pramatoma25,
      pricesEco.meter.cost,
      legPriceEco?.prices?.cost,
    );
    pricesEco.pramatoma50.cost = calculateFencePrice(
      steps.pramatoma50,
      pricesEco.meter.cost,
      legPriceEco?.prices?.cost,
    );

    // wholesale
    pricesEco.aklina.priceWholesale = calculateFencePrice(
      steps.aklina,
      pricesEco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    pricesEco.nepramatoma.priceWholesale = calculateFencePrice(
      steps.nepramatoma,
      pricesEco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    pricesEco.vidutiniska.priceWholesale = calculateFencePrice(
      steps.vidutiniska,
      pricesEco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    pricesEco.pramatoma.priceWholesale = calculateFencePrice(
      steps.pramatoma,
      pricesEco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    pricesEco.pramatoma25.priceWholesale = calculateFencePrice(
      steps.pramatoma25,
      pricesEco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    pricesEco.pramatoma50.priceWholesale = calculateFencePrice(
      steps.pramatoma50,
      pricesEco.meter.priceWholesale,
      legPriceEco?.prices?.priceWholesale,
    );
    // Retail
    pricesEco.aklina.priceRetail = calculateFencePrice(
      steps.aklina,
      pricesEco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    pricesEco.nepramatoma.priceRetail = calculateFencePrice(
      steps.nepramatoma,
      pricesEco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    pricesEco.vidutiniska.priceRetail = calculateFencePrice(
      steps.vidutiniska,
      pricesEco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    pricesEco.pramatoma.priceRetail = calculateFencePrice(
      steps.pramatoma,
      pricesEco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    pricesEco.pramatoma25.priceRetail = calculateFencePrice(
      steps.pramatoma25,
      pricesEco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
    pricesEco.pramatoma50.priceRetail = calculateFencePrice(
      steps.pramatoma50,
      pricesEco.meter.priceRetail,
      legPriceEco?.prices?.priceRetail,
    );
  } else {
    if (!prices.cost) return;
    prices.priceRetail = calculateProductPrice(prices.cost, profit.premiumRetail);

    prices.priceWholesale = (prices.cost / ((100 - profit.premiumWholesale) / 100)).toFixed(2);
  }
};
</script>

<template>
  <div
    class="flex flex-col gap-8 w-full items-center border border-dark-full p-8 rounded-xl relative"
  >
    <div class="flex flex-col gap-4 justify-center items-center">
      <div class="flex gap-4">
        <p class="font-bold text-xl">Lankstinio informacija</p>
        <NuxtImg
          v-if="editable"
          src="/icons/save.svg"
          width="22"
          height="22"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
          @click="saveHandler"
        />
        <NuxtImg
          v-else
          src="/icons/edit.svg"
          width="22"
          height="22"
          decoding="auto"
          :ismap="true"
          loading="lazy"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
          @click="editable = !editable"
        />
      </div>
      <div v-if="editable" class="flex flex-col gap-4 items-center w-full">
        <div class="flex gap-12 w-full border-t pt-4 justify-evenly border-gray-400"></div>
        <p class="font-semibold text-lg">Maržos skaičiavimui</p>

        <div class="flex gap-4 items-end">
          <BaseButton name="Skaičiuoti" @click="recalculateHandler" />

          <BaseInput
            :name="profit.premiumWholesale"
            placeholder="Didmenos %"
            :label="props.fence.category === 'Tvora' ? 'Didmena Premium' : 'Didmena'"
            type="number"
            width="w-40"
            @onChange="(value) => (profit.premiumWholesale = value)"
          />
          <BaseInput
            :name="profit.premiumRetail"
            placeholder="Mažmenos %"
            :label="props.fence.category === 'Tvora' ? 'Mažmena Premium' : 'Mažmena'"
            type="number"
            width="w-40"
            @onChange="(value) => (profit.premiumRetail = value)"
          />
          <BaseInput
            v-if="props.fence.category === 'Tvora'"
            :name="profit.ecoWholesale"
            placeholder="Didmenos %"
            label="Didmena Eco"
            type="number"
            width="w-40"
            @onChange="(value) => (profit.ecoWholesale = value)"
          />
          <BaseInput
            v-if="props.fence.category === 'Tvora'"
            :name="profit.ecoRetail"
            placeholder="Mažmenos %"
            label="Mažmena Eco"
            type="number"
            width="w-40"
            @onChange="(value) => (profit.ecoRetail = value)"
          />
        </div>
        <div class="flex gap-12 w-full border-t pt-4 justify-evenly border-gray-400"></div>
      </div>

      <div
        class="absolute top-2 right-2 hover:scale-125 transition-transform hover:cursor-pointer"
        @click="deleteHandler"
      >
        <NuxtImg
          src="/icons/delete.svg"
          width="20"
          height="20"
          decoding="auto"
          :ismap="true"
          loading="lazy"
        />
      </div>

      <div class="flex gap-4 items-center justify-center w-full">
        <BaseInput
          :name="fenceDetails.name"
          width="flex-1 min-w-60"
          label="Tvoros Pavadinimas"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          @onChange="(value) => (fenceDetails.name = value)"
        />

        <BaseSelectField
          label="Tvoros Tipas"
          :values="fenceTypes"
          :defaultValue="fenceDetails.category"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          width="w-40"
          @onChange="(value) => (fenceDetails.category = value)"
        />

        <BaseSelectField
          v-if="fenceDetails.category !== 'Segmentas'"
          label="Kryptis"
          :values="fenceDirection"
          :defaultValue="fenceDetails.defaultDirection"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          width="w-40"
          @onChange="(value) => (fenceDetails.defaultDirection = value)"
        />

        <BaseInput
          :name="fenceDetails?.height"
          label="aukštis"
          width="w-24"
          type="number"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          @onChange="(value) => (fenceDetails.height = value)"
        />

        <BaseInput
          :name="fenceDetails?.width"
          label="plotis"
          width="w-24"
          type="number"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          @onChange="(value) => (fenceDetails.width = value)"
        />

        <BaseInput
          v-if="fenceDetails.category === 'Tvora'"
          :name="fenceDetails?.bends"
          label="lenkimai"
          width="w-24"
          type="number"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          @onChange="(value) => (fenceDetails.bends = value)"
        />

        <BaseInput
          v-if="fenceDetails.category === 'Tvora'"
          :name="fenceDetails?.holes"
          label="Skyluės lankstinyje"
          width="w-36"
          type="number"
          :disable="!editable"
          :variant="editable ? 'light' : ''"
          @onChange="(value) => (fenceDetails.holes = value)"
        />
      </div>
    </div>

    <div class="flex gap-12 w-full border-t pt-4 justify-evenly border-gray-400">
      <div v-if="fenceDetails.category === 'Tvora'" class="flex flex-col gap-4 items-center">
        <p class="font-bold text-xl">Montavimo žingsnis</p>
        <div class="flex gap-4 items-center justify-center">
          <BaseInput
            :name="steps.aklina"
            label="Aklina"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.aklina = value)"
          />
          <BaseInput
            :name="steps.nepramatoma"
            label="Nepramatoma"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.nepramatoma = value)"
          />
          <BaseInput
            :name="steps.vidutiniska"
            label="Vidutiniška"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.vidutiniska = value)"
          />
          <BaseInput
            :name="steps.pramatoma"
            label="Pramatoma"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.pramatoma = value)"
          />
          <BaseInput
            :name="steps.pramatoma25"
            label="25%"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.pramatoma25 = value)"
          />
          <BaseInput
            :name="steps.pramatoma50"
            label="50%"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (steps.pramatoma50 = value)"
          />
        </div>
      </div>
      <div v-if="fenceDetails.category !== 'Tvora'" class="flex flex-col gap-4 items-center">
        <p class="font-bold text-xl">Kainos</p>
        <div class="flex gap-4 items-center justify-center">
          <BaseInput
            :name="prices.cost"
            label="Savikaina"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (prices.cost = value)"
          />
          <BaseInput
            :name="prices.priceWholesale"
            label="Didmena"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (prices.priceWholesale = value)"
          />
          <BaseInput
            :name="prices.priceRetail"
            label="Mažmena"
            width="w-24"
            type="number"
            :disable="!editable"
            :variant="editable ? 'light' : ''"
            @onChange="(value) => (prices.priceRetail = value)"
          />
        </div>
      </div>
    </div>

    <div
      v-if="fenceDetails.category === 'Tvora'"
      class="flex flex-col gap-4 items-center border-t pt-4 border-gray-400"
    >
      <p class="font-bold text-xl">Premium skardos kainos</p>
      <div class="flex gap-4">
        <FencesElementBlock
          name="Metras"
          :editable="editable"
          :cost="pricesPremium.meter.cost"
          :wholesale="pricesPremium.meter.priceWholesale"
          :retail="pricesPremium.meter.priceRetail"
          @cost="(value) => (pricesPremium.meter.cost = value)"
          @wholesale="(value) => (pricesPremium.meter.priceWholesale = value)"
          @retail="(value) => (pricesPremium.meter.priceRetail = value)"
        />
        <FencesElementBlock
          name="Aklina"
          :editable="editable"
          :cost="pricesPremium.aklina.cost"
          :wholesale="pricesPremium.aklina.priceWholesale"
          :retail="pricesPremium.aklina.priceRetail"
          @cost="(value) => (pricesPremium.aklina.cost = value)"
          @wholesale="(value) => (pricesPremium.aklina.priceWholesale = value)"
          @retail="(value) => (pricesPremium.aklina.priceRetail = value)"
        />
        <FencesElementBlock
          name="Nepramatoma"
          :editable="editable"
          :cost="pricesPremium.nepramatoma.cost"
          :wholesale="pricesPremium.nepramatoma.priceWholesale"
          :retail="pricesPremium.nepramatoma.priceRetail"
          @cost="(value) => (pricesPremium.nepramatoma.cost = value)"
          @wholesale="(value) => (pricesPremium.nepramatoma.priceWholesale = value)"
          @retail="(value) => (pricesPremium.nepramatoma.priceRetail = value)"
        />
        <FencesElementBlock
          name="Vidutiniska"
          :editable="editable"
          :cost="pricesPremium.vidutiniska.cost"
          :wholesale="pricesPremium.vidutiniska.priceWholesale"
          :retail="pricesPremium.vidutiniska.priceRetail"
          @cost="(value) => (pricesPremium.vidutiniska.cost = value)"
          @wholesale="(value) => (pricesPremium.vidutiniska.priceWholesale = value)"
          @retail="(value) => (pricesPremium.vidutiniska.priceRetail = value)"
        />
        <FencesElementBlock
          name="Pramatoma"
          :editable="editable"
          :cost="pricesPremium.pramatoma.cost"
          :wholesale="pricesPremium.pramatoma.priceWholesale"
          :retail="pricesPremium.pramatoma.priceRetail"
          @cost="(value) => (pricesPremium.pramatoma.cost = value)"
          @wholesale="(value) => (pricesPremium.pramatoma.priceWholesale = value)"
          @retail="(value) => (pricesPremium.pramatoma.priceRetail = value)"
        />
        <FencesElementBlock
          name="25% pramatomumas"
          :editable="editable"
          :cost="pricesPremium.pramatoma25.cost"
          :wholesale="pricesPremium.pramatoma25.priceWholesale"
          :retail="pricesPremium.pramatoma25.priceRetail"
          @cost="(value) => (pricesPremium.pramatoma25.cost = value)"
          @wholesale="(value) => (pricesPremium.pramatoma25.priceWholesale = value)"
          @retail="(value) => (pricesPremium.pramatoma25.priceRetail = value)"
        />
        <FencesElementBlock
          name="50% pramatomumas"
          :editable="editable"
          :cost="pricesPremium.pramatoma50.cost"
          :wholesale="pricesPremium.pramatoma50.priceWholesale"
          :retail="pricesPremium.pramatoma50.priceRetail"
          @cost="(value) => (pricesPremium.pramatoma50.cost = value)"
          @wholesale="(value) => (pricesPremium.pramatoma50.priceWholesale = value)"
          @retail="(value) => (pricesPremium.pramatoma50.priceRetail = value)"
        />
      </div>
    </div>

    <div
      v-if="fenceDetails.category === 'Tvora'"
      class="flex flex-col gap-4 items-center border-t pt-4 border-gray-400"
    >
      <p class="font-bold text-xl">Eco skardos kainos</p>
      <div class="flex gap-4">
        <FencesElementBlock
          name="Metras"
          :editable="editable"
          :cost="pricesEco.meter.cost"
          :wholesale="pricesEco.meter.priceWholesale"
          :retail="pricesEco.meter.priceRetail"
          @cost="(value) => (pricesEco.meter.cost = value)"
          @wholesale="(value) => (pricesEco.meter.priceWholesale = value)"
          @retail="(value) => (pricesEco.meter.priceRetail = value)"
        />
        <FencesElementBlock
          name="Aklina"
          :editable="editable"
          :cost="pricesEco.aklina.cost"
          :wholesale="pricesEco.aklina.priceWholesale"
          :retail="pricesEco.aklina.priceRetail"
          @cost="(value) => (pricesEco.aklina.cost = value)"
          @wholesale="(value) => (pricesEco.aklina.priceWholesale = value)"
          @retail="(value) => (pricesEco.aklina.priceRetail = value)"
        />
        <FencesElementBlock
          name="Nepramatoma"
          :editable="editable"
          :cost="pricesEco.nepramatoma.cost"
          :wholesale="pricesEco.nepramatoma.priceWholesale"
          :retail="pricesEco.nepramatoma.priceRetail"
          @cost="(value) => (pricesEco.nepramatoma.cost = value)"
          @wholesale="(value) => (pricesEco.nepramatoma.priceWholesale = value)"
          @retail="(value) => (pricesEco.nepramatoma.priceRetail = value)"
        />
        <FencesElementBlock
          name="Vidutiniska"
          :editable="editable"
          :cost="pricesEco.vidutiniska.cost"
          :wholesale="pricesEco.vidutiniska.priceWholesale"
          :retail="pricesEco.vidutiniska.priceRetail"
          @cost="(value) => (pricesEco.vidutiniska.cost = value)"
          @wholesale="(value) => (pricesEco.vidutiniska.priceWholesale = value)"
          @retail="(value) => (pricesEco.vidutiniska.priceRetail = value)"
        />
        <FencesElementBlock
          name="Pramatoma"
          :editable="editable"
          :cost="pricesEco.pramatoma.cost"
          :wholesale="pricesEco.pramatoma.priceWholesale"
          :retail="pricesEco.pramatoma.priceRetail"
          @cost="(value) => (pricesEco.pramatoma.cost = value)"
          @wholesale="(value) => (pricesEco.pramatoma.priceWholesale = value)"
          @retail="(value) => (pricesEco.pramatoma.priceRetail = value)"
        />
        <FencesElementBlock
          name="25% pramatomumas"
          :editable="editable"
          :cost="pricesEco.pramatoma25.cost"
          :wholesale="pricesEco.pramatoma25.priceWholesale"
          :retail="pricesEco.pramatoma25.priceRetail"
          @cost="(value) => (pricesEco.pramatoma25.cost = value)"
          @wholesale="(value) => (pricesEco.pramatoma25.priceWholesale = value)"
          @retail="(value) => (pricesEco.pramatoma25.priceRetail = value)"
        />
        <FencesElementBlock
          name="50% pramatomumas"
          :editable="editable"
          :cost="pricesEco.pramatoma50.cost"
          :wholesale="pricesEco.pramatoma50.priceWholesale"
          :retail="pricesEco.pramatoma50.priceRetail"
          @cost="(value) => (pricesEco.pramatoma50.cost = value)"
          @wholesale="(value) => (pricesEco.pramatoma50.priceWholesale = value)"
          @retail="(value) => (pricesEco.pramatoma50.priceRetail = value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
