<script setup lang="ts">
const props = defineProps(["client"]);
</script>

<template>
  <div class="flex flex-col gap-2 border p-4 rounded-lg border-dark-light">
    <p class="font-medium text-lg">Kliento Duomenys</p>
    <div class="flex gap-20">
      <p>Klientas: {{ props?.client?.username }}</p>
      <p>Adresas: {{ props?.client?.address }}</p>
      <a :href="'tel:' + props?.client?.phone">
        Telefonas: {{ props?.client?.phone }}
      </a>
      <a :href="'mailto:' + props?.client?.email">
        Pastas:
        {{ props.client?.email }}
      </a>
    </div>
  </div>
</template>
<style scoped></style>
