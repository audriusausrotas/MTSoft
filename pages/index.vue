<script setup lang="ts">
import ButtonWithConfirmation from "~/components/Base/ButtonWithConfirmation.vue";
import type { Project } from "~/data/interfaces";

const { setError, setIsError } = useError();
const useProjects = useProjectsStore();
const useSettings = useSettingsStore();
const user = useUserStore();

const username = user.user?.username;
useProjects.changeFilter(username ? username : "Visi");

const projects = computed(() => {
  const categories = {
    unconfirmed: [] as Project[],
    confirmed: [] as Project[],
    notAccepted: [] as Project[],
    accepted: [] as Project[],
    inMaking: [] as Project[],
    inWorks: [] as Project[],
    waiting: [] as Project[],
    mounted: [] as Project[],
    done: [] as Project[],
    finished: [] as Project[],
    other: [] as Project[],
  };

  useProjects?.filteredProjects.forEach((item) => {
    switch (item.status) {
      case "Nepatvirtintas":
        categories.unconfirmed.push(item);
        break;
      case "Patvirtintas":
        categories.confirmed.push(item);
        break;
      case "Netinkamas":
        categories.notAccepted.push(item);
        break;
      case "Tinkamas":
        categories.accepted.push(item);
        break;
      case "Gaminama":
        categories.inMaking.push(item);
        break;
      case "Montuojama":
        categories.inWorks.push(item);
        break;
      case "Laukiam Vartų":
        categories.waiting.push(item);
        break;
      case "Vartai Sumontuoti":
        categories.mounted.push(item);
        break;
      case "Pridavimas":
        categories.done.push(item);
        break;
      case "Baigtas":
        categories.finished.push(item);
        break;
      default:
        categories.other.push(item);
        break;
    }
  });

  return categories;
});

const users = [
  "Visi",
  ...new Set(
    useProjects?.projects
      ?.map((item) => {
        if (user?.users && item?.orderNumber) {
          const matchedUser = user.users.find((usr) =>
            usr?.username?.toLowerCase().startsWith(item.orderNumber.slice(0, 3).toLowerCase())
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

const removeUnconfirmed = async () => {
  const response: any = await $fetch("/api/removeUnconfirmed");
  if (response.success) {
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col w-full items-center gap-8">
    <div class="flex gap-4 flex-wrap w-full max-w-[1160px]">
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <BaseButton @click="newProjectHandler"> Naujas projektas </BaseButton>
          <BaseButtonWithConfirmation
            name="Išvalyti nepatvirtintus"
            @onConfirm="removeUnconfirmed"
          />
        </div>
        <div class="flex gap-4">
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
    </div>

    <div class="flex flex-col gap-4">
      <div
        v-if="projects.done.length"
        class="text-xl font-semibold p-2 bg-lime-400 rounded-lg text-center"
      >
        Pridavimas
      </div>
      <HomeProject
        v-for="(project, index) in projects.done"
        :key="project._id"
        :index="index"
        :length="projects.done.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.notAccepted.length"
        class="text-xl bg-red-600 font-semibold p-2 rounded-lg text-center"
      >
        Netinkami
      </div>
      <HomeProject
        v-for="(project, index) in projects.notAccepted"
        :key="project._id"
        :index="index"
        :length="projects.notAccepted.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.accepted.length"
        class="text-xl font-semibold p-2 bg-pink-400 rounded-lg text-center"
      >
        Tinkami
      </div>
      <HomeProject
        v-for="(project, index) in projects.accepted"
        :key="project._id"
        :index="index"
        :length="projects.accepted.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.unconfirmed.length"
        class="text-xl font-semibold p-2 bg-orange-300 rounded-lg text-center"
      >
        Nepatvirtinti
      </div>
      <HomeProject
        v-for="(project, index) in projects.unconfirmed"
        :key="project._id"
        :index="index"
        :length="projects.unconfirmed.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.confirmed.length"
        class="text-xl font-semibold p-2 bg-green-400 rounded-lg text-center"
      >
        Patvirtinti
      </div>
      <HomeProject
        v-for="(project, index) in projects.confirmed"
        :key="project._id"
        :index="index"
        :length="projects.confirmed.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.inMaking.length"
        class="text-xl font-semibold p-2 bg-teal-400 rounded-lg text-center"
      >
        Gaminama
      </div>
      <HomeProject
        v-for="(project, index) in projects.inMaking"
        :key="project._id"
        :index="index"
        :length="projects.inMaking.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.inWorks.length"
        class="text-xl font-semibold p-2 bg-indigo-400 rounded-lg text-center"
      >
        Montuojama
      </div>
      <HomeProject
        v-for="(project, index) in projects.inWorks"
        :key="project._id"
        :index="index"
        :length="projects.inWorks.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.waiting.length"
        class="text-xl font-semibold p-2 bg-rose-400 rounded-lg text-center"
      >
        Laukiam vartų
      </div>
      <HomeProject
        v-for="(project, index) in projects.waiting"
        :key="project._id"
        :index="index"
        :length="projects.waiting.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.mounted.length"
        class="text-xl font-semibold p-2 bg-violet-400 rounded-lg text-center"
      >
        Vartai sumontuoti
      </div>
      <HomeProject
        v-for="(project, index) in projects.mounted"
        :key="project._id"
        :index="index"
        :length="projects.mounted.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.finished.length"
        class="text-xl font-semibold p-2 bg-gray-400 rounded-lg text-center"
      >
        Baigti
      </div>
      <HomeProject
        v-for="(project, index) in projects.finished"
        :key="project._id"
        :index="index"
        :length="projects.finished.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.other.length"
        class="text-xl font-semibold p-2 bg-yellow-400 rounded-lg text-center"
      >
        Kiti
      </div>
      <HomeProject
        v-for="(project, index) in projects.other"
        :key="project._id"
        :index="index"
        :length="projects.other.length"
        :project="project"
        location="projects"
      />
    </div>
  </div>
</template>
<style scoped></style>
