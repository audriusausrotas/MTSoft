<script setup lang="ts">
definePageMeta({ layout: "archive" });

const useArchives = useArchivesStore();
</script>

<template>
  <ArchiveMain :data="useArchives.filteredUnconfirmed" location="unconfirmed" />
</template>
<style scoped></style>
