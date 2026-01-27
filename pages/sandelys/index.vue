<script setup lang="ts">
const { setError, setSuccess } = useCustomError();
const projectsStore = useProjectsStore();

const searchQuery = ref<string>("");

const projects = computed(() => {
  if (searchQuery.value.length < 2) return projectsStore.getConfirmed;
  return projectsStore.searchGetConfirmed(searchQuery.value);
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <BaseInput
      placeholder="Paieška"
      label="Paieška"
      width="flex-1"
      variant="light"
      @onChange="(value: string) => (searchQuery = value)"
    >
      <NuxtImg
        src="/icons/search.svg"
        width="14"
        height="14"
        alt="search icon"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
    </BaseInput>

    <WarehouseMain
      v-for="(project, index) in projects"
      :key="project._id"
      :index="index"
      :length="projects.length"
      :project="project"
    />
  </div>
</template>

<style scoped></style>
