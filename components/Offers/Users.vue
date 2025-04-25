<script setup lang="ts">
const potentialClientsStore = usePotentialClientsStore();
</script>

<template>
  <div class="flex flex-col gap-8">
    <OffersNewUser />
    <div class="flex flex-col">
      <div class="flex gap-4 border-b-2 mb-1 px-2 w-fit">
        <p class="w-6">Nr</p>
        <p class="w-48">Vardas</p>
        <p class="w-60">El. Paštas</p>
        <p class="w-28">Telefonas</p>
        <p class="w-60">Adresas</p>
        <p class="w-48">Statusas</p>
        <p class="w-6"></p>
        <p class="w-6"></p>
      </div>
      <div class="flex flex-col">
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
