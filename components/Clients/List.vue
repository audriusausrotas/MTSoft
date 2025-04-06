<script setup lang="ts">
const { setError, setIsError } = useError();
const useClients = useClientsStore();

const deleteHandler = async (_id: string) => {
  const response: any = await request.delete(`deleteClient/${_id}`);

  if (response.success) {
    !useSocketStore().connected && useClients.deleteClient(_id);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 border-b">
      <p class="w-6">Nr</p>
      <p class="w-48">Vardas</p>
      <p class="w-60">El. Paštas</p>
      <p class="w-28">Telefonas</p>
      <p class="w-60">Adresas</p>
    </div>
    <div
      v-for="(client, index) in useClients.clients"
      :key="client?._id"
      class="flex gap-4 border-b"
    >
      <p class="w-6">{{ index + 1 }}</p>
      <p class="w-48">{{ client?.username }}</p>
      <p class="w-60">{{ client?.email }}</p>
      <p class="w-28">{{ client?.phone }}</p>
      <p class="w-60">{{ client?.address }}</p>
      <div @click="deleteHandler(client._id!)" class="w-6 hover:cursor-pointer">
        <NuxtImg
          src="/icons/delete.svg"
          width="18"
          height="18"
          decoding="auto"
          :ismap="true"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
