<script setup lang="ts">
const props = defineProps(["order"]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 w-full flex-wrap justify-around lg:justify-normal">
      <BaseInput :disable="true" :name="props.order?.client?.username" label="klientas" />
      <BaseInput
        :disable="true"
        :name="props.order?.client?.address"
        label="adresas"
        width="w-96"
      />

      <a :href="'tel:' + props.order?.client?.phone">
        <BaseInput
          :disable="true"
          :name="props.order?.client?.phone"
          label="telefono numeris"
          class="pointer-events-none"
        />
      </a>
      <BaseInput :disable="true" :name="props.order?.creator?.username" label="Užsakovas" />
    </div>
    <div class="flex gap-4 w-full flex-wrap justify-around lg:justify-normal">
      <BaseInput :disable="true" :name="props.order?.orderNr" label="Užsakymo numeris" />
      <BaseInput :disable="true" :name="props.order?.deliveryMethod" label="Pristatymas" />
      <BaseInput
        :disable="true"
        :name="props.order?.orderDate"
        label="Užsakymo data"
        width="w-48"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.deliveryDate"
        label="Pristyti iki"
        width="w-48"
      />
      <BaseInput
        :disable="true"
        :name="props.order?.status ? 'Užsakyta' : 'Baigta'"
        label="Būsena"
        width="w-56"
      />
    </div>
  </div>
</template>
<style scoped></style>
