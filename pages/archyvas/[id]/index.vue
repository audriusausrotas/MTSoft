<script setup lang="ts">
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.archive.find((item) => item._id === route.params.id);
</script>
<template>
  <div class="flex flex-col gap-4">
    <PreviewClient :offer="offer" />
    <PreviewMain :offer="offer" />
  </div>
</template>
