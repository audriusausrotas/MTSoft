<script setup lang="ts">
import { categories } from "~/data/selectFieldData";
import { calculateProductPrice } from "~/utils/calculations/calculateProductPrice";

const props = defineProps(["product", "index"]);
const productsStore = useProductsStore();

const { setError, setSuccess } = useCustomError();
const editable = ref<boolean>(false);

const productName = ref<string>(props.product?.name);
const productCategory = ref<string>(props.product?.category);

const prices = reactive({
  priceRetail: props.product?.prices?.priceRetail,
  priceWholesale: props.product?.prices?.priceWholesale,
  cost: props.product?.prices?.cost,
});

const profit = reactive({
  retail: props.product?.profit?.retail,
  wholesale: props.product?.profit?.wholesale,
});

const aditional = reactive({
  show: props.product.aditional?.show || false,
  description: props.product.aditional?.description || "",
  seoTitle: props.product.aditional?.seoTitle || "",
  seoDescription: props.product.aditional?.seoDescription || "",
  descriptionEn: props.product.aditional?.descriptionEn || "",
  seoTitleEn: props.product.aditional?.seoTitleEn || "",
  seoDescriptionEn: props.product.aditional?.seoDescriptionEn || "",
  images: props.product.aditional?.images || [],
});

const deleteHandler = async (): Promise<void> => {
  const confirmed = confirm("Ar tikrai norite ištrinti produktą?");
  if (!confirmed) return;

  const response = await request.delete(`deleteProduct/${props.product._id}`);

  if (response.success) {
    !useSocketStore().connected && productsStore.deleteProduct(response.data._id);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  const requestData = {
    _id: props.product._id,
    name: productName.value,
    prices: { ...prices },
    category: productCategory.value,
    profit: { ...profit },
    aditional: { ...aditional },
  };
  console.log(requestData);
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
  if (!prices.cost || !profit.retail || !profit.wholesale) return;

  prices.priceRetail = calculateProductPrice(prices.cost, profit.retail);
  prices.priceWholesale = calculateProductPrice(prices.cost, profit.wholesale);
};

const addImage = () => {
  aditional.images.push({
    url: "",
    alt: "",
    altEN: "",
  });
};

watch(
  () => props.product,
  (newProduct) => {
    productName.value = newProduct.name;
    prices.priceRetail = newProduct.prices.priceRetail;
    prices.priceWholesale = newProduct.prices.priceWholesale;
    prices.cost = newProduct.prices.cost;
    productCategory.value = newProduct.category;
  },
  { deep: true },
);
</script>

<template>
  <div
    class="flex flex-col gap-1"
    :class="editable ? 'border border-gray-full rounded-lg p-4' : ''"
  >
    <div class="grid grid-cols-[40px_auto_150px_150px_150px_200px_100px] gap-4">
      <div class="w-8 p-3">{{ props.index + 1 }}</div>

      <BaseInput
        :name="productName"
        width=""
        :disable="!editable"
        @onChange="(v) => (productName = v)"
      />

      <BaseInput
        :name="prices.cost || 0"
        width=""
        type="number"
        :disable="!editable"
        @onChange="(v) => (prices.cost = v)"
      />

      <BaseInput
        :name="prices.priceWholesale || 0"
        width=""
        type="number"
        :disable="!editable"
        @onChange="(v) => (prices.priceWholesale = v)"
      />

      <BaseInput
        :name="prices.priceRetail || 0"
        width=""
        type="number"
        :disable="!editable"
        @onChange="(v) => (prices.priceRetail = v)"
      />

      <BaseSelectField
        :values="categories"
        :disable="!editable"
        variant="light"
        id="categories"
        width="w-full"
        :defaultValue="productCategory"
        @onChange="(v) => (productCategory = v)"
      />
      <BaseActionButtons
        class=""
        @onSave="saveHandler"
        @onEdit="editable = true"
        @onDelete="deleteHandler"
        @onCancel="editable = false"
      />
    </div>

    <div v-if="editable" class="flex gap-4 flex-col">
      <div class="grid grid-cols-[40px_auto_150px_150px_150px_200px_100px] gap-4">
        <BaseInfoField name="Pelno skaičiavimas pagal maržą %" width="full" class="col-start-2" />

        <BaseInput
          width="w-full col-start-4"
          variant="light"
          type="number"
          placeholder="Marža %"
          :name="profit.wholesale"
          @onChange="(value) => (profit.wholesale = value)"
        />
        <BaseInput
          width="w-full"
          variant="light"
          type="number"
          placeholder="Marža %"
          :name="profit.retail"
          @onChange="(value) => (profit.retail = value)"
        />
        <BaseButton name="Skaičiuoti" width="w-full" @click="calculateHandler" />
      </div>

      <SettingsFenceElementWraper name="Papildoma informacija">
        <div class="flex gap-4 items-center">
          <div class="text-lg font font-semibold">Rodyti tinklapyje</div>
          <BaseCheckField
            :disabled="!editable"
            :name="'FenceAditionalShowCheckbox' + index"
            @onChange="(value: boolean) => (aditional.show = value)"
            :checked="aditional.show"
            height="h-4"
          />
        </div>
        <div>
          <label for="fenceDescription">Tvoros aprašymas</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.description"
            name="description"
            id="fenceDescription"
            class="border border-dark-light w-full h-40 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceDescriptionEn">Tvoros aprašymas Anglų kalba</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.descriptionEn"
            name="descriptionEn"
            id="fenceDescriptionEn"
            class="border border-dark-light w-full h-40 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoTitle">Seo pavadinimas</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.seoTitle"
            name="seoTitle"
            id="fenceSeoTitle"
            class="border border-dark-light w-full h-12 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoTitleEn">Seo Pavadinimas Anglų kalba</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.seoTitleEn"
            name="seoTitleEn"
            id="fenceSeoTitleEn"
            class="border border-dark-light w-full h-12 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoDescription">Seo aprašymas</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.seoDescription"
            name="seoDescription"
            id="fenceSeoDescription"
            class="border border-dark-light w-full h-20 p-2 rounded-md"
          />
        </div>
        <div>
          <label for="fenceSeoDescriptionEn">Seo aprašymas Anglų kalba</label>
          <textarea
            :disabled="!editable"
            v-model="aditional.seoDescriptionEn"
            name="seoDescriptionEn"
            id="fenceSeoDescriptionEn"
            class="border border-dark-light w-full h-20 p-2 rounded-md"
          />
        </div>
        <div class="flex flex-col gap-4">
          <BaseButton @click="addImage" :disabled="!editable">Pridėti nuotrauką</BaseButton>

          <div v-for="(image, index) in aditional.images" :key="index" class="flex gap-4">
            <BaseInput
              :disable="!editable"
              label="Nuotraukos pavadinimas"
              :name="image.name"
              @onChange="(value: string) => (aditional.images[index].name = value)"
            />
            <BaseInput
              :disable="!editable"
              label="Nuotraukos URL"
              :name="image.url"
              width="flex-1"
              @onChange="(value: string) => (aditional.images[index].url = value)"
            />
            <BaseInput
              :disable="!editable"
              label="Nuotraukos aprašymas"
              :name="image.alt"
              width="flex-1"
              @onChange="(value: string) => (aditional.images[index].alt = value)"
            />
            <BaseInput
              :disable="!editable"
              label="Nuotraukos aprašymas EN"
              :name="image.altEN"
              width="flex-1"
              @onChange="(value: string) => (aditional.images[index].altEN = value)"
            />
          </div>
        </div>
      </SettingsFenceElementWraper>
    </div>
  </div>
</template>
