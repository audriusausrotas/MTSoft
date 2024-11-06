<script setup lang="ts">
import { v4 } from "uuid";
const useSettings = useSettingsStore();
</script>

<template>
  <div class="flex flex-col gap-8">
    <SettingsSelectsElement
      v-for="(data, index) in useSettings.selects"
      :key="v4()"
      :data="data"
      :index="index"
    />
  </div>
</template>
<style scoped></style>
