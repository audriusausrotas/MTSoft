<script setup lang="ts">
definePageMeta({ layout: "archive" });

const archiveStore = useArchiveStore();
</script>

<template>
  <ArchiveMain :data="archiveStore.filteredArchives" location="archive" />
</template>
<style scoped></style>
