<script setup lang="ts">
const props = defineProps(["values"]);
</script>

<template>
  <div class="flex gap-2 text-xl font-semibold justify-end">
    <div class="flex flex-col gap-2 w-fit rounded-lg p-4 shadow-lg">
      <div class="flex gap-2 justify-between">
        <p>Viso Savikaina:</p>
        <p>{{ props.values.cost?.toFixed(2) }} €</p>
      </div>
      <div class="flex gap-2 justify-between">
        <p>Viso Kaina:</p>
        <p>{{ props.values.price?.toFixed(2) }} €</p>
      </div>
      <div class="flex gap-2 justify-between">
        <p>Viso Pelnas:</p>
        <p>{{ props.values.profit?.toFixed(2) }} €</p>
      </div>
      <div class="flex gap-2 justify-between">
        <p>Viso Marža:</p>
        <p>{{ props.values.margin?.toFixed(2) }} %</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
