<script setup lang="ts">
const useUser = useUserStore();
</script>

<template>
  <NavMain v-if="useUser?.user" class="print:hidden" />
  <div
    class="px-4 py-10 flex flex-col justify-center m-auto gap-8 max-w-[1400px]"
  >
    <NavArchive />
    <slot />
  </div>
</template>
<style scoped></style>
