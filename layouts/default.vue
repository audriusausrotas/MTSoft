<script setup lang="ts">
const useUser = useUserStore();
</script>

<template>
  <SocketConnection />
  <NavMain v-if="useUser?.user" class="print:hidden" />
  <div class="px-4 py-10 flex justify-center max-w-[1400px] m-auto">
    <slot />
  </div>
</template>
<style scoped></style>
