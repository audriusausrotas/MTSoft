<script setup lang="ts">
const useCalculations = useCalculationsStore();
const open = ref(true);
</script>

<template>
  <CalcTitle :open="open" name="Kliento Duomenys" @onClick="open = !open" />
  <div v-if="open" clflex-wraps="flex flex-col gap-8 mt-8">
    <div class="flex flex-wrap justify-center gap-4 xl:justify-normal">
      <BaseInput
        placeholder="Klientas"
        variant="light"
        :active="true"
        label="Klientas"
        width="w-72"
        :name="useCalculations.client.username"
        @onChange="(value: string) => useCalculations.updateClientUsername(value)"
      />

      <BaseInput
        placeholder="Telefono Numeris"
        variant="light"
        label="Telefono Numeris"
        type="number"
        width="w-72"
        :name="useCalculations.client.phone"
        @onChange="(value: string) => -useCalculations.updateClientPhone(value)"
      />

      <BaseInput
        placeholder="Adresas"
        variant="light"
        label="Adresas"
        width="w-72"
        :name="useCalculations.client.address"
        @onChange="(value: string) => useCalculations.updateClientAddress(value)"
      />

      <BaseInput
        placeholder="Elektroninis Paštas"
        variant="light"
        label="Elektroninis Paštas"
        width="w-72"
        :name="useCalculations.client.email"
        @onChange="(value: string) => useCalculations.updateClientEmail(value)"
      />
    </div>
  </div>
</template>
<style scoped></style>
