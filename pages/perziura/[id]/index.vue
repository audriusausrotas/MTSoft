<script setup lang="ts">
import { status } from "~/data/selectFieldData";
definePageMeta({
  layout: "preview",
} as any);
const route = useRoute();
const { setError, setIsError } = useError();
const useProjects = useProjectsStore();
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const offer = useProjects.projects.find((item) => item._id === route.params.id);

const statusHandler = async (value: string) => {
  const data: any = await $fetch("/api/project", {
    method: "PATCH",
    body: { _id: offer!._id, value },
  });
  if (data.success) {
    useProjects.updateStatus(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const sendEmailHandler = async () => {
  isLoading.value = true;
  const data: any = await $fetch("/api/mail", {
    method: "post",
    body: { to: offer?.client.email, link: offer?._id },
  });
  if (data.success) {
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  isLoading.value = false;
};

const gateOrderHadnler = (name: string): void => {
  isOpen.value = false;
};
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-end">
      <BaseSelectField
        :values="status"
        id="orderStatus"
        :defaultValue="offer?.status"
        label="Statusas"
        width="w-40"
        @onChange="(value: string) => statusHandler(value)
        "
      />

      <BaseButton
        name="išsiūsti pasiūlymą"
        @click="sendEmailHandler"
        :isLoading="isLoading"
      />

      <BaseButton
        v-if="!isOpen"
        name="Užsakyti vartus"
        @click="isOpen = true"
        :isLoading="isLoading"
      />
      <div v-else class="flex">
        <button @click="gateOrderHadnler('vartonas')">Vartonas</button>
        <button @click="gateOrderHadnler('gigasta')">Gigasta</button>
      </div>
    </div>
  </div>
</template>
