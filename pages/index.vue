<script setup lang="ts">
import { status } from "~/data/selectFieldData";
const useProjects = useProjectsStore();
const user = useUserStore();

const userLetters = user.user?.username;
useProjects.changeFilter(userLetters ? userLetters : "Visi");

const users = [
  "Visi",
  ...new Set(
    useProjects.projects.map((item) => {
      return user.users.find((usr) =>
        usr.username
          .toLowerCase()
          .startsWith(item.orderNumber.slice(0, 3).toLowerCase())
      )!.username;
    })
  ),
];

const statusFilters = ["Visi", ...status];
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 flex-wrap">
      <BaseSelectField label="Vartotojas" :values="users" id="userFilter" :defaultValue="userLetters" width="w-40"
        @onChange="(value: string) => useProjects.changeFilter(value)
        " />
      <BaseSelectField label="statusas" :values="statusFilters" id="statusFilter"
        :defaultValue="useProjects.selectedStatusFilter" width="w-40" @onChange="(value: string) => useProjects.changeStatusFilter(value)
        " />
      <BaseInput placeholder="Paieška" label="Paieška" width="w-96" variant="light" @onChange="(value: string): void =>
        useProjects.searchProjects(value)
        " />
    </div>

    <div class="flex flex-col gap-4">
      <HomeProject v-for="(project, index) in useProjects.filteredProjects" :key="project._id" :index="index"
        :length="useProjects.filteredProjects.length" :project="project" />
    </div>

  </div>
</template>
<style scoped></style>
