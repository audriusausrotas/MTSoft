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

    <BaseSearchField
      width="w-96"
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
      :name="props.work.type"
      :index="props.index"
    />

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
