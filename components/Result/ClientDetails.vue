<script setup lang="ts">
import type { Project } from "~/data/interfaces";
import { twoSided } from "~/data/selectFieldData";

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
    works: useResults.works,
    gates: useResults.gates,
    totalPrice: useResults.totalPrice,
    totalCost: useResults.totalCost,
    totalProfit: useResults.totalProfit,
    totalMargin: useResults.totalMargin,
    priceVAT: useResults.priceVAT,
    priceWithDiscount: useResults.priceWithDiscount,
    discount: useResults.discount,
    confirmed: false,
    payed: false,
    status: "nepatvirtintas",
    advance: false,
    orderNumber: "",
  };

  const data: any = await $fetch("/api/project", {
    method: "post",
    body: newProject,
  });
  if (data.success) {
    console.log(data.data);
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
    <BaseButton name="Pridėti naują darbą " @click="useResults.addNewWork" />
    <BaseButton name="išsaugoti sąmatą" @click="saveHandler" />

    <BaseSelectField
      label="Nuolaida"
      :values="twoSided"
      id="discount"
      :defaultValue="twoSided[1]"
      width="w-60"
      @onChange="(value: string) => useResults.useDiscount(value)
        "
    />
  </div>
</template>
<style scoped></style>
