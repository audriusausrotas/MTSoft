<script setup lang="ts">
const props = defineProps(["_id", "files", "category"]);
const modalOpen = ref<boolean>(false);
const selectedPhoto = ref<string>("");

const clickHandler = (url: string) => {
  selectedPhoto.value = url;
  modalOpen.value = true;
};
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <BaseGalleryPicture
      v-for="file in props.files"
      :key="file"
      :file="file"
      :_id="props._id"
      :category="props.category"
      @click="clickHandler(file)"
    />
  </div>
  <BaseGalleryModal
    v-if="modalOpen"
    @close="modalOpen = false"
    :files="props.files"
    :selectedPhoto="selectedPhoto"
  />
</template>
<style scoped></style>
