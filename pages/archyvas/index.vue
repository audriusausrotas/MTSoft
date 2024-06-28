<script setup lang="ts">
const useProjects = useProjectsStore();
</script>

<template>
  <div class="flex flex-col gap-4">
    <HomeProject v-for="(project, index) in useProjects?.archive" :key="project._id" :index="index"
      :length="useProjects.archive.length" :project="project" :archive="true" />
  </div>
</template>
<style scoped></style>
