<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const props = defineProps(["location", "_id"]);

const projectsStore = useProjectsStore();
const archiveStore = useArchiveStore();
const resultsStore = useResultsStore();
const calculationsStore = useCalculationsStore();
const backupStore = useBackupStore();

const { setError, setSuccess } = useError();

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti projektą?");
  if (!confirmed) return;

  const requestData = { _id: props._id, location: props.location };

  let response;

  if (props.location === "projects") response = await request.delete(`deleteProject/${props._id}`);
  else response = await request.delete("deleteArchive", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      props.location === "projects"
        ? projectsStore.deleteProject(response.data._id)
        : archiveStore.deleteArchive(response.data._id, response.data.location);
    }

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const editHandler = async () => {
  calculationsStore.clearAll();
  resultsStore.clearAll();
  projectsStore.clearSelected();
  backupStore.clearBackup();
  resultsStore.discount = false;

  const project: Project | undefined = projectsStore.projects.find(
    (project) => project._id === props._id
  );

  if (!project) {
    setError("Projektas nerastas");
    return;
  }

  calculationsStore.setProject({
    client: project?.client,
    fenceMeasures: project?.fenceMeasures,
    retail: project?.retail,
    units: project?.results[0]?.units,
  });

  resultsStore.setProject(project);
  backupStore.addBackup(project.results, project.works);
  projectsStore.setSelectedProject(project._id ? project._id : "");
  resultsStore.initialize(true);
  navigateTo("/skaiciuokle");
};

const linkHandler = () => {
  navigator.clipboard
    .writeText("https://mtsoft.lt/pasiulymas/" + props._id)
    .then(() => {
      setSuccess("Nuoroda nukopijuota");
    })
    .catch((error) => {
      setError("Klaida: " + error);
    });
};

const previewHandler = () => {
  navigateTo("/perziura/" + props._id);
};

const openInNewHandler = () => {
  if (props.location === "projects") {
    window.open("https://mtsoft.lt/pasiulymas/" + props._id, "_blank");
  } else {
    window.open("/archyvas/" + props._id, "_blank");
  }
};

const copyHandler = async () => {
  const response: any = await request.post("newProject", { _id: props._id });

  if (response.success) {
    !useSocketStore().connected && projectsStore.addProject(response.data);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const archiveHandler = async () => {
  const requestData = { _id: props._id, location: props.location };

  let response;

  if (props.location === "projects") response = await request.post(`addArchive/${props._id}`);
  else response = await request.patch("restoreArchive", requestData);
  if (response.success) {
    if (!useSocketStore().connected) {
      if (props.location === "projects") {
        archiveStore.addArchive("archive", response.data);
        projectsStore.deleteProject(response.data._id);
      } else {
        projectsStore.addProject(response.data.data);
        archiveStore.deleteArchive(response.data.data._id, response.data.location);
      }
    }

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const extendHandler = async () => {
  const response: any = await request.patch(`extendExparationDate/${props._id}`);

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.updateProjectDates(
        response.data._id,
        "dateExparation",
        response.data.dateExparation
      );

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const unconfirmedHandler = async () => {
  const response: any = await request.post(`addUnconfirmed/${props._id}`);

  if (response.success) {
    if (!useSocketStore().connected) {
      archiveStore.addArchive("unconfirmed", response.data);
      projectsStore.deleteProject(response.data._id);
    }

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div
    class="absolute z-40 flex flex-col top-8 right-0 bg-white border select-none border-dark-light rounded-lg shadow-lg overflow-hidden w-48"
    :class="props.location !== 'projects' ? 'h-28' : 'h-64'"
  >
    <div
      @click="openInNewHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/document-forward.svg" alt="edit button" width="20" height="20" />
      <p>Atidaryti pasiūlymą</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="previewHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/eye.svg" alt="eye button" width="20" height="20" />
      <p>Peržiūrėti</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="linkHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/link.svg" alt="link button" width="20" height="20" />
      <p>Kopijuoti nuorodą</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="editHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/edit-2.svg" alt="edit button" width="20" height="20" />
      <p>Redaguoti</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="copyHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/pageflip.svg" alt="edit button" width="20" height="20" />
      <p>Kopijuoti projektą</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="extendHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/clock.svg" alt="edit button" width="20" height="20" />
      <p>Pratęsti galiojimą</p>
    </div>

    <div
      @click="archiveHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/archive-tick.svg" alt="archive button" width="20" height="20" />
      <p v-if="props.location === 'projects'">Archyvuoti</p>
      <p v-else>Sugrąžinti</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="unconfirmedHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/archive-book.svg" alt="archive button" width="20" height="20" />
      <p>Nepatvirtintas</p>
    </div>

    <div
      @click="deleteHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg src="/icons/delete.svg" alt="delete button" width="20" height="20" />
      <p>Ištrinti</p>
    </div>
  </div>
</template>
<style scoped></style>
