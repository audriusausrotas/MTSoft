<script setup lang="ts">
const useProjects = useProjectsStore();
const user = useUserStore();

const userLetters = user.user?.username.substring(0, 3).toUpperCase();
useProjects.changeFilter(userLetters ? userLetters : "Visi");

const users = [
  "Visi",
  ...new Set(useProjects.projects.map((item) => item.orderNumber.slice(0, 3))),
];
</script>

<template>
  <div class="flex flex-col gap-8">
    <BaseSelectField
      label="Vartotojas"
      :values="users"
      id="fenceSide"
      :defaultValue="userLetters"
      width="w-24"
      @onChange="(value: string) => useProjects.changeFilter(value) 
        "
    />
    <div class="flex flex-col gap-4">
      <HomeProject
        v-for="(project, index) in useProjects.filteredProjects"
        :key="project._id"
        :index="index"
        :length="useProjects.filteredProjects.length"
        :project="project"
      />
    </div>
  </div>
</template>
<style scoped></style>
