<script setup lang="ts">
const props = defineProps(["offer"]);
</script>

<template>
  <div class="flex justify-evenly flex-wrap gap-8">
    <h3 class="text-3xl font-semibold">
      Pasiūlymo Nr.: {{ offer?.orderNumber }}
    </h3>
    <div class="flex gap-4 justify-center flex-wrap">
      <BaseInput
        :disable="true"
        :name="offer?.client?.username"
        label="klientas"
      />
      <BaseInput
        :disable="true"
        :name="offer?.client?.address"
        label="adresas"
      />

      <a :href="'tel:' + offer?.client?.phone">
        <BaseInput
          :disable="true"
          :name="offer?.client?.phone"
          label="telefono numeris"
          class="pointer-events-none"
        />
      </a>
      <a :href="'mailto:' + offer?.client?.email">
        <BaseInput
          :disable="true"
          :name="offer?.client?.email"
          label="elektroninis pastas"
          class="pointer-events-none"
        />
      </a>
    </div>
  </div>
</template>
<style scoped></style>
