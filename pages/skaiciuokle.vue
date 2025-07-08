<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const calculationsStore = useCalculationsStore();
const projectsStore = useProjectsStore();
const resultsStore = useResultsStore();
const backupStore = useBackupStore();
const userStore = useUserStore();

const { setError, setSuccess } = useError();

const skaiciuokle = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const project = computed(() => {
  return projectsStore.projects.find(
    (item) => item._id === projectsStore.selectedProject
  );
});

const saveHandler = async (): Promise<void> => {
  isLoading.value = true;
  const newProject: Project = {
    _id: projectsStore.selectedProject ? projectsStore.selectedProject : "",
    creator: {
      username: userStore.user!.username,
      lastName: userStore.user!.lastName,
      email: userStore.user!.email,
      phone: userStore.user!.phone,
    },
    client: calculationsStore.client,
    fenceMeasures: calculationsStore.fences,
    results: resultsStore.results,
    works: resultsStore.works,
    gates: resultsStore.gates,
    retail: calculationsStore.retail,
    totalPrice: resultsStore.totalPrice,
    totalCost: resultsStore.totalCost,
    totalProfit: resultsStore.totalProfit,
    totalMargin: resultsStore.totalMargin,
    priceVAT: resultsStore.priceVAT,
    priceWithDiscount: resultsStore.priceWithDiscount,
    discount: resultsStore.discount,
    status: "Nepatvirtintas",
    advance: 0,
    orderNumber: "",
    files: [],
    comments: [],
    versions: [],
    dates: {
      dateCreated: "",
      dateConfirmed: "",
      dateCompletion: "",
      dateExparation: "",
      dateArchieved: "",
    },
    workers: [],
  };
  try {
    let response;
    if (projectsStore.selectedProject)
      response = await request.patch("updateProject", newProject);
    else response = await request.post("newProject", newProject);

    if (response.success) {
      if (!useSocketStore().connected) {
        if (projectsStore.selectedProject)
          projectsStore.updateProject(response.data);
        else projectsStore.addProject(response.data);
      }

      clearHandler();
      setSuccess(response.message);
      await navigateTo("/");
    } else {
      setError(response.message);
    }
  } catch (error: any) {
    setError(error);
  }
  isLoading.value = false;
};

const clearHandler = () => {
  calculationsStore.clearAll();
  resultsStore.clearAll();
  projectsStore.clearSelected();
  backupStore.clearBackup();
};
</script>

<template>
  <div class="flex flex-col w-full items-center gap-10 select-none">
    <div
      v-if="project && project.versions.length > 0"
      class="flex gap-4 w-full flex-wrap"
    >
      <p class="font-medium text-xl">Projekto versijos:</p>
      <CalcVersions
        v-for="(version, index) in project.versions"
        :key="version.id"
        :version="version"
        :index="index"
        :projectId="project._id"
      />
    </div>
    <div
      class="flex w-full text-center border border-dark-light rounded-lg overflow-hidden divide-x divide-dark-light"
    >
      <div
        @click="skaiciuokle = true"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-600 hover:text-white"
        :class="skaiciuokle ? 'bg-red-full text-white' : ''"
      >
        Skaičiuoklė
      </div>
      <div
        @click="skaiciuokle = false"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-full hover:text-white"
        :class="skaiciuokle ? '' : 'bg-red-full text-white'"
      >
        Sąmata
      </div>
      <button
        @click="saveHandler"
        :isLoading="isLoading"
        class="bg-dark-full text-white flex-1 hover:bg-red-full"
      >
        Išsaugoti projektą
      </button>
    </div>
    <ResultClient />
    <CalcMain v-if="skaiciuokle" @onCalculate="skaiciuokle = false" />
    <ResultMain v-else @onClear="clearHandler" />
  </div>
</template>
<style scoped></style>
