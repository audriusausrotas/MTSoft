<script setup lang="ts">
const useProjects = useProjectsStore();
const user = useUserStore();

const userLetters = user.user?.username.substring(0, 3).toUpperCase();
const filteredProjects = ref();
const users = [
  "Visi",
  ...new Set(useProjects.projects.map((item) => item.orderNumber.slice(0, 3))),
];

const filterProjects = (value: string) => {
  if (value === "Visi") filteredProjects.value = useProjects.projects;
  else
    filteredProjects.value = useProjects.projects.filter((item) =>
      item.orderNumber.startsWith(value)
    );
};

filterProjects(userLetters as string);
</script>

<template>
  <div class="flex flex-col gap-8">
    <BaseSelectField
      label="Vartotojas"
      :values="users"
      id="fenceSide"
      :defaultValue="userLetters"
      width="w-24"
      @onChange="(value: string) => filterProjects(value) 
        "
    />
    <div class="flex flex-col gap-4">
      <HomeProject
        v-for="(project, index) in filteredProjects"
        :key="project._id"
        :index="index"
        :length="useProjects.projects.length"
        :project="project"
      />
    </div>
  </div>
</template>
<style scoped></style>
