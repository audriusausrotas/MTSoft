<script setup lang="ts">
const galleryOpen = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <div class="flex gap-4">
      <NuxtImg
        @click="galleryOpen = !galleryOpen"
        src="/icons/arrowDown.svg"
        alt="arrow-down"
        class="w-4 hover:cursor-pointer transition-transform duration-300"
        :class="galleryOpen ? 'rotate-180' : ''"
      />
      <div class="font-bold text-xl">Galerija</div>
    </div>
    <WebsiteGallery v-if="galleryOpen" />
  </div>
</template>

<style scoped></style>
