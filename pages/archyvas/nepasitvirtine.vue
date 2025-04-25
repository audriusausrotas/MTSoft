<script setup lang="ts">
definePageMeta({ layout: "archive" });

onBeforeMount(() => {
  fetchUnconfirmed();
});
</script>

<template>
  <ArchiveMain location="unconfirmed" />
</template>
<style scoped></style>
