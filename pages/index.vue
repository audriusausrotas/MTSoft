<script setup lang="ts">
const useProjects = useProjectsStore();
const useSettings = useSettingsStore();
const user = useUserStore();

const username = user.user?.username;
useProjects.changeFilter(username ? username : "Visi");

const users = [
  "Visi",
  ...new Set(
    useProjects?.projects
      ?.map((item) => {
        if (user?.users && item?.orderNumber) {
          const matchedUser = user.users.find((usr) =>
            usr?.username
              ?.toLowerCase()
              .startsWith(item.orderNumber.slice(0, 3).toLowerCase())
          );
          return matchedUser?.username;
        }
        return undefined;
      })
      .filter(Boolean)
  ),
];

const statusFilters = ["Visi", ...useSettings.selectValues.status];

const newProjectHandler = () => {
  const useResults = useResultsStore();
  const useCalculations = useCalculationsStore();
  const useBackup = useBackupStore();

  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
  useBackup.clearBackup();

  navigateTo("/skaiciuokle");
};
</script>

<template>
  <div class="flex flex-col w-full items-center gap-8">
    <div class="flex gap-4 flex-wrap w-full max-w-[1160px] justify-center">
      <div class="flex gap-4 items-end flex-1 justify-center flex-wrap">
        <BaseButton @click="newProjectHandler"> Naujas projektas </BaseButton>
        <BaseInput
          placeholder="Paieška"
          label="Paieška"
          width="flex-1"
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
          :defaultValue="username"
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
        location="projects"
      />
    </div>
  </div>
</template>
<style scoped></style>
