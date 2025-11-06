<script setup lang="ts">
import { categories } from "~/data/selectFieldData";

const props = defineProps(["product", "index"]);
const productsStore = useProductsStore();

const { setError, setSuccess } = useError();
const disable = ref<boolean>(true);
const productName = ref<string>(props.product?.name);
const priceRetail = ref<number>(props.product?.prices?.priceRetail || 0);
const priceWholesale = ref<number>(props.product?.prices?.priceWholesale || 0);
const productCost = ref<number>(props.product?.prices?.cost || 0);
const productCategory = ref<string>(props.product?.category);

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

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  if (
    props.product.prices.cost === productCost.value &&
    props.product.prices.priceRetail === priceRetail.value &&
    props.product.prices.priceWholesale === priceWholesale.value &&
    props.product.name === productName.value &&
    productCategory.value === props.product.category
  ) {
    disable.value = true;
    return;
  }

  const requestData = {
    _id: props.product._id,
    name: productName.value,
    priceRetail: priceRetail.value,
    priceWholesale: priceWholesale.value,
    cost: productCost.value,
    category: productCategory.value,
  };

  const response = await request.patch("updateProduct", requestData);

  if (response.success) {
    !useSocketStore().connected && productsStore.updateProduct(response.data);
    disable.value = true;

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

watch(
  () => props.product,
  (newProduct) => {
    productName.value = newProduct.name;
    priceRetail.value = newProduct.prices.priceRetail;
    priceWholesale.value = newProduct.prices.priceWholesale;
    productCost.value = newProduct.prices.cost;
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
      :name="productCost || 0"
      width="w-24"
      type="number"
      :disable="disable"
      :variant="disable ? '' : 'light'"
      @onChange="(v) => (productCost = v)"
    />
  </td>
  <td class="p-2">
    <BaseInput
      :name="priceWholesale || 0"
      width="w-24"
      type="number"
      :disable="disable"
      :variant="disable ? '' : 'light'"
      @onChange="(v) => (priceWholesale = v)"
    />
  </td>
  <td class="p-2">
    <BaseInput
      :name="priceRetail || 0"
      width="w-24"
      type="number"
      :disable="disable"
      :variant="disable ? '' : 'light'"
      @onChange="(v) => (priceRetail = v)"
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
