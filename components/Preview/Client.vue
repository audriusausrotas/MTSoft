<script setup lang="ts">
const props = defineProps(["offer"]);
</script>

<template>
  <div class="flex flex-col gap-12 justify-evenly flex-wrap  ">
    <div class="font-semibold text-3xl flex justify-evenly w-full">
      <h3>
        Pasiūlymo Nr.: {{ props.offer?.orderNumber }}
      </h3>
      <h6>Atsakingas: {{ props.offer.creator.username }}</h6>
    </div>
    <div class="flex gap-4 justify-center flex-wrap">
      <BaseInput :disable="true" :name="props.offer?.client?.username" label="klientas" />
      <BaseInput :disable="true" :name="props.offer?.client?.address" label="adresas" />

      <a :href="'tel:' + props.offer?.client?.phone">
        <BaseInput :disable="true" :name="props.offer?.client?.phone" label="telefono numeris"
          class="pointer-events-none" />
      </a>
      <a :href="'mailto:' + props.offer?.client?.email">
        <BaseInput :disable="true" :name="props.offer?.client?.email" label="elektroninis pastas"
          class="pointer-events-none print:hidden" />
      </a>

    </div>
  </div>
</template>
<style scoped></style>
