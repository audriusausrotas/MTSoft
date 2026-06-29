<script setup lang="ts">
const props = defineProps(["files", "selectedPhoto"]);
const emit = defineEmits(["close", "delete"]);

const userStore = useUserStore();

const selectedPicture = ref<string>(props.selectedPhoto);

const isAdmin =
  userStore.user?.accountType === "Administratorius" ||
  userStore.user?.accountType === "Vadybininkas";

const closeHandler = () => {
  emit("close");
};

const deleteHandler = () => {
  emit("delete", selectedPicture.value);
};
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed flex flex-col bg-black bg-opacity-60 backdrop-blur-sm gap-2 z-50 scroll select-none top-0 left-0 scroll w-full h-full p-4"
    >
      <div class="absolute flex w-full justify-between top-0 left-0 p-4">
        <img
          @click="deleteHandler"
          src="/icons/delete.svg"
          alt="delete"
          class="hover:cursor-pointer"
          :class="isAdmin ? '' : 'invisible'"
        />
        <img
          @click="closeHandler"
          src="/icons/close.svg"
          alt="close"
          class="hover:cursor-pointer"
        />
      </div>
      <div class="m-auto w-[90%] h-[90%]">
        <NuxtImg
          :src="`https://mtsoft.lt${selectedPicture}`"
          width="800"
          height="800"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="w-full h-full object-contain"
        />
      </div>
      <div class="w-[90%] m-auto flex justify-center gap-2">
        <div
          v-for="file in props.files"
          :key="file"
          class="hover:cursor-pointer rounded-md overflow-hidden"
          :class="selectedPicture === file ? 'border-2 border-green-500' : ''"
          @click="selectedPicture = file"
        >
          <NuxtImg
            :src="`https://mtsoft.lt${file}`"
            width="100"
            height="100"
            decoding="auto"
            loading="lazy"
            :ismap="true"
            class="object-fit"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
