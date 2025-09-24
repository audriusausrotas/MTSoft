<script setup lang="ts">
const settingsStore = useSettingsStore();
</script>

<template>
  <div class="flex flex-col gap-8">
    <SettingsSelectElement
      field="fenceColors"
      name="Tvoros spalvos"
      :data="settingsStore.selectValues.fenceColors"
    />

    <SettingsSelectElement
      field="fenceTypes"
      name="Tvoros tipai"
      :data="settingsStore.selectValues.fenceTypes"
    />

    <SettingsSelectElement
      field="retailFenceTypes"
      name="Didmenos tvoros tipai"
      :data="settingsStore.selectValues.retailFenceTypes"
    />

    <SettingsSelectElement
      field="fenceMaterials"
      name="Tvoros skardos"
      :data="settingsStore.selectValues.fenceMaterials"
    />

    <SettingsSelectElement
      field="fenceManufacturers"
      name="Skardos Gamintojai"
      :data="settingsStore.selectValues.fenceManufacturers"
    />

    <SettingsSelectElement
      field="status"
      name="Projekto statusas"
      :data="settingsStore.selectValues.status"
    />

    <SettingsSelectElement
      field="accountTypes"
      name="Paskyros tipai"
      :data="settingsStore.selectValues.accountTypes"
    />

    <SettingsSelectElement
      field="gateTypes"
      name="Vartų tipai"
      :data="settingsStore.selectValues.gateTypes"
    />

    <SettingsSelectElement
      field="gateOption"
      name="Vartelių tipai"
      :data="settingsStore.selectValues.gateOption"
    />

    <SettingsSelectElement
      field="gateLock"
      name="Vartelių spyna"
      :data="settingsStore.selectValues.gateLock"
    />
  </div>
</template>
<style scoped></style>
