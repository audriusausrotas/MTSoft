div
<script setup lang="ts">
import type { Client } from "~/data/interfaces";

const calculationsStore = useCalculationsStore();
const clientsStore = useClientsStore();
const open = ref(false);

const selectHandler = (value: Client) => {
  calculationsStore.updateClientUsername(value.username);
  calculationsStore.updateClientPhone(value.phone);
  calculationsStore.updateClientAddress(value.address);
  calculationsStore.updateClientEmail(value.email);
  open.value = false;
};
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-4 xl:justify-normal">
    <div class="pt-6 relative">
      <NuxtImg
        src="/icons/users.svg"
        alt="Vartotojų ikona"
        width="20"
        height="20"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="open = !open"
        class="hover:cursor-pointer transition-transform hover:scale-125"
      />
      <div v-if="open" class="absolute bg-white top-14 py-1 left-0 w-96 z-50">
        <BaseSearchFieldClients
          :data="clientsStore.clients"
          width="w-full"
          @onClick="selectHandler"
        />
      </div>
    </div>
    <BaseInput
      placeholder="Klientas"
      variant="light"
      :active="true"
      label="Klientas"
      :name="calculationsStore.client.username"
      @onChange="(value: string) => calculationsStore.updateClientUsername(value)"
    />

    <BaseInput
      placeholder="Telefono Numeris"
      variant="light"
      label="Telefono Numeris"
      :name="calculationsStore.client.phone"
      @onChange="(value: string) => calculationsStore.updateClientPhone(value)"
    />

    <BaseInput
      placeholder="Adresas"
      variant="light"
      label="Adresas"
      :name="calculationsStore.client.address"
      @onChange="(value: string) => calculationsStore.updateClientAddress(value)"
    />

    <BaseInput
      placeholder="Elektroninis Paštas"
      variant="light"
      label="Elektroninis Paštas"
      :name="calculationsStore.client.email"
      @onChange="(value: string) => calculationsStore.updateClientEmail(value)"
    />
  </div>
</template>
<style scoped></style>
