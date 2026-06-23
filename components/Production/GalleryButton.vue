<script setup lang="ts">
const props = defineProps(["files"]);
const modalOpen = ref<boolean>(false);
const selectedPhoto = ref<string>("");

const clickHandler = (url: string) => {
  selectedPhoto.value = url;
  modalOpen.value = true;
};
</script>

<template>
  <div
    v-if="files.length > 0"
    class="justify-center items-center w-7 h-full p-1 border-2 border-green-500 rounded overflow-hidden"
  >
    <img
      @click="clickHandler(props.files[0])"
      :src="props.files[0]"
      alt="file view button"
      class="hover:scale-125 transition-transform hover:cursor-pointer"
    />
    <BaseGalleryModal
      v-if="modalOpen"
      @close="modalOpen = false"
      :files="props.files"
      :selectedPhoto="selectedPhoto"
    />
  </div>
</template>
<style scoped></style>
