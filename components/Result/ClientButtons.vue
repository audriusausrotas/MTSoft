<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const { setError, setIsError } = useError();
const useCalculations = useCalculationsStore();
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useUser = useUserStore();
const useBackup = useBackupStore()
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
    totalPrice: useResults.totalPrice,
    totalCost: useResults.totalCost,
    totalProfit: useResults.totalProfit,
    totalMargin: useResults.totalMargin,
    priceVAT: useResults.priceVAT,
    priceWithDiscount: useResults.priceWithDiscount,
    discount: useResults.discount,
    dateCreated: "",
    dateExparation: "",
    confirmed: false,
    payed: false,
    status: "Nepatvirtintas",
    advance: 0,
    orderNumber: "",
    files: []
  };
  try {
    const data: any = await $fetch("/api/project", {
      method: useProjects.selectedProject ? "put" : "post",
      body: newProject,
    });
    if (data.success) {
      useProjects.addProject(data.data);
      clearHandler();
      setIsError(false);
      setError(data.message);
      await navigateTo("/");
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
  useBackup.clearBackup()
};


</script>
<template>


  <div class="flex gap-4 flex-wrap lg:sticky top-0 z-40 bg-white py-4 border-b ">
    <div class="flex gap-4">
      <BaseButton name="išsaugoti sąmatą" @click="saveHandler" :isLoading="isLoading" />
      <BaseButton name="išvalyti viską" @click="clearHandler" />
    </div>
    <div class="flex gap-4">
      <BaseButton name="pridėti naują detalę" @click="useResults.addNew" />
      <BaseButton name="Pridėti naują darbą " @click="useResults.addNewWork" />
      <BaseButton name="Pritaikyti nuolaidą" width="w-60" @click="useResults.useDiscount()" />
    </div>
  </div>
</template>
<style scoped></style>
