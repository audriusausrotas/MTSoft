<script setup lang="ts">
import { navigationLinks, optionLinks, gateLinks } from "~/data/initialValues";

const useUser = useUserStore();
const route = useRoute();

const currentPath = ref("");

function routeHandler(newPath: string) {
  if (newPath === "/") currentPath.value = "Projektai";
  else {
    const path = newPath.replace("/", "");
    currentPath.value = path[0]?.toUpperCase() + path.slice(1);
  }
}
routeHandler(route.path);

watch(
  () => route.path,
  (newPath: string) => {
    routeHandler(newPath);
  }
);
</script>

<template>
  <div class="shadow-bottom select-none">
    <div class="p-4 md:px-12 m-auto max-w-custom">
      <div class="flex items-center flex-1 justify-between">
        <NuxtImg
          src="/images/logo.png"
          alt="Moderni Tvora logotipas"
          width="86"
          height="48"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hidden lg:block"
        />

        <template v-if="useUser.user?.accountType === 'Administratorius'">
          <NavDesktopAdmin :currentPath="currentPath" />
          <NavMobile :currentPath="currentPath" />
        </template>
        <template v-else>
          <NavDesktopOther :useUser="useUser" :navigationLinks="navigationLinks" />
        </template>
        <NavUser :useUser="useUser" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
