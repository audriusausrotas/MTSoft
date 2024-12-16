<script setup lang="ts">
definePageMeta({ layout: "archive" });

const useArchives = useArchivesStore();
</script>

<template>
  <ArchiveMain :data="useArchives.filteredArchives" location="archive" />
</template>
<style scoped></style>
