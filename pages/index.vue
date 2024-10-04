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
        usr.username.toLowerCase().startsWith(item.orderNumber.slice(0, 3).toLowerCase())
      )!.username;
    })
  ),
];

const statusFilters = ["Visi", ...status];
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <div class="flex w-full gap-4 items-center flex-wrap justify-center">
      <div class="flex gap-4 items-end justify-center flex-wrap">
        <BaseButton>
          <NuxtLink to="/naujas">Naujas projektas</NuxtLink>
        </BaseButton>

        <BaseInput
          placeholder="Paieška"
          label="Paieška"
          width="w-60 "
          variant="light"
          @onChange="(value: string): void => useProjects.searchProjects(value)"
        >
          <NuxtImg
            src="/icons/search.svg"
            width="14"
            height="14"
            alt="search icon"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
        </BaseInput>
      </div>
      <div class="flex gap-4 justify-center flex-wrap">
        <BaseSelectField
          label="Vartotojas"
          :values="users"
          id="userFilter"
          :defaultValue="userLetters"
          width="w-60"
          @onChange="(value: string) => useProjects.changeFilter(value)
        "
        />
        <BaseSelectField
          label="Statusas"
          :values="statusFilters"
          id="statusFilter"
          :defaultValue="useProjects.selectedStatusFilter"
          width="w-60"
          @onChange="(value: string) => useProjects.changeStatusFilter(value)
          "
        />
      </div>
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
