<script setup lang="ts">
import { status } from "~/data/selectFieldData";
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
  <div>
    <PreviewNavigation />
    <div>
      <PreviewClient :client="offer?.client" />
      <div class="border rounded-lg p-4">
        <PreviewResults
          v-for="(result, index) in offer?.results"
          :key="result.id"
          :result="result"
          :index="index"
          class="flex gap-4"
        />
        <PreviewWorks
          v-for="(work, index) in offer?.works"
          :key="work.id"
          :work="work"
          :index="index"
          class="flex gap-4"
        />
        <BaseSelectField
          :values="status"
          id="orderStatus"
          :defaultValue="offer?.status"
          width="w-40"
          @onChange="(value: string) => statusHandler(value)
        "
        />
      </div>
    </div>
  </div>
</template>
