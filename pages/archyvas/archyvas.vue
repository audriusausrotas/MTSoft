<script setup lang="ts">
definePageMeta({ layout: "archive" });

onBeforeMount(() => {
  fetchArchives();
});
</script>

<template>
  <ArchiveMain location="archive" />
</template>
<style scoped></style>
