<script setup lang="ts">
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
        class="absolute z-40 flex flex-col gap-2 top-8 -left-3 bg-white border border-dark-light rounded-lg shadow-lg overflow-hidden w-14 h-40"
      >
        <div
          @click="previewHandler"
          class="hover:bg-red-full w-full h-full flex justify-center items-center hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/eye.svg"
            alt="eye button"
            width="20"
            height="20"
            @click="previewHandler"
          />
        </div>
        <div
          @click="linkHandler"
          class="hover:bg-red-full w-full h-full flex justify-center items-center hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/link.svg"
            alt="link button"
            width="20"
            height="20"
          />
        </div>
        <div
          @click="editHandler"
          class="hover:bg-red-full w-full h-full flex justify-center items-center hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/edit.svg"
            alt="edit button"
            width="20"
            height="20"
          />
        </div>
        <div
          @click="deleteHandler"
          class="hover:bg-red-full w-full h-full flex justify-center items-center hover:cursor-pointer"
        >
          <NuxtImg
            src="/icons/delete.svg"
            alt="delete button"
            width="20"
            height="20"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
