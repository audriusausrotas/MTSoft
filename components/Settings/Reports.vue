<script setup lang="ts">
const selected = ref<string>("general");
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div
      class="flex text-center border border-dark-light rounded-lg overflow-hidden divide-x divide-dark-light"
    >
      <div
        @click="selected = 'general'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-600 hover:text-white"
        :class="selected === 'general' ? 'bg-red-full text-white' : ''"
      >
        Bendri nustatymai
      </div>
      <div
        @click="selected = 'bends'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        :class="selected === 'bends' ? 'bg-red-full text-white' : ''"
      >
        Lenkimų nustatymai
      </div>
    </div>
    <SettingsReportsGeneral v-if="selected === 'general'" />
    <SettingsReportsBends v-else-if="selected === 'bends'" />
  </div>
</template>
<style scoped></style>
