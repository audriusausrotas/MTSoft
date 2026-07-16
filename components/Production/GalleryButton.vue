<script setup lang="ts">
const props = defineProps(["files", "category", "_id", "id"]);

const { setError, setSuccess } = useCustomError();

const modalOpen = ref<boolean>(false);
const selectedPhoto = ref<string>("");

const clickHandler = (url: string) => {
  selectedPhoto.value = url;
  modalOpen.value = true;
};

const deleteHandler = async (file: string) => {
  const requestData = {
    files: [file],
    category: props.category,
    _id: props._id,
    id: props.id,
  };
  const response: any = await request.delete("deleteFiles", requestData);
  if (response.success) {
    if (!useSocketStore().connected) {
      if (props.category === "projects") {
        useProjectsStore().updateFiles(response.data._id, response.data.files);
      } else if (props.category === "production") {
        useProductionStore().updateFiles(
          response.data._id,
          response.data.files,
        );
      } else if (props.category === "installation") {
        useInstallationStore().updateFiles(
          response.data._id,
          response.data.files,
        );
      } else if (props.category === "fence") {
        useProductionStore().updateFenceFiles(
          response.data._id,
          response.data.id,
          response.data.files,
        );
      } else if (props.category === "binding") {
        useProductionStore().updateBindingFiles(
          response.data._id,
          response.data.id,
          response.data.files,
        );
      }
    }
    setSuccess(response.message);
    modalOpen.value = false;
  } else setError(response.message);
};
</script>

<template>
  <div class="flex justify-center items-center w-8 h-full">
    <img
      v-if="files?.length && files.length > 0"
      @click="clickHandler(props.files[0])"
      src="/icons/view.svg"
      alt="file view button"
      class="hover:scale-125 transition-transform hover:cursor-pointer"
    />
    <BaseGalleryModal
      v-if="modalOpen"
      @close="modalOpen = false"
      @delete="deleteHandler"
      :files="props.files"
      :selectedPhoto="selectedPhoto"
    />
  </div>
</template>
<style scoped></style>
