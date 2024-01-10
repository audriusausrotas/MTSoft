<script setup lang="js">
import  {useProductsStore}  from '~/store/products';
import { categories } from '~/data/selectFieldData';

const useProducts = useProductsStore();
const open = ref(false);
const newName = ref("");
const newPrice = ref(0);
const newCost = ref(0);
const newCategory = ref(categories[0])

const saveHandler = async () => {
    if (newName.value.trim() === "") return;

    const newProduct = { name: newName.value, price: newPrice.value, cost: newCost.value, category: newCategory.value };

    const data = await $fetch("/api/product", {
        method: "post",
        body: newProduct,
    });

    if (data.success) {
        useProducts.newProduct(data.data);
        clearHandler();
    }
};

const clearHandler = () => {
    newName.value = "";
    newPrice.value = 0;
    newCost.value = 0;
    newCategory.value = 0;
    open.value = false;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseButton v-if="!open" name="pridėti naują" @click="open = true" />
    <div v-else class="flex gap-4">
      <BaseButton name="išsaugoti" @click="saveHandler" />
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
