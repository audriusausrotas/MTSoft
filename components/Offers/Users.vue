<script setup lang="ts">
const potentialClientsStore = usePotentialClientsStore();
</script>

<template>
  <div class="flex flex-col gap-4">
    <OffersNewUser />
    <div class="flex flex-col gap-2">
      <div class="flex gap-4 px-4 w-fit">
        <p class="w-6">Nr</p>
        <p class="w-48">Vardas</p>
        <p class="w-60">El. Paštas</p>
        <p class="w-28">Telefonas</p>
        <p class="w-60">Adresas</p>
        <p class="w-48">Statusas</p>
        <p class="w-6"></p>
        <p class="w-6"></p>
      </div>
      <div
        class="flex flex-col border border-black rounded-lg w-fit divide-y divide-gray-600 overflow-hidden"
      >
        <OffersUser
          v-for="(client, index) in potentialClientsStore.potentialClients"
          :key="client?._id"
          :index="index"
          :client="client"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
