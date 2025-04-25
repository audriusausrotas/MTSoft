<script setup lang="ts">
definePageMeta({ layout: "archive" });

onBeforeMount(() => {
  fetchDeleted();
});
</script>

<template>
  <ArchiveMain location="deleted" />
</template>
<style scoped></style>
