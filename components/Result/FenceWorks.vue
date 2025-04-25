<script setup lang="ts">
import type { Works } from "~/data/interfaces";
const props = defineProps(["work", "index", "works"]);

const resultsStore = useResultsStore();
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 py-4">
    <div class="">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2">
      <BaseSearchField
        width="w-80"
        label="Pavadinimas"
        :data="props.works"
        :name="props.work.name"
        @onChange="(value) => resultsStore.updateWorkName(props.index, value)"
        @OnClick="
          (value: Works) => {
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
      <BaseInput label="Viso Savikaina" :name="props.work.totalCost" disable="true" width="w-24" />
      <BaseInput label="Viso kaina" :name="props.work.totalPrice" disable="true" width="w-24" />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput label="marža" :name="props.work.margin + ' %'" disable="true" width="w-24" />
      <BaseInput label="Pelnas" :name="props.work.profit" disable="true" width="w-24" />
    </div>

    <NuxtImg
      src="/icons/delete.svg"
      width="20"
      height="20"
      @click="resultsStore.deleteWork(props.work.id)"
      class="rounded-lg hover:bg-red-light hover:cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
