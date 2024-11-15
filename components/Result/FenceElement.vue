<script setup lang="ts">
import { verticals, horizontals } from "../../data/selectFieldData";
import type { Product } from "~/data/interfaces";
const props = defineProps(["result", "index", "parts"]);

const useResults = useResultsStore();
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
  () =>
    props.result.isNew ||
    props.result.color === "Kita" ||
    props.result.category !== "tvoros"
);

const spaceEditable = computed(
  () =>
    props.result.isNew &&
    props.result.category === "tvoros" &&
    !props.result.type.includes("Segmentas")
);
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 py-4">
    <div class="">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2 w-96">
      <BaseSearchField
        width="w-full"
        label="Pavadinimas"
        :name="props.result.type"
        :data="props.parts"
        @OnClick="(value: Product) => {
      useResults.selectItem(props.index, value);
    }
      "
      />

      <div class="flex gap-2">
        <BaseInput
          label="spalva"
          width="w-24"
          :variant="colorEditable ? 'light' : ''"
          :disable="colorEditable ? false : true"
          :name="props.result.color"
          @onChange="(value) => useResults.updateColor(props.index, value)"
        />

        <BaseInput
          width="w-24"
          variant="light"
          label="kiekis"
          type="number"
          :name="props.result.quantity"
          @onChange="(value: number) => useResults.updateQuantity(props.index, +value)"
        />

        <BaseInput
          variant="light"
          label="kaina"
          width="w-24"
          type="number"
          :name="props.result.price"
          @onChange="(value: number) => useResults.updatePrice(props.index, value)"
        />
        <BaseInput
          label="savikaina"
          :name="props.result.cost"
          width="w-24"
          variant="light"
          @onChange="(value: number) => useResults.updateResultCost(props.index, value)"
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
        @onChange="(value) => useResults.updateSpace(props.index, value)"
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
        v-if="isFenceboard && props.result.twoSided"
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
      @click="useResults.deleteResult(props.result.id)"
      class="rounded-lg hover:bg-red-light hover:cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
