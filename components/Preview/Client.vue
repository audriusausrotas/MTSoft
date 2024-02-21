<script setup lang="ts">
const props = defineProps(["data"]);
// console.log(props.data);
</script>

<template>
  <div class="flex flex-col gap-2 border p-4 rounded-lg border-dark-light">
    <p class="font-medium text-lg">Kliento Duomenys</p>
    <div class="flex gap-20">
      <p>
        {{ props.data?.username }}
      </p>
      <p>
        {{ props.data?.address }}
      </p>
      <a :href="'tel:' + props.data?.phone">
        {{ props.data?.phone }}
      </a>
      <a :href="'mailto:' + props.data?.email">
        {{ props.data?.email }}
      </a>
    </div>
  </div>
</template>
<style scoped></style>
