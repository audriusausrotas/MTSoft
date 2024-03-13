<script setup lang="ts">
import { status } from "~/data/selectFieldData";
definePageMeta({
  layout: "preview",
} as any);
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);

const statusHandler = async (value: string) => {
  const data: any = await $fetch("/api/project", {
    method: "PATCH",
    body: { _id: offer!._id, value },
  });
  if (data.success) {
    console.log(data.data);
    useProjects.updateStatus(data.data);
  }
};

const sendEmailHandler = async () => {
  const data: any = await $fetch("/api/mail", {
    method: "post",
    body: { to: offer?.client.email, link: offer?._id },
  });
  if (data.success) {
    console.log(data.message);
  } else {
    console.log(data.message);
  }
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

      <BaseButton name="išsiūsti pasiūlymą" @click="sendEmailHandler" />
    </div>
  </div>
</template>
