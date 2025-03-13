<script setup lang="ts">
const props = defineProps(["location", "_id"]);

const useProjects = useProjectsStore();
const useArchives = useArchivesStore();
const useResults = useResultsStore();
const useCalculations = useCalculationsStore();
const useBackup = useBackupStore();

const { setError, setIsError } = useError();

const deleteHandler = async (): Promise<void> => {
  const confirmed = confirm("Ar tikrai norite ištrinti projektą?");
  if (!confirmed) return;

  const response: any = await $fetch(
    props.location === "projects" ? "/api/project" : "/api/archive",
    {
      method: "delete",
      body: { _id: props._id, location: props.location },
    }
  );
  if (response.success) {
    props.location === "projects"
      ? useProjects.deleteProject(props._id)
      : useArchives.deleteArchive(props._id, props.location);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const editHandler = async () => {
  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
  useBackup.clearBackup();

  const response: any = await $fetch("/api/projectSingle", {
    method: "post",
    body: { _id: props._id },
  });
  if (response.success) {
    useProjects.addProject(response.data);
  }

  useCalculations.setProject({
    client: response.data.client,
    fenceMeasures: response.data.fenceMeasures,
    retail: response.data.retail,
  });
  useResults.setProject(response.data);
  useBackup.addBackup(response.data.results, response.data.works);
  useProjects.setSelectedProject(response.data._id);
  navigateTo("/skaiciuokle");
};

const linkHandler = () => {
  navigator.clipboard
    .writeText("https://mtsoft.lt/pasiulymas/" + props._id)
    .then(() => {
      setIsError(false);
      setError("Nuoroda nukopijuota");
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
  const data: any = await $fetch("/api/project", {
    method: "post",
    body: { _id: props._id },
  });
  if (data.success) {
    useProjects.copyProject(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const archiveHandler = async () => {
  const data: any = await $fetch("/api/archive", {
    method: props.location === "projects" ? "post" : "patch",
    body: { _id: props._id, location: props.location },
  } as any);
  if (data.success) {
    if (props.location === "projects") {
      useProjects.deleteProject(props._id);
    } else {
      useArchives.deleteArchive(props._id, props.location);
    }
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const extendHandler = async () => {
  const data: any = await $fetch("/api/projectExtend", {
    method: "post",
    body: { _id: props._id },
  } as any);
  if (data.success) {
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const unconfirmedHandler = async () => {
  const data: any = await $fetch("/api/unconfirmed", {
    method: "post",
    body: { _id: props._id },
  });

  if (data.success) {
    useProjects.deleteProject(props._id);

    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
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
      <NuxtImg
        src="/icons/document-forward.svg"
        alt="edit button"
        width="20"
        height="20"
      />
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
      <NuxtImg
        src="/icons/edit-2.svg"
        alt="edit button"
        width="20"
        height="20"
      />
      <p>Redaguoti</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="copyHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg
        src="/icons/pageflip.svg"
        alt="edit button"
        width="20"
        height="20"
      />
      <p>Kopijuoti projektą</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="extendHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg
        src="/icons/clock.svg"
        alt="edit button"
        width="20"
        height="20"
      />
      <p>Pratęsti galiojimą</p>
    </div>

    <div
      @click="archiveHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg
        src="/icons/archive-tick.svg"
        alt="archive button"
        width="20"
        height="20"
      />
      <p v-if="props.location === 'projects'">Archyvuoti</p>
      <p v-else>Sugrąžinti</p>
    </div>

    <div
      v-if="props.location === 'projects'"
      @click="unconfirmedHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg
        src="/icons/archive-book.svg"
        alt="archive button"
        width="20"
        height="20"
      />
      <p>Nepatvirtintas</p>
    </div>

    <div
      @click="deleteHandler"
      class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
    >
      <NuxtImg
        src="/icons/delete.svg"
        alt="delete button"
        width="20"
        height="20"
      />
      <p>Ištrinti</p>
    </div>
  </div>
</template>
<style scoped></style>
