<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const props = defineProps(["worker", "date"]);

const useProjects = useProjectsStore();

const selectedProject = ref<Project | null>(null);
const modalOpen = ref<boolean>(false);
const searchValue = ref<string>("");

const clickHandler = () => {
  modalOpen.value = true;
};

const selectHandler = (value: Project) => {
  modalOpen.value = false;
  selectedProject.value = value;
};
</script>

<template>
  <span @click="clickHandler" class="hover:cursor-pointer">{{ props.worker.lastName }}</span>
  <span @click="clickHandler" class="hover:cursor-pointer">
    {{ selectedProject?.client.address }}</span
  >

  <div v-if="modalOpen" class="absolute top-0 left-0 w-full min-w-96 z-50 rounded-lg">
    <BaseSearchFieldProduction
      width="w-full"
      :data="useProjects.projects"
      :name="searchValue"
      @onChange="(value) => (searchValue = value)"
      @modalClose="modalOpen = false"
      @onClick="selectHandler"
    />
  </div>
</template>

<style scoped></style>
