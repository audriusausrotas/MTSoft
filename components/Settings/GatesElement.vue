<script setup lang="ts">
import { calculateProductPrice } from "~/utils/calculations/calculateProductPrice";

const props = defineProps(["data"]);

const editable = ref<boolean>(false);
const prices = reactive({
  cost: {
    frame: props.data.prices.cost.frame,
    automation: props.data.prices.cost.automation,
    installation: props.data.prices.cost.installation,
  },
  priceRetail: {
    frame: props.data.prices.priceRetail.frame,
    automation: props.data.prices.priceRetail.automation,
    installation: props.data.prices.priceRetail.installation,
  },
  priceWholesale: {
    frame: props.data.prices.priceWholesale.frame,
    automation: props.data.prices.priceWholesale.automation,
    installation: props.data.prices.priceWholesale.installation,
  },
});

const smallGatePrices = {
  cost: {
    frame: props.data.prices.cost.frame,
    inox: props.data.prices.cost.inox,
    locinox: props.data.prices.cost.locinox,
    iseo_el: props.data.prices.cost.iseo_el,
    locinox_el: props.data.prices.cost.locinox_el,
    installation: props.data.prices.cost.installation,
  },
  priceRetail: {
    frame: props.data.prices.priceRetail.frame,
    inox: props.data.prices.priceRetail.inox,
    locinox: props.data.prices.priceRetail.locinox,
    iseo_el: props.data.prices.priceRetail.iseo_el,
    locinox_el: props.data.prices.priceRetail.locinox_el,
    installation: props.data.prices.priceRetail.installation,
  },
  priceWholesale: {
    frame: props.data.prices.priceWholesale.frame,
    inox: props.data.prices.priceWholesale.inox,
    locinox: props.data.prices.priceWholesale.locinox,
    iseo_el: props.data.prices.priceWholesale.iseo_el,
    locinox_el: props.data.prices.priceWholesale.locinox_el,
    installation: props.data.prices.priceWholesale.installation,
  },
};

const profit = reactive({
  retail: props.data?.profit?.retail || 0,
  wholesale: props.data?.profit?.wholesale || 0,
});

const saveHandler = () => {
  // Save logic here
  editable.value = false;
};

const calculateHandler = () => {
  if (
    !prices.cost.automation ||
    !prices.cost.frame ||
    !prices.cost.installation
  )
    return;

  prices.priceWholesale.frame = calculateProductPrice(
    prices.cost.frame,
    profit.wholesale
  );
  prices.priceWholesale.automation = calculateProductPrice(
    prices.cost.automation,
    profit.wholesale
  );
  prices.priceWholesale.installation = calculateProductPrice(
    prices.cost.installation,
    profit.wholesale
  );
  prices.priceRetail.frame = calculateProductPrice(
    prices.cost.frame,
    profit.retail
  );
  prices.priceRetail.automation = calculateProductPrice(
    prices.cost.automation,
    profit.retail
  );
  prices.priceRetail.installation = calculateProductPrice(
    prices.cost.installation,
    profit.retail
  );
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center gap-4 text-2xl font-semibold text-gray-800">
      <div>
        {{ props.data.name }}
      </div>

      <div class="hover:cursor-pointer hover:scale-125 transition-transform">
        <NuxtImg
          v-if="!editable"
          @click="editable = true"
          src="/icons/edit.svg"
          width="20"
          height="20"
          decoding="auto"
          :ismap="true"
          loading="lazy"
        />
        <NuxtImg
          v-else
          @click="saveHandler"
          src="/icons/save.svg"
          width="20"
          height="20"
          decoding="auto"
          :ismap="true"
          loading="lazy"
        />
      </div>
    </div>

    <div
      v-if="editable"
      class="grid grid-cols-[repeat(4,_200px)] border border-gray-300 divide-x divide-gray-300 rounded-lg overflow-hidden my-2"
    >
      <div class="px-4 py-2 font-medium bg-gray-200 border border-gray-300">
        Maržos skaičiuoklė
      </div>
      <div class="flex px-4 py-2">
        <input
          type="text"
          class="w-full text-center"
          v-model.number="profit.wholesale"
          placeholder="Didmenos %"
        />
      </div>

      <div class="flex px-4 py-2">
        <input
          type="text"
          class="w-full text-center"
          v-model.number="profit.retail"
          placeholder="Mažmenos %"
        />
      </div>

      <button @click="calculateHandler" class="px-4 py-2 bg-black text-white">
        Skaičiuoti
      </button>
    </div>

    <div
      class="grid border rounded-lg overflow-hidden border-gray-300"
      :class="
        data.category === 'varteliai'
          ? 'grid-cols-[repeat(7,_114.3px)]'
          : 'grid-cols-[repeat(4,_200px)]'
      "
    >
      <!-- pavadinimai -->
      <div
        class="px-4 py-2 font-medium bg-gray-200 border border-gray-300 rounded-tl-lg"
      >
        Tipas
      </div>
      <div
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Rėmas
      </div>
      <div
        v-if="data.category !== 'varteliai'"
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Automatika
      </div>
      <div
        v-if="data.category === 'varteliai'"
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Inox
      </div>
      <div
        v-if="data.category === 'varteliai'"
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Locinox
      </div>
      <div
        v-if="data.category === 'varteliai'"
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Iseo el.
      </div>
      <div
        v-if="data.category === 'varteliai'"
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Locinox el.
      </div>
      <div
        class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300"
      >
        Montavimas
      </div>

      <!-- savikaina -->

      <div class="px-4 py-2 font-medium border border-gray-300 bg-stone-100">
        Savikaina
      </div>
      <div
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.cost.frame"
        />
      </div>
      <div
        v-if="props.data.category !== 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.cost.automation"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.cost.inox"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.cost.locinox"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.cost.iseo_el"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.cost.locinox_el"
        />
      </div>
      <div
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.cost.installation"
        />
      </div>

      <!-- didmena -->

      <div class="px-4 py-2 font-medium border border-gray-300 bg-stone-100">
        Didmena
      </div>
      <div
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceWholesale.frame"
        />
      </div>
      <div
        v-if="props.data.category !== 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceWholesale.automation"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceWholesale.inox"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceWholesale.locinox"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceWholesale.iseo_el"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceWholesale.locinox_el"
        />
      </div>
      <div
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceWholesale.installation"
        />
      </div>

      <!-- mazmena -->

      <div
        class="px-4 py-2 font-medium border border-gray-300 bg-stone-100 rounded-bl-lg"
      >
        Mažmena
      </div>
      <div
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceRetail.frame"
        />
      </div>
      <div
        v-if="props.data.category !== 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceRetail.automation"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceRetail.inox"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceRetail.locinox"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceRetail.iseo_el"
        />
      </div>
      <div
        v-if="props.data.category === 'varteliai'"
        class="flex border border-gray-300"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="smallGatePrices.priceRetail.locinox_el"
        />
      </div>
      <div
        class="flex border border-gray-300 rounded-bl-lg"
        :class="editable ? '' : 'bg-stone-100'"
      >
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceRetail.installation"
        />
      </div>
    </div>
  </div>
</template>
