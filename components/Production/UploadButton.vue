<script setup lang="ts">
const props = defineProps(["_id", "id", "category"]);
const emit = defineEmits(["upload"]);

const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const uploadFiles = async () => {
  if (isUploading.value) return;

  if (fileInput.value && fileInput.value.files && fileInput.value.files.length > 0) {
    const files = fileInput.value.files;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("_id", props._id);
    formData.append("id", props.id);
    formData.append("category", props.category);

    isUploading.value = true;

    fileInput.value = null;
    isUploading.value = false;

    emit("upload", formData);
  }
};
</script>

<template>
  <div class="flex items-center h-full">
    <button class="w-7 px-1" @click="triggerFileInput">
      <img
        v-if="!isUploading"
        src="/icons/upload.svg"
        alt="upload icon"
        class="hover:scale-125 transition-transform"
      />

      <span
        v-else
        :class="isUploading ? 'animate-spin' : ''"
        class="border-4 border-b-red-500 h-5 w-5 rounded-full"
      ></span>
    </button>

    <input
      type="file"
      ref="fileInput"
      accept="image/*,application/pdf"
      multiple
      @change="uploadFiles"
      class="hidden"
    />
  </div>
</template>
