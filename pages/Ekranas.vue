<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false,
});
</script>

<template>
  <div class="flex flex-col h-screen w-screen p-8 items-center gap-14">
    <ClientOnly>
      <ScreenTime />
    </ClientOnly>
    <ScreenReports />
  </div>
</template>
<style scoped></style>
