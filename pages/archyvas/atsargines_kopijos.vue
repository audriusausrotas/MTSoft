<script setup lang="ts">
definePageMeta({ layout: "archive" });

onBeforeMount(() => {
  fetchBackup();
});
</script>

<template>
  <ArchiveMain location="backup" />
</template>
<style scoped></style>
