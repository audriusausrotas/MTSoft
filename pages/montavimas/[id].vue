<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Project } from "~/data/interfaces";

const projectsStore = useProjectsStore();
const route = useRoute();

onMounted(async () => {
  const exists = projectsStore.projects.find((project) => project._id === route.params.id);
  if (!exists) {
    await fetchProject(route.params.id as string);
  }
});

const offer = computed<Project | null>(
  () => projectsStore.projects.find((project) => project._id === route.params.id) ?? null
);
</script>

<template>
  <div v-if="offer" class="flex flex-col gap-8">
    <PreviewMain :offer="offer" location="installation" />
  </div>
</template>
