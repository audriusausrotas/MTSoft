<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const useCalculations = useCalculationsStore();
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useUser = useUserStore();

const saveHandler = async (): Promise<void> => {
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
    advance: false,
    orderNumber: "",
  };

  const data: any = await $fetch("/api/project", {
    method: "POST",
    body: newProject,
  });
  if (data.success) {
    useProjects.addProject(data.data);
    clearHandler();
    await navigateTo("/");
  }
};

const clearHandler = () => {
  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
};
</script>
<template>
  <div class="flex flex-wrap overflow-hidden border rounded-lg">
    <div class="flex-1">
      <ResultClient
        name="klientas"
        :value="useCalculations.client.username"
        class="capitalize border-b"
      />
      <ResultClient
        name="telefono numeris"
        :value="useCalculations.client.phone"
      />
    </div>
    <div class="flex-1">
      <ResultClient
        name="adresas"
        :value="useCalculations.client.address"
        class="capitalize border-b"
      />
      <ResultClient
        name="elektroninis paštas"
        :value="useCalculations.client.email"
      />
    </div>
  </div>

  <div class="flex gap-4 flex-wrap">
    <div class="flex gap-4">
      <BaseButton name="išsaugoti sąmatą" @click="saveHandler" />
      <BaseButton name="išvalyti viską" @click="clearHandler" />
    </div>
    <div class="flex gap-4">
      <BaseButton name="pridėti naują detalę" @click="useResults.addNew" />
      <BaseButton name="Pridėti naują darbą " @click="useResults.addNewWork" />
      <BaseButton
        name="Pritaikyti nuolaidą"
        width="w-60"
        @click="useResults.useDiscount()"
      />
    </div>
  </div>
</template>
<style scoped></style>
