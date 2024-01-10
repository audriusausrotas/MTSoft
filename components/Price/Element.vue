<script setup lang="js">
import { useProductsStore } from "~/store/products";
import { categories } from "~/data/selectFieldData";

const props = defineProps(["product", "index"]);
const useProducts = useProductsStore();

const disable = ref(true);
const productName = ref(props.product.name);
const productPrice = ref(props.product.price);
const productCost = ref(props.product.cost);
const productCategory = ref(props.product.category);

const editHandler = () => {
  disable.value = !disable.value;
};



const deleteHandler = async () => {
  const data = await $fetch("/api/product", {
    method: "delete",
    body: { _id: props.product._id }
  });
  if (data.success) {
    useProducts.deleteProduct(props.product._id);
  }
};

const saveHandler = async () => {
  if (props.product.cost === productCost.value && props.product.price === productPrice.value && props.product.name === props.productName.value && productCategory.value === props.product.category) return disable.value = true;

  const newData = { _id: props.product._id, name: productName.value, price: productPrice.value, cost: productCost.value, category: productCategory.value };

  const data = await $fetch("/api/product", {
    method: "patch",
    body: newData
  });

  if (data.success) {
    useProducts.updateProduct(data.data);
    disable.value = true;
  }
};
</script>

<template>
  <td class="p-2">{{ props.index + 1 }}</td>
  <td class="p-2">
    <BaseInput :name="productName" width="w-auto" :disable="disable" :variant="disable ? '' : 'light'"
      @onChange="(v) => (productName = v)" />
  </td>
  <td class="p-2">
    <BaseInput :name="productPrice || 0" width="w-24" type="number" :disable="disable" :variant="disable ? '' : 'light'"
      @onChange="(v) => (productPrice = v)" />
  </td>
  <td class="p-2">
    <BaseInput :name="productCost || 0" width="w-24" type="number" :disable="disable" :variant="disable ? '' : 'light'"
      @onChange="(v) => (productCost = v)" />
  </td>
  <td>
    <BaseSelectField :values="categories" :disable="disable" variant="light" id="categories"
      :defaultValue="productCategory" width="w-56" @onChange="(v) => (productCategory = v)" />
  </td>
  <td>
    <NuxtImg v-if="disable" src="/icons/edit.svg" width="20" height="20" @click="editHandler"
      class="w-full p-1 m-auto rounded-md hover:cursor-pointer hover:bg-green-100" />
    <NuxtImg v-else src="/icons/checked.svg" width="20" height="20" @click="saveHandler"
      class="w-full p-1 m-auto rounded-md hover:cursor-pointer hover:bg-green-100" />
  </td>
  <td>
    <NuxtImg src="/icons/delete.svg" width="20" height="20" @click="deleteHandler"
      class="w-full p-1 m-auto rounded-md hover:cursor-pointer hover:bg-red-ulta-light" />
  </td>
</template>
