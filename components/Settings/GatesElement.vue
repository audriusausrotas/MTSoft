<script setup lang="ts">
import { calculateProductPrice } from "~/utils/calculations/calculateProductPrice";

const props = defineProps(["data"]);

const { setError, setSuccess } = useCustomError();
const settingsStore = useSettingsStore();

const editable = ref<boolean>(false);
const prices = reactive({
  cost: {
    frame: props.data.prices.cost.frame,
    automation: props.data.prices.cost.automation,
    installation: props.data.prices.cost.installation,
    inox: props.data.prices.cost.inox,
    locinox: props.data.prices.cost.locinox,
    iseo_el: props.data.prices.cost.iseo_el,
    locinox_el: props.data.prices.cost.locinox_el,
  },
  priceRetail: {
    frame: props.data.prices.priceRetail.frame,
    automation: props.data.prices.priceRetail.automation,
    installation: props.data.prices.priceRetail.installation,
    inox: props.data.prices.cost.inox,
    locinox: props.data.prices.cost.locinox,
    iseo_el: props.data.prices.cost.iseo_el,
    locinox_el: props.data.prices.cost.locinox_el,
  },
  priceWholesale: {
    frame: props.data.prices.priceWholesale.frame,
    automation: props.data.prices.priceWholesale.automation,
    installation: props.data.prices.priceWholesale.installation,
    inox: props.data.prices.cost.inox,
    locinox: props.data.prices.cost.locinox,
    iseo_el: props.data.prices.cost.iseo_el,
    locinox_el: props.data.prices.cost.locinox_el,
  },
});

const profit = reactive({
  retail: props.data?.profit?.retail || 0,
  wholesale: props.data?.profit?.wholesale || 0,
});

const saveHandler = async () => {
  const requestData = {
    _id: props.data._id,
    name: props.data.name,
    length: props.data.length,
    category: props.data.category,
    profit: {
      retail: profit.retail,
      wholesale: profit.wholesale,
    },
    prices: {
      cost: {
        frame: prices.cost.frame,
        automation: prices.cost.automation,
        installation: prices.cost.installation,
        inox: prices.cost.inox,
        locinox: prices.cost.locinox,
        iseo_el: prices.cost.iseo_el,
        locinox_el: prices.cost.locinox_el,
      },
      priceRetail: {
        frame: prices.priceRetail.frame,
        automation: prices.priceRetail.automation,
        installation: prices.priceRetail.installation,
        inox: prices.priceRetail.inox,
        locinox: prices.priceRetail.locinox,
        iseo_el: prices.priceRetail.iseo_el,
        locinox_el: prices.priceRetail.locinox_el,
      },
      priceWholesale: {
        frame: prices.priceWholesale.frame,
        automation: prices.priceWholesale.automation,
        installation: prices.priceWholesale.installation,
        inox: prices.priceWholesale.inox,
        locinox: prices.priceWholesale.locinox,
        iseo_el: prices.priceWholesale.iseo_el,
        locinox_el: prices.priceWholesale.locinox_el,
      },
    },
  };

  const response: any = await request.patch("/updateGateData", requestData);
  if (response.success) {
    !useSocketStore().connected && settingsStore.updateGateData(response.data);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }

  editable.value = false;
};

const calculateHandler = () => {
  prices.priceWholesale.frame = calculateProductPrice(prices.cost.frame, profit.wholesale);
  prices.priceWholesale.automation = calculateProductPrice(
    prices.cost.automation,
    profit.wholesale,
  );
  prices.priceWholesale.installation = calculateProductPrice(
    prices.cost.installation,
    profit.wholesale,
  );
  prices.priceWholesale.inox = calculateProductPrice(prices.cost.inox, profit.wholesale);

  prices.priceWholesale.locinox = calculateProductPrice(prices.cost.locinox, profit.wholesale);
  prices.priceWholesale.iseo_el = calculateProductPrice(prices.cost.iseo_el, profit.wholesale);
  prices.priceWholesale.locinox_el = calculateProductPrice(
    prices.cost.locinox_el,
    profit.wholesale,
  );

  prices.priceRetail.frame = calculateProductPrice(prices.cost.frame, profit.retail);
  prices.priceRetail.automation = calculateProductPrice(prices.cost.automation, profit.retail);
  prices.priceRetail.installation = calculateProductPrice(prices.cost.installation, profit.retail);
  prices.priceRetail.inox = calculateProductPrice(prices.cost.inox, profit.retail);
  prices.priceRetail.locinox = calculateProductPrice(prices.cost.locinox, profit.retail);
  prices.priceRetail.iseo_el = calculateProductPrice(prices.cost.iseo_el, profit.retail);
  prices.priceRetail.locinox_el = calculateProductPrice(prices.cost.locinox_el, profit.wholesale);
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
      <div class="px-4 py-2 font-medium bg-gray-200 border border-gray-300">Maržos skaičiuoklė</div>
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

      <button @click="calculateHandler" class="px-4 py-2 bg-black text-white">Skaičiuoti</button>
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
      <div class="px-4 py-2 font-medium bg-gray-200 border border-gray-300 rounded-tl-lg">
        Tipas
      </div>
      <div class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300">Rėmas</div>
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
      <div class="px-4 py-2 font-medium bg-gray-200 text-center border border-gray-300">
        Montavimas
      </div>

      <!-- savikaina -->

      <div class="px-4 py-2 font-medium border border-gray-300 bg-stone-100">Savikaina</div>
      <div class="flex border border-gray-300" :class="editable ? '' : 'bg-stone-100'">
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
          v-model.number="prices.cost.inox"
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
          v-model.number="prices.cost.locinox"
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
          v-model.number="prices.cost.iseo_el"
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
          v-model.number="prices.cost.locinox_el"
        />
      </div>
      <div class="flex border border-gray-300" :class="editable ? '' : 'bg-stone-100'">
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.cost.installation"
        />
      </div>

      <!-- didmena -->

      <div class="px-4 py-2 font-medium border border-gray-300 bg-stone-100">Didmena</div>
      <div class="flex border border-gray-300" :class="editable ? '' : 'bg-stone-100'">
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
          v-model.number="prices.priceWholesale.inox"
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
          v-model.number="prices.priceWholesale.locinox"
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
          v-model.number="prices.priceWholesale.iseo_el"
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
          v-model.number="prices.priceWholesale.locinox_el"
        />
      </div>
      <div class="flex border border-gray-300" :class="editable ? '' : 'bg-stone-100'">
        <input
          type="text"
          class="w-full text-center"
          :disabled="!editable"
          v-model.number="prices.priceWholesale.installation"
        />
      </div>

      <!-- mazmena -->

      <div class="px-4 py-2 font-medium border border-gray-300 bg-stone-100 rounded-bl-lg">
        Mažmena
      </div>
      <div class="flex border border-gray-300" :class="editable ? '' : 'bg-stone-100'">
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
          v-model.number="prices.priceRetail.inox"
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
          v-model.number="prices.priceRetail.locinox"
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
          v-model.number="prices.priceRetail.iseo_el"
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
          v-model.number="prices.priceRetail.locinox_el"
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
