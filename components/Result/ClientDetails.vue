<script setup lang="ts">
import { useProjectStore } from '../../store/project';
import { useResultsStore } from '../../store/results';
import { useUserStore } from "../../store/user"

const useProject = useProjectStore();
const useResults = useResultsStore();
const useUser = useUserStore()

const saveHandler = async (): Promise<void> => {

  const newProject = {
    creator: useUser.user?.username,
    client: useProject.client,
    fenceMeasures: useProject.fences,
    results: useResults.results,
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
    }
  };

  const data = await $fetch("/api/saveProject", {
    method: "post",
    body: newProject,
  })
  console.log(data)
};
</script>

<template>
  <div class="flex flex-wrap overflow-hidden border rounded-lg">
    <div class="flex-1">
      <ResultClient name="klientas" :value="useProject.client.username" class="capitalize border-b" />
      <ResultClient name="telefono numeris" :value="useProject.client.phone" />
    </div>
    <div class="flex-1">
      <ResultClient name="adresas" :value="useProject.client.address" class="capitalize border-b" />
      <ResultClient name="elektroninis paštas" :value="useProject.client.email" />
    </div>
  </div>
  <div class="flex gap-4">
    <BaseButton name="pridėti naują detalę" @click="useResults.addNew" />
    <BaseButton name="išsaugoti sąmatą" @click="saveHandler" />
  </div>
</template>
<style scoped></style>
