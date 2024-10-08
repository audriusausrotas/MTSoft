<script setup lang="ts">
const props = defineProps(["offer"]);
</script>

<template>
  <div class="flex flex-col gap-4 justify-evenly flex-wrap">
    <div class="flex justify-center gap-4 w-full">
      <BaseInput :disable="true" :name="props.offer?.orderNumber" label="Užsakymo nr" />
      <BaseInput :disable="true" :name="props.offer?.creator?.username" label="Atsakingas" />
    </div>

    <div class="flex gap-4 justify-center flex-wrap">
      <BaseInput :disable="true" :name="props.offer?.client?.username" label="klientas" />
      <BaseInput :disable="true" :name="props.offer?.client?.address" label="adresas" />

      <a :href="'tel:' + props.offer?.client?.phone">
        <BaseInput
          :disable="true"
          :name="props.offer?.client?.phone"
          label="telefono numeris"
          class="pointer-events-none"
        />
      </a>
      <a :href="'mailto:' + props.offer?.client?.email">
        <BaseInput
          :disable="true"
          :name="props.offer?.client?.email"
          label="elektroninis pastas"
          class="pointer-events-none print:hidden"
        />
      </a>
    </div>
  </div>
</template>
<style scoped></style>
