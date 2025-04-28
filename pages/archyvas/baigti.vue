<script setup lang="ts">
definePageMeta({ layout: "archive" });

onBeforeMount(() => {
  fetchFinished();
});
</script>

<template>
  <ArchiveMain location="finished" />
</template>
<style scoped></style>
