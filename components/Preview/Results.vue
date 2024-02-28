<script setup lang="ts">
import { verticals } from "~/data/selectFieldData";
import { horizontals } from "~/data/selectFieldData";
const props = defineProps(["result", "index"]);

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
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 py-4">
    <div class="">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2 w-96">
      <BaseInput width="w-full" label="Pavadinimas" :name="props.result.type" />

      <div class="flex gap-2">
        <BaseInput
          label="spalva"
          width="w-20"
          :disable="true"
          :name="props.result.color"
        />

        <BaseInput
          width="w-22"
          label="kiekis"
          type="number"
          :disable="true"
          :name="props.result.quantity"
        />

        <BaseInput
          label="kaina"
          width="w-24"
          type="number"
          :disable="true"
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
        label="ilgis"
        :name="props.result.height"
        width="w-24"
        :disable="true"
      />
      <BaseInput
        v-if="isFenceboard"
        :name="props.result.space"
        width="w-24"
        label="tarpas"
        :disable="true"
      />
    </div>

    <div class="flex flex-col gap-2">
      <BaseInput
        v-if="props.result.direction"
        width="w-36"
        label="kryptis"
        :disable="true"
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
        :disable="true"
      />
    </div>

    <div class="flex flex-col gap-2">
      <BaseInput
        width="w-24"
        label="viso savikaina"
        :name="props.result.totalCost"
        :disable="true"
      />
      <BaseInput
        width="w-24"
        label="viso kaina"
        :name="props.result.totalPrice"
        :disable="true"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        width="w-24"
        label="marža"
        :name="props.result.margin + ' %'"
        :disable="true"
      />
      <BaseInput
        width="w-24"
        :name="props.result.profit"
        label="pelnas"
        :disable="true"
      />
    </div>
  </div>
</template>
<style scoped></style>
