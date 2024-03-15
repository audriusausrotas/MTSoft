<script setup lang="ts"></script>

<template>
  <div class="flex flex-col min-h-screen justify-between">
    <OfferNavigation class="pointer-events-none blur-[2px]" />
    <div class="w-full lgmy-12 self-start max-w-[1200px] m-auto">
      <slot />
    </div>

    <Footer />
  </div>
</template>
<style scoped></style>
