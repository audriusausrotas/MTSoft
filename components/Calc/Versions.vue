<script setup lang="ts">
const props = defineProps(["version", "index", "projectId"]);
const calculationsStore = useCalculationsStore();
const resultsStore = useResultsStore();
const projectsStore = useProjectsStore();
const backupStore = useBackupStore();
const { setError, setSuccess } = useCustomError();

const open = ref<boolean>(false);

const versionsHandler = () => {
  open.value = false;
  window.open("/pasiulymai/" + props.version.id, "_blank");
};

const returnHandler = async () => {
  const requestData = { _id: props.version.id, projectId: props.projectId };

  const response: any = await request.patch("versionRollback", requestData);

  if (response.success) {
    calculationsStore.clearAll();
    resultsStore.clearAll();
    projectsStore.clearSelected();
    backupStore.clearBackup();

    response.data._id = props.projectId;

    projectsStore.addProject(response.data);

    calculationsStore.setProject({
      client: response.data.client,
      fenceMeasures: response.data.fenceMeasures,
      retail: response.data.retail,
    });

    resultsStore.setProject(response.data);

    backupStore.addBackup(response.data.results, response.data.works);

    projectsStore.setSelectedProject(props.projectId);
  }
  open.value = false;
};

const deleteHandler = async () => {
  const requestData = { _id: props.version.id, projectId: props.projectId };

  const response: any = await request.delete("deleteVersion", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.deleteVersion(response.data._id, response.data.projectId);

    setSuccess(response.message);
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
