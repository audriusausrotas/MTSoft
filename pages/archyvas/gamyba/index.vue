<script setup lang="ts">
definePageMeta({ layout: "archive" });

onBeforeMount(() => {
  fetchProductionArchive();
});
</script>

<template>
  <ArchiveMain location="production" />
</template>
<style scoped></style>
