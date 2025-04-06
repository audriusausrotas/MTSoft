<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const useCalculations = useCalculationsStore();
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useBackup = useBackupStore();
const useUser = useUserStore();

const { setError, setIsError } = useError();

const skaiciuokle = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const project = computed(() => {
  return useProjects.projects.find((item) => item._id === useProjects.selectedProject);
});

const saveHandler = async (): Promise<void> => {
  isLoading.value = true;
  const newProject: Project = {
    _id: useProjects.selectedProject ? useProjects.selectedProject : "",
    creator: {
      username: useUser.user!.username,
      lastName: useUser.user!.lastName,
      email: useUser.user!.email,
      phone: useUser.user!.phone,
    },
    client: useCalculations.client,
    fenceMeasures: useCalculations.fences,
    results: useResults.results,
    works: useResults.works,
    gates: useResults.gates,
    retail: useCalculations.retail,
    totalPrice: useResults.totalPrice,
    totalCost: useResults.totalCost,
    totalProfit: useResults.totalProfit,
    totalMargin: useResults.totalMargin,
    priceVAT: useResults.priceVAT,
    priceWithDiscount: useResults.priceWithDiscount,
    discount: useResults.discount,
    dateCreated: "",
    dateExparation: "",
    status: "Nepatvirtintas",
    advance: 0,
    orderNumber: "",
    files: [],
    comments: [],
    versions: [],
  };
  try {
    let response;
    if (useProjects.selectedProject) response = await request.patch("updateProject", newProject);
    else response = await request.post("newProject", newProject);

    if (response.success) {
      !useSocketStore().connected && useProjects.addProject(response.data);
      clearHandler();
      setIsError(false);
      setError(response.message);
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
  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
  useBackup.clearBackup();
};
</script>

<template>
  <div class="flex flex-col w-full items-center gap-10 select-none">
    <div v-if="project && project.versions.length > 0" class="flex gap-4 w-full flex-wrap">
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
