<script setup lang="ts">
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);
</script>

<template>
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
    </div>
    <!-- <PreviewFences :data="offer.value?.fenceMeasures" /> -->
  </div>
</template>
