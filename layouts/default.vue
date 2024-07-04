<script setup lang="ts">
const route = useRoute();
const useUser = useUserStore();
const showSidebar = ref<boolean>(false);

function routeHandler() {
  if (
    useUser?.user?.accountType === "Administratorius" ||
    useUser?.user?.accountType === "Paprastas vartotojas"
  )
    showSidebar.value = true;
  else showSidebar.value = false;
}

routeHandler();

watch(
  () => route.path,
  (newPath) => {
    routeHandler();
  }
);

</script>

<template>
  <TopBar class="print:hidden" />
  <div class="flex flex-col items-center gap-8 lg:px-12 lg:py-10 m-auto sm:items-start sm:flex-row max-w-custom">
    <Navigation v-if="showSidebar" class="print:hidden" />
    <div class="w-full px-8 py-12 border rounded-3xl">
      <slot />
    </div>
  </div>
</template>
<style scoped></style>
