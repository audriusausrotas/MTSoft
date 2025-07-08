<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();

const offer: any = await request.get(`getArchive/${route.params.id}`);
</script>

<template>
  <PreviewOrder :offer="offer" />
</template>
<style scoped></style>
