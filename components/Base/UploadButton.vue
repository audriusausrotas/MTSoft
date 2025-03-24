<script setup lang="ts">
const props = defineProps(["_id", "category"]);
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
    formData.append("category", props.category);

    isUploading.value = true;

    fileInput.value = null;
    isUploading.value = false;

    emit("upload", formData);
  }
};
</script>

<template>
  <div>
    <button
      class="flex items-center justify-center h-10 gap-2 px-4 py-2 capitalize bg-dark-full text-white w-60 rounded-lg shadow-sm hover:bg-red-600"
      @click="triggerFileInput"
    >
      <span v-if="!isUploading">Įkelti paveikslėlius</span>
      <span
        v-else
        :class="isUploading ? 'animate-spin' : ''"
        class="border-4 border-b-red-full h-8 w-8 rounded-full"
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
