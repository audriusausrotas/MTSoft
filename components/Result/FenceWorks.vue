<script setup lang="ts">
const props = defineProps(["work", "index"]);

const useResults = useResultsStore();
const useProduct = useProductsStore();

const deleteHandler = () => {
  useResults.deleteResult(props.work.id);
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 py-4">
    <div class="">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2">
      <BaseSearchField
        width="w-80"
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
        :name="props.work.name"
        :index="props.index"
      />
      <div class="flex gap-4">
        <BaseInput
          variant="light"
          width="w-24"
          label="kiekis"
          :name="props.work.quantity"
          :disable="false"
        />

        <BaseInput
          variant="light"
          label="Kaina"
          :name="props.work.price"
          width="w-24"
        />

        <BaseInput
          label="savikaina"
          :name="props.work.cost"
          disable="true"
          width="w-24"
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
        :name="props.work.margin"
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
      @click="deleteHandler"
      class="rounded-lg hover:bg-red-light hover:cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
