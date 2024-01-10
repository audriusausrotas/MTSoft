<script setup>
import { verticals } from "../../data/selectFieldData";
const props = defineProps(["result", "index"]);

const useResults = useResultsStore();
const useProduct = useProductsStore();

const deleteHandler = () => {
  useResults.deleteResult(props.result.id);
};

const showAditional = computed(
  () => {
    if (props.result.category === "tvoros") {
      const isTrue = verticals.some(item => props.result.name.includes(item));
      return isTrue;
    }
  }
);
const colorEditable = computed(
  () => props.result.color === "Kita" || props.result.isNew
);
const spaceEditable = computed(
  () => props.result.isNew && props.result.category === "tvoros" && !props.result.name.includes("Segmentas")
);

</script>

<template>
  <div class="flex flex-wrap items-center gap-4 py-4 ">
    <div class="">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2 w-96">
      <BaseSearchField width="w-full" label="Pavadinimas" :data="useProduct.products" @OnClick="(value) => {
        useResults.selectItem({ index: props.index, value });
      }
        " @onChange="(value) => useResults.updateName({ index: props.index, value })
    " :name="props.result.name" :index="props.index" />

      <div class="flex gap-2">
        <BaseInput label="spalva" :variant="colorEditable ? 'light' : ''" :disable="colorEditable ? false : true"
          :name="props.result.color" @onChange="(value) => useResults.updateColor({ index: props.index, value })
            " />

        <BaseInput :name="props.result.space" label="tarpas" :variant="spaceEditable ? 'light' : ''"
          :disable="spaceEditable ? false : true" @onChange="(value) => useResults.updateSpace({ index: props.index, value })
            " />

        <BaseInput variant="light" label="kiekis" :name="props.result.quantity" @onChange="(value) => useResults.updateQuantity({ index: props.index, value })
          " />

      </div>
    </div>
    <div v-if="showAditional" class="flex flex-col w-24 gap-2">
      <BaseInput variant="light" label="ilgis" name="nzn" />
      <BaseInput width="w-24" label="dvipusė" :name="props.result.twoSided ? 'Taip' : 'Ne'" :disable="false" />
    </div>
    <div class="flex flex-col w-24 gap-2">
      <BaseInput variant="light" label="kaina" :name="props.result.price" />
      <BaseInput width="w-24" label="viso kaina" :name="props.result.totalPrice" disable="true" />
    </div>
    <div class="flex flex-col w-24 gap-2">
      <BaseInput label="savikaina" :name="props.result.cost" disable="true" />
      <BaseInput width="w-24" label="viso savikaina" :name="props.result.totalCost" disable="true" />
    </div>
    <div class="flex flex-col w-24 gap-2">
      <BaseInput width="w-24" :name="props.result.profit" label="pelnas" disable="true" />
      <BaseInput width="w-24" label="marža" :name="props.result.margin + ' %'" disable="true" />
    </div>

    <NuxtImg src="/icons/delete.svg" width="20" height="20" @click="deleteHandler"
      class="rounded-lg hover:bg-red-light hover:cursor-pointer" />
  </div>
</template>
<style scoped></style>
