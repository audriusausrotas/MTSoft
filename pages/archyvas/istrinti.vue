<script setup lang="ts">
definePageMeta({ layout: "archive" });

fetchDeleted();
</script>

<template>
  <ArchiveMain location="deleted" />
</template>
<style scoped></style>
