<script setup lang="ts">
const settingsStore = useSettingsStore();
const accountTypes = settingsStore.selectValues.accountTypes;
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-2xl font-medium self-center">Vartotojų teisių nustatymai</h3>
    <div class="flex gap-4 text-center text-xl">
      <p class="w-48 text-start">Varotojo teises</p>
      <p class="w-28">Projektai</p>
      <p class="w-28">Grafikas</p>
      <p class="w-28">Gamyba</p>
      <p class="w-28">Montavimas</p>
      <p class="w-28">Sandėlys</p>
      <p class="w-28">Užsakymai</p>
      <p class="w-28">Vartai</p>
      <p class="w-28">Admin</p>
    </div>
    <SettingsUserRights
      v-for="accountType in accountTypes"
      :key="accountType"
      class="flex gap-4"
      :accountType="accountType"
    >
    </SettingsUserRights>
  </div>
</template>
<style scoped></style>
