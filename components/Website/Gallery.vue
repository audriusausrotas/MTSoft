<script setup lang="ts">
const websiteSettingsStore = useWebsiteSettingsStore();
</script>

<template>
  <div class="flex flex-col gap-4">
    <WebsiteGalleryNew />
    <div class="flex gap-4 border-b border-gray-300 p-2">
      <div class="w-80">Pavadinimas</div>
      <div class="w-80">Nuoroda</div>
      <div class="w-80">Aprašymas</div>
      <div class="w-80">Aprašymas EN</div>
    </div>
    <WebsiteGalleryItem
      v-for="(image, index) in websiteSettingsStore.websiteSettings.gallery"
      :key="image.url"
      :image="image"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
