<script setup lang="ts">
const props = defineProps(["_id", "id", "category"]);
const emit = defineEmits(["upload", "selected"]);

const { setError, setSuccess } = useCustomError();

const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);
const modalOpen = ref(false);
const selectOpen = ref(false);
const files = ref<any[]>([]);

const search = ref("");

const filteredFiles = computed(() => {
  const term = search.value.trim().toLowerCase();
  if (!term) return files.value;
  return files.value.filter((file) => file.name.toLowerCase().includes(term));
});

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

const modalHandler = async () => {
  search.value = "";
  modalOpen.value = !modalOpen.value;
  selectOpen.value = false;
  if (modalOpen.value) {
    const response = await request.get("getBlueprints");
    if (response.success) {
      files.value = response.data;
    } else setError(response.message);
  }
};

const selectHandler = (file: string) => {
  emit("selected", file);
  modalHandler();
};
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
      class="absolute bottom-0 right-7 w-40 rounded-md font-medium overflow-hidden bg-gray-ultra-light divide-y divide-dark-light border-2 border-red-full shadow-xl text-black z-40"
    >
      <button class="hover:bg-red-full w-full hover:text-white h-10" @click="triggerFileInput">
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
        class="hover:bg-red-full w-full hover:text-white h-10"
      >
        Pasirinkti failą
      </button>
    </div>

    <div
      v-if="selectOpen"
      class="absolute bottom-0 right-7 w-72 overflow-y-auto flex flex-col divide-y divide-dark-light font-medium border-2 border-red-full z-40 bg-white rounded-lg overflow-hidden"
    >
      <div class="flex justify-center items-center pr-1">
        <input
          class="h-10 px-4 overflow-auto border outline-none w-full"
          placeholder="Ieškoti"
          v-model="search"
          ref="inputRef"
        />
        <button
          @click="modalHandler"
          class="bg-red-full text-white w-8 h-8 flex justify-center items-center rounded-md"
        >
          X
        </button>
      </div>
      <ul class="flex flex-col overflow-y-auto w-full divide-y max-h-60">
        <li
          v-for="file in filteredFiles"
          :key="file.url"
          @click="selectHandler(file.url)"
          class="px-2 py-2 flex justify-between items-center odd:bg-gray-ultra-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        >
          {{ file.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
