<script setup lang="ts">
import type { Product } from "~/data/interfaces";
const props = defineProps(["result", "index", "parts"]);

const resultsStore = useResultsStore();
const settingsStore = useSettingsStore();

const isFenceboard = computed(
  () =>
    settingsStore.fences.find((fence) => fence.name === props.result?.name)?.category ===
    "Tvoralentė",
);

const isFence = computed(
  () =>
    settingsStore.fences.find(
      (fence) => fence.name.toLowerCase().trim() === props.result?.name.toLowerCase().trim(),
    )?.category === "Tvora",
);

const colorEditable = computed(
  () => props.result.color === "Kita" || props.result.category !== "tvoros",
);
</script>

<template>
  <div class="flex flex-wrap gap-4 p-4">
    <div class="flex flex-col gap-8">
      <BaseInput label="Nr" width="w-10" :disable="true" :name="props.index + 1" />
      <NuxtImg
        src="/icons/delete.svg"
        width="20"
        height="20"
        @click="resultsStore.deleteResult(props.result.id)"
        class="rounded-lg hover:bg-red-light hover:cursor-pointer h-10 border w-10 p-2 transition-colors"
      />
    </div>
    <div class="flex flex-col gap-2 w-96">
      <BaseSearchField
        width="w-full"
        label="Pavadinimas"
        :name="props?.result?.name"
        :data="props?.parts"
        @onChange="(value) => resultsStore.updateName(props.index, value)"
        @OnClick="
          (value: Product) => {
            resultsStore.selectItem(props.index, value);
          }
        "
      />
      <div class="flex gap-2">
        <BaseInput
          label="spalva"
          width="w-24"
          :variant="colorEditable ? 'light' : ''"
          :disable="colorEditable ? false : true"
          :name="props?.result?.color"
          @onChange="(value) => resultsStore.updateColor(props.index, value)"
        />

        <BaseInput
          width="w-24"
          variant="light"
          label="kiekis"
          type="number"
          :name="+props?.result?.quantity"
          @onChange="(value: number) => resultsStore.updateQuantity(props.index, +value)"
        />

        <BaseInput
          variant="light"
          label="kaina"
          width="w-24"
          type="number"
          :name="+props?.result?.price"
          @onChange="(value: number) => resultsStore.updatePrice(props.index, +value)"
        />
        <BaseInput
          label="savikaina"
          :name="+props?.result?.cost"
          type="number"
          width="w-24"
          variant="light"
          @onChange="(value: number) => resultsStore.updateResultCost(props.index, +value)"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <BaseInput
        width="w-24"
        label="viso savikaina"
        :name="props?.result?.totalCost"
        :disable="true"
      />
      <BaseInput
        width="w-24"
        label="viso kaina"
        :name="props?.result?.totalPrice"
        :disable="true"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput width="w-24" label="marža" :name="props?.result?.margin + ' %'" :disable="true" />
      <BaseInput width="w-24" :name="props?.result?.profit" label="pelnas" :disable="true" />
    </div>
    <div v-if="isFenceboard" class="flex flex-col gap-2">
      <BaseInput label="Ilgis" :name="props?.result?.height" :disable="true" width="w-24" />
      <BaseInput
        v-if="isFenceboard"
        :name="props.result.direction"
        width="w-24"
        label="kryptis"
        :disable="true"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        v-if="isFence"
        label="pramatomumas"
        :disable="true"
        :name="props?.result?.seeThrough"
        width="w-36"
      />
      <BaseInput
        v-if="isFence"
        label="Skarda"
        :disable="true"
        :name="props?.result?.manufacturer"
        width="w-36"
      />
    </div>
  </div>
</template>
<style scoped></style>
