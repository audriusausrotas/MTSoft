<script setup lang="ts">
import { status } from "~/data/selectFieldData";
definePageMeta({
  layout: "preview",
} as any);

const route = useRoute();
const { setError, setIsError } = useError();
const useProjects = useProjectsStore();
const useGates = useGateStore();
const useUsers = useUserStore();

const allUsers = useUsers.users.map((item) => item.username);
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const offer = useProjects.projects.find((item) => item._id === route.params.id);
const gateOrdered = ref(false);

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

const gateOrderHadnler = async (name: string): Promise<void> => {
  isLoading.value = true;
  const data: any = await $fetch("/api/gates", {
    method: "post",
    body: { _id: offer?._id, value: name },
  });
  if (data.success) {
    useGates.addGate(data.data, name);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  isLoading.value = false;
  isOpen.value = false;
};

const gateCancelHadnler = async (): Promise<void> => {
  isLoading.value = true;
  const data: any = await $fetch("/api/gates", {
    method: "delete",
    body: { _id: offer?._id },
  });
  if (data.success) {
    useGates.removeGates(offer!._id);
    gateOrdered.value = false;
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  isLoading.value = false;
};

const changeCreatorHandler = async (value: string) => {
  const data: any = await $fetch("/api/projectCreator", {
    method: "PATCH",
    body: { _id: offer!._id, value },
  });
  if (data.success) {
    useProjects.changeCreator(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const orderFinishHandler = async () => {

  const response: any = await $fetch("/api/project", {
    method: "PATCH",
    body: { _id: offer!._id, value: "Baigtas" },
  });
  if (response.success) {
    useProjects.updateStatus(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }

  const data: any = await $fetch("/api/archive", {
    method: "POST",
    body: { _id: offer!._id },
  } as any);
  if (data.success) {
    useProjects.moveToArchive(offer!);
    setIsError(false);
    setError(data.message);
    navigateTo("/")
  } else {
    setError(data.message);
  }
}


const checkGates = () => {
  const allGates = [...useGates.gates.vartonas, ...useGates.gates.gigasta];
  gateOrdered.value = allGates.some(
    (item) => item._id.toString() === offer?._id.toString()
  );
};

checkGates();

watch(
  useGates.gates,
  () => {
    checkGates();
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="flex gap-4 items-end">


      <BaseSelectField :values="status" id="orderStatus" :defaultValue="offer?.status" label="Statusas" width="w-40"
        @onChange="(value: string) => statusHandler(value)
        " />
      <BaseButtonWithConfirmation name="išsiūsti pasiūlymą" @onConfirm="sendEmailHandler" :isLoading="isLoading" />
      <BaseButton v-if="gateOrdered" name="Atšaukti vartų užsakymą" @click="gateCancelHadnler" />
      <BaseButton v-if="!gateOrdered && !isOpen" name="Užsakyti vartus" @click="isOpen = true" :isLoading="isLoading" />
      <BaseButtonWithConfirmation name="Baigti užsakymą" @onConfirm="orderFinishHandler" :isLoading="isLoading" />
      <div v-if="!gateOrdered && isOpen"
        class="flex items-center justify-center h-10 w-60 capitalize transition-colors rounded-lg shadow-sm divide-x divide-red-full overflow-hidden">
        <button @click="gateOrderHadnler('vartonas')"
          class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full">
          Vartonas
        </button>
        <button @click="gateOrderHadnler('gigasta')" class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full">
          Gigasta
        </button>
      </div>
      <BaseSelectField :values="allUsers" id="changeCreator" :defaultValue="offer?.creator.username"
        label="Atsakingas asmuo" width="w-40" @onChange="(value: string) => changeCreatorHandler(value)
        " />
    </div>
    <PreviewClient :offer="offer" />
    <ResultTotalElement :results="offer" />
    <previewTrello :offer="offer" :hidePrices="false" />



  </div>
</template>
