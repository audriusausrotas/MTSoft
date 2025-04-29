<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <NavMain v-if="userStore?.user" class="print:hidden" />
  <div
    class="px-4 py-10 flex flex-col justify-center m-auto gap-8 max-w-[1470px]"
  >
    <NavArchive />
    <slot />
  </div>
</template>
<style scoped></style>
