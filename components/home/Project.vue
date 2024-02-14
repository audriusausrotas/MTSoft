<script setup lang="ts">
const props = defineProps(["project", "index"]);
const useProjects = useProjectsStore();
const useResults = useResultsStore();
const useCalculations = useCalculationsStore();

const deleteHandler = async (): Promise<void> => {
  const response: any = await $fetch("/api/project", {
    method: "delete",
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
    .writeText("modernitvora.vercel.app/pasiulymas/" + props.project._id)
    .then(() => {
      console.log("Text successfully copied to clipboard:", props.project._id);
    })
    .catch((error) => {
      console.error("Error copying to clipboard:", error);
    });
};
</script>

<template>
  <div class="flex items-center gap-4">
    <div>{{ index + 1 }}</div>
    <BaseInfoField :name="props.project.orderNumber" width="w-28" />
    <BaseInfoField
      :name="props.project.client.address"
      width="w-60 min-w-fit"
    />
    <BaseInfoField
      :name="
        props.project.discount === 'Taip'
          ? props.project.priceWithDiscount + '€'
          : props.project.priceVAT + ' €'
      "
      width="w-28"
    />
    <BaseInfoField
      :name="props.project.client.phone"
      width="w-32"
      :tel="true"
    />

    <BaseInfoField :name="props.project.client.email" width="w-60 min-w-fit" />
    <BaseInfoField :name="props.project.status" width="w-32" />
    <NuxtImg
      src="/icons/eye.svg"
      alt="eye button"
      width="20"
      height="20"
      class="hover:cursor-pointer"
    />
    <NuxtImg
      src="/icons/link.svg"
      alt="link button"
      width="20"
      height="20"
      @click="linkHandler"
      class="hover:cursor-pointer"
    />
    <NuxtImg
      src="/icons/edit.svg"
      alt="edit button"
      width="20"
      height="20"
      @click="editHandler"
      class="hover:cursor-pointer"
    />
    <NuxtImg
      src="/icons/delete.svg"
      alt="delete button"
      width="20"
      height="20"
      @click="deleteHandler"
      class="hover:cursor-pointer"
    />
  </div>
</template>
<style scoped></style>
