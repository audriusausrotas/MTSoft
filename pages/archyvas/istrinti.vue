<script setup lang="ts">
definePageMeta({ layout: "archive" });

const archiveStore = useArchiveStore();
</script>

<template>
  <ArchiveMain :data="archiveStore.filteredDeleted" location="deleted" />
</template>
<style scoped></style>
