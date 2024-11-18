<script setup lang="ts">
const useSettings = useSettingsStore();
</script>

<template>
  <div class="flex flex-col gap-8">
    <SettingsSelectElement
      field="fenceColors"
      name="Tvoros spalvos"
      :data="useSettings.selectValues.fenceColors"
    />

    <SettingsSelectElement
      field="fenceTypes"
      name="Tvoros tipai"
      :data="useSettings.selectValues.fenceTypes"
    />

    <SettingsSelectElement
      field="retailFenceTypes"
      name="Didmenos tvoros tipai"
      :data="useSettings.selectValues.retailFenceTypes"
    />

    <SettingsSelectElement
      field="fenceMaterials"
      name="Tvoros skardos"
      :data="useSettings.selectValues.fenceMaterials"
    />

    <SettingsSelectElement
      field="status"
      name="Projekto statusas"
      :data="useSettings.selectValues.status"
    />

    <SettingsSelectElement
      field="accountTypes"
      name="Paskyros tipai"
      :data="useSettings.selectValues.accountTypes"
    />

    <SettingsSelectElement
      field="gateTypes"
      name="Vartų tipai"
      :data="useSettings.selectValues.gateTypes"
    />

    <SettingsSelectElement
      field="gateOption"
      name="Vartelių tipai"
      :data="useSettings.selectValues.gateOption"
    />

    <SettingsSelectElement
      field="gateLock"
      name="Vartelių spyna"
      :data="useSettings.selectValues.gateLock"
    />
  </div>
</template>
<style scoped></style>
