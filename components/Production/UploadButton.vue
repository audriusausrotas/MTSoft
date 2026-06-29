<script setup lang="ts">
const props = defineProps(["_id", "id", "category"]);
const emit = defineEmits(["upload", "selected"]);

const { setError, setSuccess } = useCustomError();

const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);
const modalOpen = ref(false);
const selectOpen = ref(false);
const files = ref<any[]>([]);

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
  modalOpen.value = false;
};

const modalHandler = () => {
  modalOpen.value = !modalOpen.value;
  selectOpen.value = false;
};

const selectHandler = (file: string) => {
  emit("selected", file);
  modalHandler();
};

onMounted(async () => {
  const response = await request.get("getBlueprints");
  if (response.success) {
    files.value = response.data;
  } else setError(response.message);
});
</script>

<template>
  <div class="flex items-center h-full relative font-normal text-base">
    <div @click="modalHandler" class="w-7 px-1 hover:cursor-pointer">
      <img
        v-if="!isUploading"
        src="/icons/upload.svg"
        alt="upload icon"
        class="hover:scale-125 transition-transform"
        :class="modalOpen ? '-rotate-90 scale-125' : ''"
      />

      <span
        v-else
        :class="isUploading ? 'animate-spin' : ''"
        class="border-4 border-b-red-500 h-5 w-5 rounded-full"
      ></span>
    </div>
    <div
      v-if="modalOpen"
      class="absolute -top-0.5 right-7 w-36 rounded-md overflow-hidden bg-blue-600 divide-y divide-black border border-black shadow-xl text-white z-50"
    >
      <button class="hover:bg-red-full w-full hover:text-white px-2 py-1" @click="triggerFileInput">
        Įkelti failą
      </button>

      <input
        type="file"
        ref="fileInput"
        accept="image/*,application/pdf"
        multiple
        @change="uploadFiles"
        class="hidden"
      />
      <button
        @click="selectOpen = !selectOpen"
        v-if="!selectOpen"
        class="hover:bg-red-full w-full hover:text-white px-2 py-1"
      >
        Pasirinkti failą
      </button>
    </div>

    <div>
      <div
        v-if="selectOpen"
        class="absolute -top-0.5 right-7 w-fit min-w-36 max-h-40 overflow-y-auto rounded-md overflow-hidden bg-blue-600 divide-y divide-black border border-black shadow-xl text-white z-50"
      >
        <div
          v-for="file in files"
          @click="selectHandler(file.url)"
          :key="file.url"
          class="px-2 py-1 hover:cursor-pointer hover:bg-red-full hover:text-white"
        >
          {{ file.name }}
        </div>
      </div>
    </div>
  </div>
</template>
