<script setup lang="ts">
const useSettings = useSettingsStore();
</script>

<template>
  <div>
    <SettingsSelectElement
      field="fenceMaterials"
      name="Tvoros skardos"
      :data="useSettings.selectValues.fenceMaterials"
    />
  </div>
</template>
<style scoped></style>
