<script setup lang="ts">
import type { Product, Works } from "~/data/interfaces";
const props = defineProps(["work", "index", "works"]);

const resultsStore = useResultsStore();
</script>

<template>
  <div class="flex flex-wrap gap-4 p-4">
    <div class="flex flex-col gap-8">
      <BaseInput label="Nr" width="w-10" :disable="true" :name="props.index + 1" />
      <NuxtImg
        src="/icons/delete.svg"
        width="20"
        height="20"
        @click="resultsStore.deleteWork(props.work.id)"
        class="rounded-lg hover:bg-red-light hover:cursor-pointer h-10 border w-10 p-2 transition-colors"
      />
    </div>

    <div class="flex flex-col gap-2">
      <BaseSearchField
        width="w-80"
        label="Pavadinimas"
        :data="props.works"
        :name="props.work.name"
        @onChange="(value) => resultsStore.updateWorkName(props.index, value)"
        @OnClick="
          (value: Product) => {
            resultsStore.selectWork(props.index, value);
          }
        "
      />
      <div class="flex gap-4">
        <BaseInput
          variant="light"
          width="w-24"
          label="kiekis"
          type="number"
          :name="props.work.quantity"
          :disable="false"
          @onChange="(value) => resultsStore.updateWorkQuantity(props.index, value)"
        />

        <BaseInput
          variant="light"
          label="Kaina"
          type="number"
          :name="props.work.price"
          width="w-24"
          @onChange="(value) => resultsStore.updateWorkPrice(props.index, value)"
        />

        <BaseInput
          label="savikaina"
          :name="props.work.cost"
          width="w-24"
          variant="light"
          @onChange="(value) => resultsStore.updateWorkCost(props.index, value)"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        label="Viso Savikaina"
        :name="props.work.totalCost.toFixed(2)"
        disable="true"
        width="w-24"
      />
      <BaseInput
        label="Viso kaina"
        :name="props.work.totalPrice.toFixed(2)"
        disable="true"
        width="w-24"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        label="marža"
        :name="props.work.margin.toFixed(2) + ' %'"
        disable="true"
        width="w-24"
      />
      <BaseInput label="Pelnas" :name="props.work.profit.toFixed(2)" disable="true" width="w-24" />
    </div>
  </div>
</template>
<style scoped></style>
