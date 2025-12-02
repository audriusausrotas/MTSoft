<script setup lang="ts">
import { categories } from "~/data/selectFieldData";
import { calculateProductPrice } from "~/utils/calculations/calculateProductPrice";

const props = defineProps(["product", "index"]);
const productsStore = useProductsStore();

const { setError, setSuccess } = useError();
const editable = ref<boolean>(false);
const productName = ref<string>(props.product?.name);
const priceRetail = ref<number>(props.product?.prices?.priceRetail || 0);
const priceWholesale = ref<number>(props.product?.prices?.priceWholesale || 0);
const productCost = ref<number>(props.product?.prices?.cost || 0);
const productCategory = ref<string>(props.product?.category);
const retailMargin = ref<number>(props.product?.profit?.retail || 0);
const wholesaleMargin = ref<number>(props.product?.profit?.wholesale || 0);

const editHandler = (): void => {
  editable.value = !editable.value;
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
    editable.value = false;
    return;
  }

  const requestData = {
    _id: props.product._id,
    name: productName.value,
    priceRetail: priceRetail.value,
    priceWholesale: priceWholesale.value,
    cost: productCost.value,
    category: productCategory.value,
    profitRetail: retailMargin.value,
    profitWholesale: wholesaleMargin.value,
  };

  const response = await request.patch("updateProduct", requestData);

  if (response.success) {
    !useSocketStore().connected && productsStore.updateProduct(response.data);
    editable.value = false;

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const calculateHandler = () => {
  if (!productCost.value || !retailMargin.value || !wholesaleMargin.value)
    return;

  priceRetail.value = calculateProductPrice(
    productCost.value,
    retailMargin.value
  );
  priceWholesale.value = calculateProductPrice(
    productCost.value,
    wholesaleMargin.value
  );
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
  <div
    class="flex flex-col gap-1"
    :class="editable ? 'border-y-2 border-red-500 my-2 py-4' : ''"
  >
    <div class="flex items-center gap-4">
      <div class="w-8 p-3">{{ props.index + 1 }}</div>
      <div class="w-[500px]">
        <BaseInput
          :name="productName"
          width="w-auto"
          :editable="!editable"
          :variant="editable ? 'light' : ''"
          @onChange="(v) => (productName = v)"
        />
      </div>

      <BaseInput
        :name="productCost || 0"
        width="w-24"
        type="number"
        :editable="!editable"
        :variant="editable ? 'light' : ''"
        @onChange="(v) => (productCost = v)"
      />

      <BaseInput
        :name="priceWholesale || 0"
        width="w-24"
        type="number"
        :editable="!editable"
        :variant="editable ? 'light' : ''"
        @onChange="(v) => (priceWholesale = v)"
      />

      <BaseInput
        :name="priceRetail || 0"
        width="w-24"
        type="number"
        :editable="!editable"
        :variant="editable ? 'light' : ''"
        @onChange="(v) => (priceRetail = v)"
      />

      <BaseSelectField
        :values="categories"
        :editable="!editable"
        variant="light"
        id="categories"
        :defaultValue="productCategory"
        width="w-56"
        @onChange="(v) => (productCategory = v)"
      />

      <div class="w-8">
        <NuxtImg
          v-if="!editable"
          src="/icons/edit.svg"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          @click="editHandler"
          class="w-full p-1 hover:cursor-pointer hover:scale-125 transition-transform"
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
          class="w-full p-1 hover:cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
      <div class="w-8">
        <NuxtImg
          v-if="!editable"
          src="/icons/delete.svg"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          @click="deleteHandler"
          class="w-full p-1 hover:cursor-pointer hover:scale-125 transition-transform"
        />
        <NuxtImg
          v-else
          src="/icons/close.svg"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          @click="editHandler"
          class="w-full p-1 hover:cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>
    <div v-if="editable" class="flex gap-4 items-end pl-12">
      <BaseInfoField
        name="Pelno skaičiavimas pagal maržą %"
        width="w-[500px]"
      />
      <BaseInfoField name="------->" width="w-24" />
      <BaseInput
        width="w-24"
        variant="light"
        type="number"
        placeholder="Marža %"
        :name="wholesaleMargin"
        @onChange="(value) => (wholesaleMargin = value)"
      />
      <BaseInput
        width="w-24"
        variant="light"
        type="number"
        placeholder="Marža %"
        :name="retailMargin"
        @onChange="(value) => (retailMargin = value)"
      />
      <BaseButton name="Skaičiuoti" width="w-56" @click="calculateHandler" />
    </div>
  </div>
</template>
