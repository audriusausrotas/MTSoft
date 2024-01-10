<script setup lang="js">

const useProject = useProjectStore();
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
        :name="useProject.client.username"
        @onChange="(value) => useProject.updateClientUsername(value)"
      />

      <BaseInput
        placeholder="Telefono Numeris"
        variant="light"
        label="Telefono Numeris"
        type="number"
        width="w-72"
        :name="useProject.client.phone"
        @onChange="(value) => -useProject.updateClientPhone(value)"
      />

      <BaseInput
        placeholder="Adresas"
        variant="light"
        label="Adresas"
        width="w-72"
        :name="useProject.client.address"
        @onChange="(value) => useProject.updateClientAddress(value)"
      />

      <BaseInput
        placeholder="Elektroninis Paštas"
        variant="light"
        label="Elektroninis Paštas"
        width="w-72"
        :name="useProject.client.email"
        @onChange="(value) => useProject.updateClientEmail(value)"
      />
    </div>
  </div>
</template>
<style scoped></style>
