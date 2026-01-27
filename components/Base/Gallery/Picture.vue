<script setup lang="ts">
const props = defineProps(["_id", "file", "category"]);
const { setError, setSuccess } = useCustomError();

const deleteHandler = async (event: Event) => {
  event.stopPropagation();

  const requestData = {
    files: [props.file],
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
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div
    class="rounded-lg overflow-hidden w-56 h-40 shadow-lg shadow-gray-full relative hover:cursor-pointer"
  >
    <NuxtImg
      :src="`https://mtsoft.lt${props.file}`"
      width="200"
      height="200"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="w-full h-full object-center object-cover"
    />
    <div
      class="text-red-500 absolute top-0 right-0 font-bold rounded-sm p-[2px] bg-gray-light text-2xl"
    >
      <NuxtImg
        src="/icons/delete.svg"
        width="18"
        height="18"
        decoding="auto"
        :ismap="true"
        loading="lazy"
        class="hover:cursor-pointer"
        @click="deleteHandler"
      />
    </div>
  </div>
</template>
<style scoped></style>
