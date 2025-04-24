<script setup lang="ts">
definePageMeta({ layout: "archive" });

const archiveStore = useArchiveStore();
</script>

<template>
  <ArchiveMain :data="archiveStore.filteredUnconfirmed" location="unconfirmed" />
</template>
<style scoped></style>
