<script setup lang="ts">
definePageMeta({ layout: "archive" });

const archiveStore = useArchiveStore();
</script>

<template>
  <ArchiveMain :data="archiveStore.filteredBackup" location="backup" />
</template>
<style scoped></style>
