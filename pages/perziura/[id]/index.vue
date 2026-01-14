<script setup lang="ts">
const projectsStore = useProjectsStore();
const route = useRoute();

const offer = computed(() => projectsStore.projects.find((item) => item._id === route.params.id));
</script>

<template>
  <div class="flex flex-col gap-8">
    <PreviewMain :offer="offer" location="projects" />
  </div>
</template>
