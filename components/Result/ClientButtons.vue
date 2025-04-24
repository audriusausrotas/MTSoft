<script setup lang="ts">
const emit = defineEmits(["onClear"]);
const resultsStore = useResultsStore();

const clearHandler = () => {
  emit("onClear");
};
</script>
<template>
  <div class="flex gap-4 flex-wrap lg:sticky top-0 z-40 bg-white py-4">
    <BaseButton name="pridėti naują detalę" @click="resultsStore.addNew" />
    <BaseButton name="Pridėti naują darbą " @click="resultsStore.addNewWork" />
    <BaseButton name="Pritaikyti nuolaidą" width="w-60" @click="resultsStore.useDiscount()" />
    <BaseButton name="išvalyti viską" @click="clearHandler" />
  </div>
</template>
<style scoped></style>
