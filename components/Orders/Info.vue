<script setup lang="ts">
const props = defineProps(["order"]);
</script>

<template>
  <div class="flex gap-4 w-full flex-wrap justify-around lg:justify-normal">
    <BaseInput
      :disable="true"
      :name="props.order.client?.username"
      label="klientas"
    />
    <BaseInput
      :disable="true"
      :name="props.order.client?.address"
      label="adresas"
    />

    <a :href="'tel:' + props.order.client?.phone">
      <BaseInput
        :disable="true"
        :name="props.order.client?.phone"
        label="telefono numeris"
        class="pointer-events-none"
      />
    </a>
    <BaseInput
      :disable="true"
      :name="props.order.user?.username"
      label="Užsakovas"
    />
    <BaseInput
      :disable="true"
      :name="props.order.deliveryMethod"
      label="Pristatymas"
    />
    <BaseInput
      :disable="true"
      :name="props.order.deliveryDate"
      label="Pristyti iki"
    />
  </div>
</template>
<style scoped></style>
