<script setup lang="ts">
import { verticals, horizontals } from "../../data/selectFieldData";
const props = defineProps(["result", "index"]);

const useResults = useResultsStore();
const useProduct = useProductsStore();

const deleteHandler = () => {
  useResults.deleteResult(props.result.id);
};

const isFenceboard = computed(() => {
  if (verticals.some((item) => props.result?.type?.includes(item))) {
    return true;
  } else {
    return false;
  }
});

const showAditionalVertical = computed(() => {
  if (
    verticals.some((item) => props.result?.type?.includes(item)) &&
    props.result.direction === "Vertikali"
  ) {
    return true;
  } else {
    return false;
  }
});

const showAditionalHorizontal = computed(() => {
  if (
    horizontals.some((item) => props.result?.type?.includes(item)) &&
    props.result.direction === "Horizontali"
  ) {
    return true;
  } else {
    return false;
  }
});

const colorEditable = computed(
  () => props.result.color === "Kita" || props.result.isNew
);
const spaceEditable = computed(
  () =>
    props.result.isNew &&
    props.result.category === "tvoros" &&
    !props.result.type.includes("Segmentas")
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 py-4">
    <div class="">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2 w-96">
      <BaseSearchField
        width="w-full"
        label="Pavadinimas"
        :data="useProduct.products"
        @OnClick="
          (value) => {
            useResults.selectItem({ index: props.index, value });
          }
        "
        @onChange="
          (value) => useResults.updateName({ index: props.index, value })
        "
        :name="props.result.type"
        :index="props.index"
      />

      <div class="flex gap-2">
        <BaseInput
          label="spalva"
          width="w-20"
          :variant="colorEditable ? 'light' : ''"
          :disable="colorEditable ? false : true"
          :name="props.result.color"
          @onChange="
            (value) => useResults.updateColor({ index: props.index, value })
          "
        />

        <BaseInput
          width="w-22"
          variant="light"
          label="kiekis"
          :name="props.result.quantity"
          @onChange="
            (value) => useResults.updateQuantity({ index: props.index, value })
          "
        />

        <BaseInput
          variant="light"
          label="kaina"
          width="w-24"
          :name="props.result.price"
        />
        <BaseInput
          label="savikaina"
          :name="props.result.cost"
          disable="true"
          width="w-24"
        />
      </div>
    </div>

    <div v-if="showAditionalVertical" class="flex flex-col gap-2">
      <BaseInput
        variant="light"
        label="ilgis"
        :name="$props.result.height"
        width="w-24"
      />
      <BaseInput
        v-if="isFenceboard"
        :name="props.result.space"
        width="w-24"
        label="tarpas"
        :variant="spaceEditable ? 'light' : ''"
        :disable="spaceEditable ? false : true"
        @onChange="
          (value) => useResults.updateSpace({ index: props.index, value })
        "
      />
    </div>

    <div class="flex flex-col gap-2">
      <BaseInput
        v-if="props.result.direction"
        width="w-36"
        label="kryptis"
        :name="props.result.direction"
      />
      <BaseInput
        v-if="showAditionalHorizontal"
        label="pramatomumas"
        :disable="true"
        :name="props.result.seeThrough"
        width="w-36"
      />

      <BaseInput
        v-if="isFenceboard"
        width="w-36"
        label="dvipusė"
        :name="props.result.twoSided"
        :disable="false"
      />
    </div>

    <div class="flex flex-col gap-2">
      <BaseInput
        width="w-24"
        label="viso savikaina"
        :name="props.result.totalCost"
        disable="true"
      />
      <BaseInput
        width="w-24"
        label="viso kaina"
        :name="props.result.totalPrice"
        disable="true"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        width="w-24"
        label="marža"
        :name="props.result.margin + ' %'"
        disable="true"
      />
      <BaseInput
        width="w-24"
        :name="props.result.profit"
        label="pelnas"
        disable="true"
      />
    </div>

    <NuxtImg
      src="/icons/delete.svg"
      width="20"
      height="20"
      @click="deleteHandler"
      class="rounded-lg hover:bg-red-light hover:cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
