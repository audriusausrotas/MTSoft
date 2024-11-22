div
<script setup lang="ts">
import type { Client } from "~/data/interfaces";

const useCalculations = useCalculationsStore();
const useClients = useClientsStore();
const open = ref(false);

const selectHandler = (value: Client) => {
  useCalculations.updateClientUsername(value.username);
  useCalculations.updateClientPhone(value.phone);
  useCalculations.updateClientAddress(value.address);
  useCalculations.updateClientEmail(value.email);
  open.value = false;
};
</script>

<template>
  <div
    class="flex flex-wrap justify-center items-center gap-4 xl:justify-normal"
  >
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
          :data="useClients.clients"
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
      :name="useCalculations.client.username"
      @onChange="(value: string) => useCalculations.updateClientUsername(value)"
    />

    <BaseInput
      placeholder="Telefono Numeris"
      variant="light"
      label="Telefono Numeris"
      type="number"
      :name="useCalculations.client.phone"
      @onChange="(value: string) => useCalculations.updateClientPhone(value)"
    />

    <BaseInput
      placeholder="Adresas"
      variant="light"
      label="Adresas"
      :name="useCalculations.client.address"
      @onChange="(value: string) => useCalculations.updateClientAddress(value)"
    />

    <BaseInput
      placeholder="Elektroninis Paštas"
      variant="light"
      label="Elektroninis Paštas"
      :name="useCalculations.client.email"
      @onChange="(value: string) => useCalculations.updateClientEmail(value)"
    />
  </div>
</template>
<style scoped></style>
