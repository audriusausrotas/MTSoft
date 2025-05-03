<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Project } from "~/data/interfaces";

const projectsStore = useProjectsStore();
const route = useRoute();

const offer = ref<Project | null>(null);

const localOffer = projectsStore.projects.find((item) => item._id === route.params.id);
if (localOffer) {
  offer.value = localOffer;
}
if (!offer.value) {
  const remoteOffer = await fetchProject(route.params.id as string);
  if (remoteOffer) {
    offer.value = remoteOffer;
  }
}
</script>

<template>
  <div v-if="offer" class="flex flex-col gap-8">
    <PreviewMain :offer="offer" location="installation" />
  </div>
</template>
