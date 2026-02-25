<script setup lang="ts">
import { calculateProductPrice } from "~/utils/calculations/calculateProductPrice";
import { categories } from "~/data/selectFieldData";

const productsStore = useProductsStore();
const { setError, setSuccess } = useCustomError();

const open = ref<boolean>(false);

const name = ref<string>("");
const isLoading = ref<boolean>(false);
const newCategory = ref<string>("Kita");

const prices = reactive({
  priceRetail: 0,
  priceWholesale: 0,
  cost: 0,
});

const profit = reactive({
  retail: 0,
  wholesale: 0,
});

const saveHandler = async (): Promise<void> => {
  isLoading.value = true;
  if (name.value.trim() === "") return;

  const requestData = {
    name: name.value,
    category: newCategory.value,
    prices: { ...prices },
    profit: { ...profit },
  };

  const response: any = await request.post("newProduct", requestData);

  if (response.success) {
    !useSocketStore().connected && productsStore.newProduct(response.data);
    clearHandler();

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const calculateHandler = () => {
  if (!prices.cost || !profit.retail || !profit.wholesale) return;

  prices.priceRetail = calculateProductPrice(prices.cost, profit.retail);
  prices.priceWholesale = calculateProductPrice(prices.cost, profit.wholesale);
};

const clearHandler = (): void => {
  name.value = "";
  prices.priceRetail = 0;
  prices.priceWholesale = 0;
  prices.cost = 0;
  newCategory.value = categories[0];
  open.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseButton v-if="!open" name="pridėti naują" @click="open = true" />
    <div v-else class="flex gap-4">
      <BaseButton name="išsaugoti" @click="saveHandler" :isLoading="isLoading" />
      <BaseButton name="atšaukti" @click="clearHandler" />
    </div>
    <div v-if="open" class="grid grid-cols-[auto_150px_150px_150px_250px] gap-4">
      <BaseInput
        :name="name"
        width="w-full"
        variant="light"
        label="Pavadinimas"
        @onChange="(v) => (name = v)"
      />
      <BaseInput
        :name="prices.cost"
        width="w-full"
        type="number"
        label="Savikaina"
        variant="light"
        @onChange="(v) => (prices.cost = v)"
      />
      <BaseInput
        :name="prices.priceWholesale"
        width="w-full"
        type="number"
        label="Didmena"
        variant="light"
        @onChange="(v) => (prices.priceWholesale = v)"
      />
      <BaseInput
        :name="prices.priceRetail"
        width="w-full"
        type="number"
        label="mažmena"
        variant="light"
        @onChange="(v) => (prices.priceRetail = v)"
      />
      <BaseSelectField
        label="Kategorija"
        :values="categories"
        variant="light"
        id="categories"
        :defaultValue="newCategory"
        width="w-full"
        @onChange="(v) => (newCategory = v)"
      />
    </div>
    <div v-if="open" class="grid grid-cols-[auto_150px_150px_150px_250px] gap-4">
      <BaseInfoField name="Pelno skaičiavimas pagal maržą %" width="w-full" />

      <BaseInput
        class="col-start-3"
        width="w-full"
        variant="light"
        type="number"
        placeholder="Marža %"
        @onChange="(value) => (profit.wholesale = value)"
      />
      <BaseInput
        width="w-full"
        variant="light"
        type="number"
        placeholder="Marža %"
        @onChange="(value) => (profit.retail = value)"
      />
      <BaseButton name="Skaičiuoti" width="w-full" @click="calculateHandler" />
    </div>
  </div>
</template>
