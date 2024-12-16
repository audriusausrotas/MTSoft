<script setup lang="ts">
const useUser = useUserStore();
</script>

<template>
  <NavMain v-if="useUser?.user" class="print:hidden" />
  <div
    class="px-4 py-10 flex flex-col justify-center max-w-[1400px] m-auto gap-8"
  >
    <NavArchive />
    <slot />
  </div>
</template>
<style scoped></style>
