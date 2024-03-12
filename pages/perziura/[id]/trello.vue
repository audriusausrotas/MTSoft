<script setup lang="ts">
definePageMeta({
  layout: "preview",
});
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);
</script>

<template>
  <div>trello</div>
</template>
<style scoped></style>
