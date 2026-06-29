<script setup lang="ts">
const props = defineProps(["_id", "files", "category"]);
const modalOpen = ref<boolean>(false);
const selectedPhoto = ref<string>("");

const clickHandler = (url: string) => {
  selectedPhoto.value = url;
  modalOpen.value = true;
};

const { setError, setSuccess } = useCustomError();

const deleteHandler = async (file: string) => {
  const requestData = {
    files: [file],
    category: props.category,
    _id: props._id,
  };
  const response: any = await request.delete("deleteFiles", requestData);
  if (response.success) {
    if (!useSocketStore().connected) {
      if (props.category === "projects") {
        useProjectsStore().updateFiles(response.data._id, response.data.files);
      } else if (props.category === "production") {
        useProductionStore().updateFiles(response.data._id, response.data.files);
      } else if (props.category === "installation") {
        useInstallationStore().updateFiles(response.data._id, response.data.files);
      }
    }
    setSuccess(response.message);
    modalOpen.value = false;
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <BaseGalleryPicture
      v-for="file in props.files"
      :key="file"
      :file="file"
      :_id="props._id"
      @click="clickHandler(file)"
      @delete="deleteHandler"
    />
  </div>
  <BaseGalleryModal
    v-if="modalOpen"
    @close="modalOpen = false"
    @delete="deleteHandler"
    :files="props.files"
    :selectedPhoto="selectedPhoto"
  />
</template>
<style scoped></style>
