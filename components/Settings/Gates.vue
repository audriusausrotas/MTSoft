<script setup lang="ts">
import type { Gates } from "~/data/interfaces";
import GatesElement from "./GatesElement.vue";

const gates: Gates[] = useSettingsStore().gates;
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <GatesElement
        v-for="(gate, index) in gates"
        :key="gate._id?.toString() || gate.name + index"
        :data="gate"
      />
    </div>
  </div>
</template>
