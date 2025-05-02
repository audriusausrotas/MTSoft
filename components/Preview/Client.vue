<script setup lang="ts">
const props = defineProps(["client", "orderNr", "creator", "location"]);
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <p class="font-medium text-2xl">Bendra informacija</p>
    <div class="flex gap-4 w-full">
      <BaseInput :disable="true" :name="props.orderNr" label="Užsakymo nr" />
      <BaseInput :disable="true" :name="props.client?.username" label="klientas" />
      <BaseInput :disable="true" :name="props.client?.address" label="adresas" />

      <a :href="'tel:' + props.client?.phone">
        <BaseInput
          :disable="true"
          :name="props.client?.phone"
          label="telefono numeris"
          class="pointer-events-none"
        />
      </a>

      <a :href="'mailto:' + props.client?.email">
        <BaseInput
          :disable="true"
          :name="props.client?.email"
          label="elektroninis pastas"
          class="pointer-events-none print:hidden"
        />
      </a>
      <BaseInput
        v-if="props.location !== 'projects'"
        :disable="true"
        :name="props.creator?.username"
        label="Atsakingas"
      />
    </div>
  </div>
</template>
<style scoped></style>
