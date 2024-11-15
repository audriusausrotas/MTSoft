<script setup lang="ts">
import type { Works } from "~/data/interfaces";
const props = defineProps(["work", "index", "works"]);

const useResults = useResultsStore();
console.log(props.work);
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
        @OnClick="
          (value: Works) => {
            useResults.selectWork(props.index, value);
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
          @onChange="
            (value) => useResults.updateWorkQuantity(props.index, value)
          "
        />

        <BaseInput
          variant="light"
          label="Kaina"
          type="number"
          :name="props.work.price"
          width="w-24"
          @onChange="(value) => useResults.updateWorkPrice(props.index, value)"
        />

        <BaseInput
          label="savikaina"
          :name="props.work.cost"
          width="w-24"
          variant="light"
          @onChange="(value) => useResults.updateWorkCost(props.index, value)"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        label="Viso Savikaina"
        :name="props.work.totalCost"
        disable="true"
        width="w-24"
      />
      <BaseInput
        label="Viso kaina"
        :name="props.work.totalPrice"
        disable="true"
        width="w-24"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        label="marža"
        :name="props.work.margin + ' %'"
        disable="true"
        width="w-24"
      />
      <BaseInput
        label="Pelnas"
        :name="props.work.profit"
        disable="true"
        width="w-24"
      />
    </div>

    <NuxtImg
      src="/icons/delete.svg"
      width="20"
      height="20"
      @click="useResults.deleteWork(props.work.id)"
      class="rounded-lg hover:bg-red-light hover:cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
