<script setup lang="ts">
import { categories } from "~/data/selectFieldData";

const props = defineProps(["product", "index"]);
const productsStore = useProductsStore();

const { setError, setIsError } = useError();
const disable = ref<boolean>(true);
const productName = ref<string>(props.product.name);
const productPrice = ref<number>(props.product.price);
const productCost = ref<number>(props.product.cost);
const productCategory = ref<string>(props.product.category);

const editHandler = (): void => {
  disable.value = !disable.value;
};

const deleteHandler = async (): Promise<void> => {
  const confirmed = confirm("Ar tikrai norite ištrinti produktą?");
  if (!confirmed) return;

  const response = await request.delete(`deleteProduct/${props.product._id}`);

  if (response.success) {
    !useSocketStore().connected &&
      productsStore.deleteProduct(response.data._id);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  if (
    props.product.cost === productCost.value &&
    props.product.price === productPrice.value &&
    props.product.name === productName.value &&
    productCategory.value === props.product.category
  ) {
    disable.value = true;
    return;
  }

  const requestData = {
    _id: props.product._id,
    name: productName.value,
    price: productPrice.value,
    cost: productCost.value,
    category: productCategory.value,
  };

  const response = await request.patch("updateProduct", requestData);

  if (response.success) {
    !useSocketStore().connected && productsStore.updateProduct(response.data);
    disable.value = true;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

watch(
  () => props.product,
  (newProduct) => {
    productName.value = newProduct.name;
    productPrice.value = newProduct.price;
    productCost.value = newProduct.cost;
    productCategory.value = newProduct.category;
  },
  { deep: true }
);
</script>

<template>
  <td class="p-2 align-middle">{{ props.index + 1 }}</td>
  <td class="p-2">
    <BaseInput
      :name="productName"
      width="w-auto"
      :disable="disable"
      :variant="disable ? '' : 'light'"
      @onChange="(v) => (productName = v)"
    />
  </td>
  <td class="p-2">
    <BaseInput
      :name="productPrice || 0"
      width="w-24"
      type="number"
      :disable="disable"
      :variant="disable ? '' : 'light'"
      @onChange="(v) => (productPrice = v)"
    />
  </td>
  <td class="p-2">
    <BaseInput
      :name="productCost || 0"
      width="w-24"
      type="number"
      :disable="disable"
      :variant="disable ? '' : 'light'"
      @onChange="(v) => (productCost = v)"
    />
  </td>
  <td>
    <BaseSelectField
      :values="categories"
      :disable="disable"
      variant="light"
      id="categories"
      :defaultValue="productCategory"
      width="w-56"
      @onChange="(v) => (productCategory = v)"
    />
  </td>
  <td>
    <NuxtImg
      v-if="disable"
      src="/icons/edit.svg"
      width="20"
      height="20"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      @click="editHandler"
      class="w-full p-1 m-auto rounded-md hover:cursor-pointer hover:bg-green-100"
    />
    <NuxtImg
      v-else
      src="/icons/checked.svg"
      width="20"
      height="20"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      @click="saveHandler"
      class="w-full p-1 m-auto rounded-md hover:cursor-pointer hover:bg-green-100"
    />
  </td>
  <td>
    <NuxtImg
      src="/icons/delete.svg"
      width="20"
      height="20"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      @click="deleteHandler"
      class="w-full p-1 m-auto rounded-md hover:cursor-pointer hover:bg-red-ulta-light"
    />
  </td>
</template>
