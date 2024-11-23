<script setup lang="ts">
const props = defineProps(["name", "editable", "price", "cost", "space"]);
const emit = defineEmits(["priceChange", "costChange", "spaceChange"]);

const priceHandler = (value: string) => {
  emit("priceChange", +value);
};

const costHandler = (value: string) => {
  emit("costChange", +value);
};

const spaceHandler = (value: string) => {
  emit("spaceChange", +value);
};
</script>

<template>
  <div class="flex gap-4 items-center">
    <p class="font-semibold text-xl w-52">{{ props.name }}:</p>
    <BaseInput
      :name="props.price"
      label="kaina"
      width="w-24"
      type="number"
      :disable="!props.editable"
      :variant="props.editable ? 'light' : ''"
      @onChange="priceHandler"
    />
    <BaseInput
      :name="props.cost"
      label="savikaina"
      width="w-24"
      type="number"
      :disable="!props.editable"
      :variant="props.editable ? 'light' : ''"
      @onChange="costHandler"
    />
    <BaseInput
      :name="props.space"
      label="tarpas"
      width="w-24"
      type="number"
      :disable="!props.editable"
      :variant="props.editable ? 'light' : ''"
      @onChange="spaceHandler"
    />
  </div>
</template>

<style scoped></style>
