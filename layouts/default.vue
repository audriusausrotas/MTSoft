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
  <TopBar v-if="useUser?.user" class="print:hidden" />
  <div class="flex flex-col items-center gap-8 lg:px-12 lg:py-10 p-4 m-auto md:items-start md:flex-row max-w-custom">
    <Navigation v-if="useUser?.user && showSidebar" class="print:hidden hidden md:flex" />
    <div class="w-full px-8 py-12 border rounded-3xl">
      <slot />
    </div>
  </div>
</template>
<style scoped></style>
