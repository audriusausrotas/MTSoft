<script setup lang="ts">
import type { PotentialClient } from "~/data/interfaces";

const usePotentialClients = usePotentialClientsStore();
const { setError, setIsError } = useError();

const filteredData = reactive<any>([]);
const input = ref<string>("");

const sendHandler = async () => {};

const selectAllHandler = async () => {
  const response: any = await $fetch("/api/potentialClients", {
    method: "put",
    body: { all: "yes", value: true },
  });
  if (response.success) {
    usePotentialClients.checkPotentialClients(true);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const selectNoneHandler = async () => {
  const response: any = await $fetch("/api/potentialClients", {
    method: "put",
    body: { all: "yes", value: false },
  });
  if (response.success) {
    usePotentialClients.checkPotentialClients(false);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const searchHandler = (value: string) => {
  if (value.length > 2) {
    const foundProjects = usePotentialClients.potentialClients.filter(
      (client: PotentialClient) =>
        client.address.toLowerCase().includes(value.toLowerCase()) ||
        client.email.toLowerCase().includes(value.toLowerCase()) ||
        client.phone.toLowerCase().includes(value.toLowerCase()) ||
        client.name.toLowerCase().includes(value.toLowerCase())
    );
    filteredData.value = [...foundProjects];
  } else {
    filteredData.value = [...usePotentialClients.potentialClients];
  }
};

onMounted(() => {
  filteredData.value = [...usePotentialClients.potentialClients];
});

watch(
  () => usePotentialClients.potentialClients,
  (newClients) => {
    filteredData.value = [...newClients];
  }
);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 items-center">
      <BaseButton name="siūsti pasiūlymą" @click="sendHandler" />
      <BaseButton name="pažymėti visus" @click="selectAllHandler" />
      <BaseButton name="atžymėti visus" @click="selectNoneHandler" />
      <BaseInput
        :name="input"
        @onChange="searchHandler"
        variant="light"
        placeholder="Paieška"
      >
        <NuxtImg
          src="/icons/search.svg"
          width="14"
          height="14"
          alt="search icon"
          decoding="auto"
          loading="lazy"
          :ismap="true"
      /></BaseInput>
    </div>

    <div class="flex flex-col">
      <div class="flex gap-4 border-b-2 mb-1 px-2 w-fit">
        <p class="w-6 ml-8">Nr</p>
        <p class="w-48">Vardas</p>
        <p class="w-80">El. Paštas</p>
        <p class="w-28">Telefonas</p>
        <p class="w-60">Adresas</p>
        <p class="w-32">Statusas</p>
      </div>
      <div class="flex flex-col">
        <OffersSendUsers
          v-for="(client, index) in filteredData.value"
          :key="client?._id"
          :index="index"
          :client="client"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
