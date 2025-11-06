<script setup lang="ts">
import { categories } from "~/data/selectFieldData";

const productsStore = useProductsStore();
const open = ref<boolean>(false);
const name = ref<string>("");
const priceRetail = ref<number>(0);
const priceWholesale = ref<number>(0);
const cost = ref<number>(0);
const isLoading = ref<boolean>(false);
const newCategory = ref<string>("Kita");
const { setError, setSuccess } = useError();

const saveHandler = async (): Promise<void> => {
  isLoading.value = true;
  if (name.value.trim() === "") return;

  const requestData = {
    name: name.value,
    priceRetail: priceRetail.value,
    priceWholesale: priceWholesale.value,
    cost: cost.value,
    category: newCategory.value,
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

const clearHandler = (): void => {
  name.value = "";
  priceRetail.value = 0;
  priceWholesale.value = 0;
  cost.value = 0;
  newCategory.value = categories[0];
  open.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseButton v-if="!open" name="pridėti naują" @click="open = true" />
    <div v-else class="flex gap-4">
      <BaseButton
        name="išsaugoti"
        @click="saveHandler"
        :isLoading="isLoading"
      />
      <BaseButton name="atšaukti" @click="clearHandler" />
    </div>
    <div v-if="open" class="flex items-end gap-2">
      <BaseInput
        :name="name"
        width="w-full"
        variant="light"
        class="flex-1"
        label="Pavadinimas"
        @onChange="(v) => (name = v)"
      />
      <BaseInput
        :name="cost"
        width="w-24"
        type="number"
        label="Savikaina"
        variant="light"
        @onChange="(v) => (cost = v)"
      />
      <BaseInput
        :name="priceWholesale"
        width="w-24"
        type="number"
        label="Didmena"
        variant="light"
        @onChange="(v) => (priceWholesale = v)"
      />
      <BaseInput
        :name="priceRetail"
        width="w-24"
        type="number"
        label="mažmena"
        variant="light"
        @onChange="(v) => (priceRetail = v)"
      />
      <BaseSelectField
        label="Kategorija"
        :values="categories"
        variant="light"
        id="categories"
        :defaultValue="newCategory"
        width="w-56"
        @onChange="(v) => (newCategory = v)"
      />
    </div>
  </div>
</template>
