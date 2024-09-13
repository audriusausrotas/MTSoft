<script setup lang="ts">
const useProjects = useProjectsStore();
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseInput placeholder="Paieška" label="Paieška" width="w-full" class="pr-16 flex-1" variant="light" @onChange="(value: string): void =>
      useProjects.searchArchive(value)
      ">
      <NuxtImg src="/icons/search.svg" width="14" height="14" alt="search icon" decoding="auto" loading="lazy"
        :ismap="true" />
    </BaseInput>
    <HomeProject v-for="(project, index) in useProjects?.filteredArchives" :key="project._id" :index="index"
      :length="useProjects.filteredArchives.length" :project="project" :archive="true" />
  </div>
</template>
<style scoped></style>
