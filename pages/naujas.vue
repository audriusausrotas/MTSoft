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
  };
  try {
    const data: any = await $fetch("/api/project", {
      method: useProjects.selectedProject ? "put" : "post",
      body: newProject,
    });
    if (data.success) {
      await navigateTo("/");
      clearHandler();
      setIsError(false);
      setError(data.message);
    } else {
      setError(data.message);
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
    <div
      class="flex w-full text-center border border-dark-light rounded-lg overflow-hidden divide-x divide-dark-light"
    >
      <div
        @click="skaiciuokle = true"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer min-w-28 hover:bg-red-600 hover:text-white"
        :class="skaiciuokle ? 'bg-red-full text-white' : ''"
      >
        Skaičiuotklė
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
