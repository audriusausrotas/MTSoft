<script setup lang="ts">
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.archive.find((item) => item._id === route.params.id);
</script>
<template>
  <div class="flex flex-col gap-4">
    <PreviewClient :client="offer?.client" />
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
