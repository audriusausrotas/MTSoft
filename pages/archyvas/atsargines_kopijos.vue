<script setup lang="ts">
definePageMeta({ layout: "archive" });

const useArchives = useArchivesStore();
</script>

<template>
  <ArchiveMain :data="useArchives.filteredBackup" location="backup" />
</template>
<style scoped></style>
