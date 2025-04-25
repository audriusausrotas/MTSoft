<script setup lang="ts">
import { productsStore } from "~/store/products";
import { categories } from "~/data/selectFieldData";

const productsStore = useProductsStore();
const open = ref<boolean>(false);
const newName = ref<string>("");
const newPrice = ref<number>(0);
const newCost = ref<number>(0);
const isLoading = ref<boolean>(false);
const newCategory = ref<string>(categories[0]);
const { setError, setIsError } = useError();

const saveHandler = async (): Promise<void> => {
  isLoading.value = true;
  if (newName.value.trim() === "") return;

  const requestData = {
    name: newName.value,
    price: newPrice.value,
    cost: newCost.value,
    category: newCategory.value,
  };

  const response: any = await request.post("newProduct", requestData);

  if (response.success) {
    !useSocketStore().connected && productsStore.newProduct(response.data);
    clearHandler();
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const clearHandler = (): void => {
  newName.value = "";
  newPrice.value = 0;
  newCost.value = 0;
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
    <div v-if="open" class="flex items-end gap-2">
      <BaseInput
        :name="newName"
        width="w-full"
        variant="light"
        class="flex-1"
        label="Pavadinimas"
        @onChange="(v) => (newName = v)"
      />
      <BaseInput
        :name="newPrice"
        width="w-24"
        type="number"
        label="Kaina"
        variant="light"
        @onChange="(v) => (newPrice = v)"
      />
      <BaseInput
        :name="newCost"
        width="w-24"
        type="number"
        label="Savikaina"
        variant="light"
        @onChange="(v) => (newCost = v)"
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
