<script setup lang="ts">
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);</script>

<template>
  <PreviewNavigation />
  <PreviewGamybai />
</template>
<style scoped></style>
