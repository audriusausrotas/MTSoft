divdivaa
<script setup lang="ts">
import type { Version, Comment } from "~/data/interfaces";
const { setError, setIsError } = useError();

const projectsStore = useProjectsStore();
const route = useRoute();

const offer = computed(() => projectsStore.projects.find((item) => item._id === route.params.id));
</script>

<template>
  <div class="flex flex-col gap-8">
    <PreviewMain :offer="offer" location="warehouse" />
  </div>
</template>
