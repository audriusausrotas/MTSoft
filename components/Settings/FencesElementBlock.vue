<script setup lang="ts">
const props = defineProps(["name", "editable", "retail", "cost", "wholesale"]);
const emit = defineEmits(["cost", "retail", "wholesale"]);

const costHandler = (value: string) => {
  emit("cost", +value);
};

const wholesalePriceHandler = (value: string) => {
  emit("wholesale", +value);
};

const retailPriceHandler = (value: string) => {
  emit("retail", +value);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="font-semibold">{{ props.name }}</p>
    <BaseInput
      :name="props.cost"
      label="Savikaina"
      width="w-40"
      type="number"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="costHandler"
    />
    <BaseInput
      :name="props.wholesale"
      label="Didmena"
      width="w-40"
      type="number"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="wholesalePriceHandler"
    />
    <BaseInput
      :name="props.retail"
      label="Mažmena"
      width="w-40"
      type="number"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="retailPriceHandler"
    />
  </div>
</template>

<style scoped></style>
