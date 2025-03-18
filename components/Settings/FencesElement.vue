<script setup lang="ts">
import { fenceTypes, fenceDirections } from "~/data/selectFieldData";
const props = defineProps(["fence"]);

const { setError, setIsError } = useError();
const useProducts = useProductsStore();

const editable = ref<boolean>(false);
const height = ref<string>(props.fence?.height);
const width = ref<string>(props.fence?.width);
const isFenceBoard = ref<string>(props.fence?.isFenceBoard ? "Tvoralentė" : "Tvora");
const defaultDirection = ref<string>(props.fence?.defaultDirection);

const seeThroughData = reactive({
  Aklina: {
    price: props.fence.seeThrough?.Aklina?.price,
    cost: props.fence.seeThrough?.Aklina?.cost,
    space: props.fence.seeThrough?.Aklina?.space,
  },
  Nepramatoma: {
    price: props.fence.seeThrough?.Nepramatoma?.price,
    cost: props.fence.seeThrough?.Nepramatoma?.cost,
    space: props.fence.seeThrough?.Nepramatoma?.space,
  },
  Vidutiniška: {
    price: props.fence.seeThrough?.Vidutiniška?.price,
    cost: props.fence.seeThrough?.Vidutiniška?.cost,
    space: props.fence.seeThrough?.Vidutiniška?.space,
  },
  Pramatoma: {
    price: props.fence.seeThrough?.Pramatoma?.price,
    cost: props.fence.seeThrough?.Pramatoma?.cost,
    space: props.fence.seeThrough?.Pramatoma?.space,
  },
  "25% Pramatomumas": {
    price: props.fence.seeThrough?.["25% Pramatomumas"]?.price,
    cost: props.fence.seeThrough?.["25% Pramatomumas"]?.cost,
    space: props.fence.seeThrough?.["25% Pramatomumas"]?.space,
  },
  "50% Pramatomumas": {
    price: props.fence.seeThrough?.["50% Pramatomumas"]?.price,
    cost: props.fence.seeThrough?.["50% Pramatomumas"]?.cost,
    space: props.fence.seeThrough?.["50% Pramatomumas"]?.space,
  },
});

const saveHandler = async () => {
  const newData = {
    _id: props.fence._id,
    height: height.value,
    width: width.value,
    isFenceBoard: isFenceBoard.value === "Tvora" ? false : true,
    defaultDirection: defaultDirection.value,
    seeThrough: seeThroughData,
  };
  const response: any = await $fetch("/api/product", {
    method: "put",
    body: newData,
  });

  if (response.success) {
    useProducts.updateProduct(response.data);
    editable.value = false;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 items-center border border-dark-full p-8 rounded-xl">
    <div class="flex gap-4 items-center">
      <p class="font-bold text-2xl">{{ props.fence.name }}</p>

      <NuxtImg
        v-if="editable"
        src="/icons/save.svg"
        width="22"
        height="22"
        decoding="auto"
        :ismap="true"
        loading="lazy"
        class="hover:cursor-pointer hover:scale-125"
        @click="saveHandler"
      />

      <NuxtImg
        v-else
        src="/icons/edit.svg"
        width="22"
        height="22"
        decoding="auto"
        :ismap="true"
        loading="lazy"
        class="hover:cursor-pointer hover:scale-125"
        @click="editable = !editable"
      />
    </div>

    <div class="flex gap-4">
      <BaseSelectField
        label="Tvoros Tipas"
        :values="fenceTypes"
        :defaultValue="isFenceBoard || fenceTypes[0]"
        :disable="!editable"
        :variant="editable ? 'light' : ''"
        width="w-52"
        @onChange="(value) => (isFenceBoard = value)"
      />

      <BaseSelectField
        label="Standartinė Kryptis"
        :values="fenceDirections"
        :defaultValue="defaultDirection || fenceDirections[0]"
        :disable="!editable"
        :variant="editable ? 'light' : ''"
        width="w-52"
        @onChange="(value) => (defaultDirection = value)"
      />
    </div>

    <div class="flex gap-4 items-center">
      <BaseInput
        :name="height"
        label="auktis"
        width="w-24"
        :disable="!editable"
        :variant="editable ? 'light' : ''"
        @onChange="(value:string) => (height = value)"
      />

      <BaseInput
        :name="width"
        label="plotis"
        width="w-24"
        :disable="!editable"
        :variant="editable ? 'light' : ''"
        @onChange="(value:string) => (width = value)"
      />

      <BaseInput :name="props.fence.price" label="Kaina" width="w-24" disable="true" />

      <BaseInput :name="props.fence.cost" label="savikaina" width="w-24" disable="true" />
    </div>

    <SettingsFencesElementBlock
      name="Aklina"
      :editable="editable"
      :price="seeThroughData.Aklina.price"
      :cost="seeThroughData.Aklina.cost"
      :space="seeThroughData.Aklina.space"
      @priceChange="(value:string) => (seeThroughData.Aklina.price = +value)"
      @costChange="(value:string) => (seeThroughData.Aklina.cost = +value)"
      @spaceChange="(value:string) => (seeThroughData.Aklina.space = +value)"
    />

    <SettingsFencesElementBlock
      name="Nepramatoma"
      :editable="editable"
      :price="seeThroughData.Nepramatoma.price"
      :cost="seeThroughData.Nepramatoma.cost"
      :space="seeThroughData.Nepramatoma.space"
      @priceChange="(value:string) => (seeThroughData.Nepramatoma.price = +value)"
      @costChange="(value:string) => (seeThroughData.Nepramatoma.cost = +value)"
      @spaceChange="(value:string) => (seeThroughData.Nepramatoma.space = +value)"
    />

    <SettingsFencesElementBlock
      name="Vidutiniška"
      :editable="editable"
      :price="seeThroughData.Vidutiniška.price"
      :cost="seeThroughData.Vidutiniška.cost"
      :space="seeThroughData.Vidutiniška.space"
      @priceChange="(value:string) => (seeThroughData.Vidutiniška.price = +value)"
      @costChange="(value:string) => (seeThroughData.Vidutiniška.cost = +value)"
      @spaceChange="(value:string) => (seeThroughData.Vidutiniška.space = +value)"
    />

    <SettingsFencesElementBlock
      name="Pramatoma"
      :editable="editable"
      :price="seeThroughData.Pramatoma.price"
      :cost="seeThroughData.Pramatoma.cost"
      :space="seeThroughData.Pramatoma.space"
      @priceChange="(value:string) => (seeThroughData.Pramatoma.price = +value)"
      @costChange="(value:string) => (seeThroughData.Pramatoma.cost = +value)"
      @spaceChange="(value:string) => (seeThroughData.Pramatoma.space = +value)"
    />

    <SettingsFencesElementBlock
      name="25% Pramatomumas"
      :editable="editable"
      :price="seeThroughData['25% Pramatomumas'].price"
      :cost="seeThroughData['25% Pramatomumas'].cost"
      :space="seeThroughData['25% Pramatomumas'].space"
      @priceChange="(value:string) => (seeThroughData['25% Pramatomumas'].price = +value)"
      @costChange="(value:string) => (seeThroughData['25% Pramatomumas'].cost = +value)"
      @spaceChange="(value:string) => (seeThroughData['25% Pramatomumas'].space = +value)"
    />

    <SettingsFencesElementBlock
      name="50% Pramatomumas"
      :editable="editable"
      :price="seeThroughData['50% Pramatomumas'].price"
      :cost="seeThroughData['50% Pramatomumas'].cost"
      :space="seeThroughData['50% Pramatomumas'].space"
      @priceChange="(value:string) => (seeThroughData['50% Pramatomumas'].price = +value)"
      @costChange="(value:string) => (seeThroughData['50% Pramatomumas'].cost = +value)"
      @spaceChange="(value:string) => (seeThroughData['50% Pramatomumas'].space = +value)"
    />
  </div>
</template>

<style scoped></style>
