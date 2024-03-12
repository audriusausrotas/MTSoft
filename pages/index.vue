<script setup lang="ts">
import { status } from "~/data/selectFieldData";
const useProjects = useProjectsStore();
const user = useUserStore();

const userLetters = user.user?.username.substring(0, 3).toUpperCase();
useProjects.changeFilter(userLetters ? userLetters : "Visi");

const users = [
  "Visi",
  ...new Set(useProjects.projects.map((item) => item.orderNumber.slice(0, 3))),
];

const statusFilters = ["Visi", ...status];
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-8">
      <BaseSelectField
        label="Vartotojas"
        :values="users"
        id="userFilter"
        :defaultValue="userLetters"
        width="w-24"
        @onChange="(value: string) => useProjects.changeFilter(value) 
        "
      />
      <BaseSelectField
        label="statusas"
        :values="statusFilters"
        id="statusFilter"
        :defaultValue="useProjects.selectedStatusFilter"
        width="w-40"
        @onChange="(value: string) => useProjects.changeStatusFilter(value) 
        "
      />
    </div>
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
