<script setup lang="ts">
const props = defineProps(["versions"]);

const versionsHandler = (id: string) => {
  window.open("/archyvas/" + id, "_blank");
};
</script>

<template>
  <div
    v-if="props.versions && props.versions.length > 0"
    class="flex flex-col gap-2 text-center w-full"
  >
    <p class="font-medium text-2xl">Projekto versijos</p>
    <div class="flex gap-2 flex-wrap">
      <div
        v-for="(version, index) in props.versions"
        :key="version.id"
        class="flex gap-4 border rounded-md py-1 px-4 border-dark-full hover:cursor-pointer hover:bg-red-600 hover:text-white hover:border-transparent"
        @click="versionsHandler(version.id)"
      >
        <p>V.{{ index }}</p>
        <p>{{ version.date.slice(0, 10) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
