<script setup lang="ts">
const useProjects = useProjectsStore();
</script>

<template>
  <div class="flex flex-col gap-4">
    <HomeProject
      v-for="(project, index) in useProjects.projects"
      :key="project._id"
      :index="index"
      :project="project"
    />
  </div>
  <div></div>
</template>
<style scoped></style>
