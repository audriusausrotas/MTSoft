<script setup lang="ts">
definePageMeta({ layout: "archive" });

const useArchives = useArchivesStore();
</script>

<template>
  <ArchiveMain :data="useArchives.filteredDeleted" location="deleted" />
</template>
<style scoped></style>
