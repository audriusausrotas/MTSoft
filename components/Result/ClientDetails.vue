<script setup lang="ts">
import type { ResponseProject, Project } from "~/data/interfaces";

const useCalculations = useCalculationsStore();
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useUser = useUserStore();

const saveHandler = async (): Promise<void> => {
  const newProject: Project = {
    _id: "",
    creator: useUser.user!.username,
    client: useCalculations.client,
    fenceMeasures: useCalculations.fences,
    results: useResults.results,
    confirmed: false,
    payed: false,
    status: "nepatvirtintas",
    advance: false,
    orderNumber: "",
    calculatedParts: {
      fences: useResults.fences,
      poles: useResults.poles,
      gatePoles: useResults.gatePoles,
      borders: useResults.borders,
      borderHolders: useResults.borderHolders,
      rivets: useResults.rivets,
      crossbars: useResults.crossbars,
      crossbarHolders: useResults.crossbarHolders,
      totalElements: useResults.totalElements,
      bindingsLength: useResults.bindingsLength,
      segments: useResults.segments,
      segmentHolders: useResults.segmentHolders,
      gates: useResults.gates,
      totalPrice: useResults.totalPrice,
      totalCost: useResults.totalCost,
      totalProfit: useResults.totalProfit,
      totalMargin: useResults.totalMargin,
    },
  };

  const data: ResponseProject = await $fetch("/api/Project", {
    method: "post",
    body: newProject,
  });
  if (data.success) {
    useProjects.addProject(data.data);
    useResults.clearAll();
    useCalculations.clearAll();
  }
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
  <div class="flex gap-4">
    <BaseButton name="pridėti naują detalę" @click="useResults.addNew" />
    <BaseButton name="išsaugoti sąmatą" @click="saveHandler" />
  </div>
</template>
<style scoped></style>
