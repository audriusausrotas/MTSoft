<script setup lang="ts">
const useProjects = useProjectsStore();
const { setError, setIsError } = useError();

const { data: archive }: any = await useFetch("/api/archive");
if (archive.value.success) {
  useProjects.addArchives([...archive.value.data]);
} else {
  setError(archive.value.message);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <HomeProject
      v-for="(project, index) in useProjects?.archive"
      :key="project._id"
      :index="index"
      :length="useProjects.archive.length"
      :project="project"
      :archive="true"
    />
  </div>
</template>
<style scoped></style>
