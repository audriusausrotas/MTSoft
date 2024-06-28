<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const props = defineProps(["project", "index", "length", "archive"]);
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useCalculations = useCalculationsStore();
const useGates = useGateStore();
const useBackup = useBackupStore()
const open = ref<boolean>(false);
const gateOrdered = ref(false);

const { setError, setIsError } = useError();

const deleteHandler = async (): Promise<void> => {
  const response: any = await $fetch(
    props.archive ? "/api/archive" : "/api/project",
    {
      method: "DELETE",
      body: { _id: props.project._id },
    }
  );
  if (response.success) {
    props.archive
      ? useProjects.deleteArchive(props.project._id)
      : useProjects.deleteProject(props.project._id);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const editHandler = () => {
  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
  useBackup.clearBackup()
  useCalculations.setProject({
    client: props.project.client,
    fenceMeasures: props.project.fenceMeasures,
  });
  useResults.setProject(props.project);
  useBackup.addBackup(props.project.results, props.project.works)
  useProjects.setSelectedProject(props.project._id);
  navigateTo("/samata");
};

const linkHandler = () => {
  navigator.clipboard
    .writeText(
      "https://modernitvora.vercel.app/pasiulymas/" + props.project._id
    )
    .then(() => {
      setIsError(false);
      setError("Nuoroda nukopijuota");
    })
    .catch((error) => {
      setError("Klaida: " + error);
    });
};

const previewHandler = () => {
  props.archive
    ? navigateTo("/archyvas/" + props.project._id)
    : navigateTo("/perziura/" + props.project._id);
};

const openInNewHandler = () => {
  window.open(
    "https://modernitvora.vercel.app/pasiulymas/" + props.project._id,
    "_blank"
  );
};

const copyHandler = async () => {
  const newProject: Project = {
    ...props.project,
    _id: "",
    orderNumber: "",
    dateCreated: "",
    dateExparation: "",
    confirmed: false,
    payed: false,
    status: "Nepatvirtintas",
    advance: false,
  };

  try {
    const data: any = await $fetch("/api/project", {
      method: useProjects.selectedProject ? "put" : "post",
      body: newProject,
    });
    if (data.success) {
      useProjects.addProject(data.data);
      setIsError(false)
      setError(data.message);
    } else {
      setError(data.message);
    }
  } catch (error: any) {
    setError(error);
  }
};

const archiveHandler = async () => {
  try {
    const data: any = await $fetch("/api/archive", {
      method: props.archive ? "PATCH" : "POST",
      body: { _id: props.project._id },
    } as any);
    if (data.success) {
      props.archive
        ? useProjects.moveToProjects(props.project)
        : useProjects.moveToArchive(props.project);
      setIsError(false);
      setError(data.message);
    } else {
      setError(data.message);
    }
  } catch (error: any) {
    setError(error);
  }
};


const checkGates = () => {
  const allGates = [...useGates.gates.vartonas, ...useGates.gates.gigasta];
  gateOrdered.value = allGates.some(
    (item) => item._id.toString() === props.project?._id.toString()
  );
};

checkGates();
</script>

<template>
  <div class="flex flex-wrap border-b items-center justify-center w-fit xl:justify-start border-red-full gap-2 pb-4">
    <div class="font-semibold text-xl w-8">{{ length - index }}</div>
    <BaseInfoField :name="props.project?.orderNumber" width="w-24" />
    <div class="relative">
      <div v-if="props.project.gates.length > 0 && props.project.status !== 'Nepatvirtintas'"
        class="absolute top-1 right-1  w-2 h-2 rounded-full bg-green-500"
        :class="gateOrdered ? 'bg-green-500' : 'bg-red-full'">
      </div>
      <BaseInfoField :name="props.project?.client?.address" width="w-64 " />
    </div>

    <div class="relative">
      <div v-if="props.project.advance" class="absolute top-1 right-1  w-2 h-2 rounded-full bg-green-500"></div>
      <BaseInfoField :name="props.project?.discount
      ? props.project?.priceWithDiscount + '€'
      : props.project?.priceVAT + ' €'
      " width="w-28" />
    </div>

    <BaseInfoField :name="props.project?.client?.phone" width="w-32" :tel="true" />
    <BaseInfoField :name="props.project?.client?.email" width="w-80 " :email="true" />
    <BaseInfoField :name="props.project?.status" width="w-40" :class="props.project?.status === 'Nepatvirtintas'
      ? 'bg-orange-300'
      : props.project?.status === 'Netinkamas'
        ? 'bg-red-full'
        : props.project?.status === 'Tinkamas'
          ? 'bg-pink-400 '
          : props.project?.status === 'Vartai Sumontuoti' ?
            'bg-violet-500 animate-pulse text-white'
            : 'bg-green-400'
      " />
    <div class="relative hover:bg-red-full p-2  rounded-lg hover:cursor-pointer" :class="open && 'bg-red-full'"
      @click="open = !open">
      <NuxtImg src="/icons/menu.svg" width="16" height="16" decoding="auto" loading="lazy" :ismap="true" />
      <div v-if="open"
        class="absolute z-40 flex flex-col top-8 right-0 bg-white border border-dark-light rounded-lg shadow-lg overflow-hidden w-48"
        :class="props.archive ? 'h-28' : 'h-64'">

        <div v-if="!props.archive" @click="openInNewHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/newtab.svg" alt="edit button" width="20" height="20" />
          <p>Atidaryti pasiūlymą</p>
        </div>

        <div @click="previewHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/eye.svg" alt="eye button" width="20" height="20" />
          <p>Peržiūrėti</p>
        </div>

        <div v-if="!props.archive" @click="editHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/edit.svg" alt="edit button" width="20" height="20" />
          <p>Redaguoti</p>
        </div>

        <div v-if="!props.archive" @click="copyHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/pageflip.svg" alt="edit button" width="20" height="20" />
          <p>Kopijuoti projektą</p>
        </div>

        <div v-if="!props.archive" @click="linkHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/link.svg" alt="link button" width="20" height="20" />
          <p>Kopijuoti nuorodą</p>
        </div>

        <div @click="archiveHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/archive.svg" alt="delete button" width="20" height="20" />
          <p v-if="!props.archive">Archyvuoti</p>
          <p v-else>Sugrąžinti</p>
        </div>
        <div @click="deleteHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white">
          <NuxtImg src="/icons/delete.svg" alt="delete button" width="20" height="20" />
          <p>Ištrinti</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
