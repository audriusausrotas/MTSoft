<script setup lang="js">
import { useAllProjectsStore } from "../store/allProjects";
const useAllProjects = useAllProjectsStore();

</script>

<template>
  <div class="flex flex-col gap-4">
    <HomeProject v-for="project, index in useAllProjects.allProjects" :key="project._id" :index="index"
      :project="project" />
  </div>
</template>
<style scoped></style>
