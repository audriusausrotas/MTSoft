<script setup lang="ts">
import type { Production } from "~/data/interfaces";
const { setError, setSuccess } = useCustomError();
const archiveStore = useArchiveStore();
const productionStore = useProductionStore();

const props = defineProps<{
  order: Production;
  index: number;
}>();

const open = ref(false);

const openHandler = () => {
  window.open("/archyvas/gamyba/" + props.order._id, "_blank");
};

const archiveHandler = async () => {
  const requestData = { _id: props.order._id };
  const response = await request.patch("restoreProduction", requestData);
  if (response.success) {
    if (!useSocketStore().connected) {
      productionStore.addProduction(response.data.data);
      archiveStore.deleteProduction(response.data.data._id);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti projektą?");
  if (!confirmed) return;
  const requestData = { _id: props.order._id };
  const response = await request.delete("deleteArchiveProduction", requestData);
  if (response.success) {
    if (!useSocketStore().connected) {
      archiveStore.deleteProduction(response.data._id);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex gap-4 items-center">
    <div class="pointer-events-none w-4">{{ index + 1 }}</div>
    <BaseInfoField class="pointer-events-none" :name="order?.orderNumber" width="w-24" />
    <BaseInfoField class="pointer-events-none" :name="order?.client?.address" width="w-96" />
    <BaseInfoField class="pointer-events-none" :name="order?.creator?.username" width="w-24" />

    <div
      class="relative hover:bg-red-full p-2 rounded-lg hover:cursor-pointer"
      @click="open = !open"
    >
      <NuxtImg
        src="/icons/menu.svg"
        width="16"
        height="16"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />

      <div
        v-if="open"
        class="absolute z-40 flex flex-col top-8 right-0 bg-white border select-none border-dark-light rounded-lg shadow-lg overflow-hidden w-48"
      >
        <div
          @click="openHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/document-forward.svg" alt="edit button" width="20" height="20" />
          <p>Atidaryti pasiūlymą</p>
        </div>

        <div
          @click="archiveHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/archive-tick.svg" alt="archive button" width="20" height="20" />

          <p>Sugrąžinti</p>
        </div>

        <div
          @click="deleteHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/delete.svg" alt="delete button" width="20" height="20" />
          <p>Ištrinti</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
