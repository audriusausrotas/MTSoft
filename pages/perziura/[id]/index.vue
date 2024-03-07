<script setup lang="ts">
import { status } from "~/data/selectFieldData";
definePageMeta({
  layout: "preview",
} as any);
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);

const statusHandler = (value: string) => {
  const data: any = $fetch("/api/project", {
    method: "PATCH",
    body: { _id: offer!._id, value },
  });
  if (data.success) {
    useProjects.updateStatus(data.data);
  }
};
</script>
<template>
  <div class="flex flex-col gap-4">
    <PreviewClient :client="offer?.client" />
    <div class="flex gap-4">
      <BaseSelectField
        :values="status"
        id="orderStatus"
        :defaultValue="offer?.status"
        label="Statusas"
        width="w-40"
        @onChange="(value: string) => statusHandler(value)
        "
      />
    </div>

    <div class="self-center font-semibold text-2xl">Medžiagos</div>
    <PreviewResults
      v-for="(result, index) in offer?.results"
      :key="result.id"
      :result="result"
      :index="index"
      class="flex gap-4"
    />
    <div class="self-center font-semibold text-2xl">Darbai</div>
    <PreviewWorks
      v-for="(work, index) in offer?.works"
      :key="work.id"
      :work="work"
      :index="index"
      class="flex gap-4"
    />
  </div>
</template>
