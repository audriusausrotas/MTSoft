<script setup lang="ts">
const useUser = useUserStore();
</script>

<template>
  <Navigation v-if="useUser?.user" class="print:hidden" />
  <div class="px-4 pt-10 flex justify-center max-w-[1200px] m-auto">
    <slot />
  </div>
</template>
<style scoped></style>
