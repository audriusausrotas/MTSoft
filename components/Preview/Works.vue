<script setup lang="ts">
const props = defineProps(["work", "index"]);
</script>

<template>
  <div
    class="flex flex-wrap items-center border-b pb-2 border-dark-light gap-4"
  >
    <div class="text-xl font-semibold">{{ props.index + 1 }}</div>

    <div class="flex flex-col gap-2">
      <BaseInput
        width="w-80"
        label="Pavadinimas"
        :disable="true"
        :name="props.work.name"
      />
      <div class="flex gap-4">
        <BaseInput
          width="w-24"
          label="kiekis"
          type="number"
          :disable="true"
          :name="props.work.quantity"
        />

        <BaseInput
          label="Kaina"
          type="number"
          :disable="true"
          :name="props.work.price"
          width="w-24"
        />

        <BaseInput
          label="savikaina"
          :name="props.work.cost"
          :disable="true"
          width="w-24"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        label="Viso Savikaina"
        :name="props.work.totalCost"
        :disable="true"
        width="w-24"
      />
      <BaseInput
        label="Viso kaina"
        :name="props.work.totalPrice"
        :disable="true"
        width="w-24"
      />
    </div>
    <div class="flex flex-col gap-2">
      <BaseInput
        label="marža"
        :name="props.work.margin + ' %'"
        :disable="true"
        width="w-24"
      />
      <BaseInput
        label="Pelnas"
        :name="props.work.profit"
        :disable="true"
        width="w-24"
      />
    </div>
  </div>
</template>
<style scoped></style>
