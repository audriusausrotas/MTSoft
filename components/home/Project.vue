<script setup lang="ts">
import type { Project } from "~/data/interfaces";
const props = defineProps(["project", "index", "length"]);
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useCalculations = useCalculationsStore();
const open = ref<boolean>(false);

const deleteHandler = async (): Promise<void> => {
  const response: any = await $fetch("/api/project", {
    method: "DELETE",
    body: { _id: props.project._id },
  });
  if (response.success) {
    useProjects.deleteProject(props.project._id);
  }
};

const editHandler = () => {
  console.log(props.project._id);
  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
  useResults.setProject(props.project);
  useCalculations.setProject({
    client: props.project.client,
    fenceMeasures: props.project.fenceMeasures,
  });
  useProjects.setSelectedProject(props.project._id);
  navigateTo("/samata");
};

const linkHandler = () => {
  navigator.clipboard
    .writeText(
      "https://modernitvora.vercel.app/pasiulymas/" + props.project._id
    )
    .then(() => {
      console.log("Text successfully copied to clipboard:", props.project._id);
    })
    .catch((error) => {
      console.error("Error copying to clipboard:", error);
    });
};

const previewHandler = () => {
  navigateTo("/perziura/" + props.project._id);
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
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div
    class="flex flex-wrap border-b items-center justify-center w-fit xl:justify-start border-red-full gap-2 pb-4"
  >
    <div class="font-semibold text-xl w-6">{{ length - index }}</div>
    <BaseInfoField :name="props.project?.orderNumber" width="w-24" />
    <BaseInfoField
      :name="props.project?.client?.address"
      width="w-64 min-w-fit"
    />
    <BaseInfoField
      :name="
        props.project?.discount
          ? props.project?.priceWithDiscount + '€'
          : props.project?.priceVAT + ' €'
      "
      width="w-28"
    />

    <BaseInfoField
      :name="props.project?.client?.phone"
      width="w-32"
      :tel="true"
    />
    <BaseInfoField
      :name="props.project?.client?.email"
      width="w-64 min-w-fit"
      :email="true"
    />
    <BaseInfoField :name="props.project?.status" width="w-40" />
    <div
      class="relative hover:bg-red-full p-2 rounded-lg hover:cursor-pointer"
      :class="open && 'bg-red-full'"
      @click="open = !open"
    >
      <NuxtImg
        src="/icons/menu.svg"
        width="16"
        height="16"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
      <div
        v-if="open"
        class="absolute z-40 flex flex-col gap-2 top-8 right-0 bg-white border border-dark-light rounded-lg shadow-lg overflow-hidden h-60 w-48"
      >
        <div
          @click="previewHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/eye.svg"
            alt="eye button"
            width="20"
            height="20"
            @click="previewHandler"
          />
          <p>Peržiūrėti</p>
        </div>

        <div
          @click="editHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/edit.svg"
            alt="edit button"
            width="20"
            height="20"
          />
          <p>Redaguoti</p>
        </div>

        <div
          @click="linkHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/link.svg"
            alt="link button"
            width="20"
            height="20"
          />
          <p>Kopijuoti nuorodą</p>
        </div>

        <div
          @click="openInNewHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/link.svg"
            alt="edit button"
            width="20"
            height="20"
          />
          <p>Atidaryti pasiūlymą</p>
        </div>

        <div
          @click="copyHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/edit.svg"
            alt="edit button"
            width="20"
            height="20"
          />
          <p>Kopijuoti projektą</p>
        </div>

        <div
          @click="deleteHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer"
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
    </div>
  </div>
</template>
<style scoped></style>
