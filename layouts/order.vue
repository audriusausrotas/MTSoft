<script setup lang="ts"></script>

<template>
  <div class="flex flex-col min-h-screen justify-between">
    <div class="flex flex-col gap-20">
      <OfferNavigation />
      <div
        class="w-full p-8 self-start border rounded-3xl max-w-[1200px] m-auto"
      >
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped></style>
