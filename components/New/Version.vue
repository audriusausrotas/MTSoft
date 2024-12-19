<script setup lang="ts">
const props = defineProps(["version", "index", "projectId"]);
const useCalculations = useCalculationsStore();
const useResults = useResultsStore();
const useProjects = useProjectsStore();
const useBackup = useBackupStore();
const { setError, setIsError } = useError();

const open = ref<boolean>(false);

const versionsHandler = () => {
  open.value = false;
  window.open("/archyvas/" + props.version.id, "_blank");
};

const returnHandler = async () => {
  const response: any = await $fetch("/api/rollbackVersion", {
    method: "post",
    body: { _id: props.version.id, projectId: props.projectId },
  });

  if (response.success) {
    useCalculations.clearAll();
    useResults.clearAll();
    useProjects.clearSelected();
    useBackup.clearBackup();

    response.data._id = props.projectId;

    useProjects.addProject(response.data);
    useCalculations.setProject({
      client: response.data.client,
      fenceMeasures: response.data.fenceMeasures,
      retail: response.data.retail,
    });
    useResults.setProject(response.data);
    useBackup.addBackup(response.data.results, response.data.works);
    useProjects.setSelectedProject(props.projectId);
  }
  open.value = false;
};

const deleteHandler = async () => {
  const response: any = await $fetch("/api/version", {
    method: "delete",
    body: { _id: props.version.id, projectId: props.projectId },
  });

  if (response.success) {
    useProjects.updateStatus(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }

  open.value = false;
};
</script>

<template>
  <div class="relative">
    <div
      class="flex gap-4 border rounded-md py-1 w-40 px-4 border-dark-full hover:bg-red-600 hover:text-white hover:cursor-pointer"
      @click="open = !open"
    >
      <p>V.{{ index }}</p>
      <p>{{ version.date.slice(0, 10) }}</p>
    </div>
    <div
      v-if="open"
      class="absolute top-8 left-0 border rounded-md border-dark-full bg-white z-50 w-40 overflow-hidden"
    >
      <div
        @click="versionsHandler"
        class="py-1 px-2 hover:bg-red-600 hover:text-white hover:cursor-pointer"
      >
        Atidaryti
      </div>
      <div
        @click="returnHandler"
        class="py-1 px-2 hover:bg-red-600 hover:text-white hover:cursor-pointer"
      >
        Sugrąžinti
      </div>
      <div
        @click="deleteHandler"
        class="py-1 px-2 hover:bg-red-600 hover:text-white hover:cursor-pointer"
      >
        Ištrinti
      </div>
    </div>
  </div>
</template>
<style scoped></style>
