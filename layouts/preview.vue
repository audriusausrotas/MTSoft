<script setup lang="ts"></script>

<template>
  <TopBar />
  <div
    class="flex flex-col items-center gap-8 px-12 py-10 m-auto sm:items-start sm:flex-row max-w-custom"
  >
    <Navigation />
    <div class="w-full px-8 py-12 border flex flex-col gap-8 rounded-3xl">
      <PreviewNavigation />
      <slot />
    </div>
  </div>
</template>
<style scoped></style>
