<script setup lang="ts">
const emit = defineEmits(["onClear"]);
const useResults = useResultsStore();

const clearHandler = () => {
  emit("onClear");
};
</script>
<template>
  <div class="flex gap-4 flex-wrap lg:sticky top-0 z-40 bg-white py-4">
    <BaseButton name="pridėti naują detalę" @click="useResults.addNew" />
    <BaseButton name="Pridėti naują darbą " @click="useResults.addNewWork" />
    <BaseButton name="Pritaikyti nuolaidą" width="w-60" @click="useResults.useDiscount()" />
    <BaseButton name="išvalyti viską" @click="clearHandler" />
  </div>
</template>
<style scoped></style>
