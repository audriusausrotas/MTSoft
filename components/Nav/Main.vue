<script setup lang="ts">
import { navigationLinks, optionLinks } from "~/data/initialValues";
import type { MenuLinks } from "~/data/interfaces";

const useSettings = useSettingsStore();
const useUser = useUserStore();
const route = useRoute();

const currentPath = ref("");

const userRights = useSettings.userRights.find(
  (item) => item.accountType === useUser?.user?.accountType
);

const adminLinks = userRights?.admin ? optionLinks : null;

const currentLinks: MenuLinks[] = navigationLinks.filter((link) => {
  if (link.name === "Projektai" && userRights?.project) return true;
  else if (link.name === "Grafikas" && userRights?.schedule) return true;
  else if (link.name === "Gamyba" && userRights?.production) return true;
  else if (link.name === "Montavimas" && userRights?.installation) return true;
  else if (link.name === "Vartai" && userRights?.gate) return true;
  else return false;
});

function routeHandler(newPath: string) {
  switch (newPath) {
    case "/":
      currentPath.value = "Projektai";
      break;
    case "/grafikas":
      currentPath.value = "Grafikas";
      break;
    case "/gamyba":
      currentPath.value = "Gamyba";
      break;
    case "/montavimas":
      currentPath.value = "Montavimas";
      break;
    case "/vartai":
      currentPath.value = "Vartai";
      break;
    default:
      currentPath.value = "Admin";
      break;
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

        <NavDesktop
          :currentPath="currentPath"
          :currentLinks="currentLinks"
          :adminLinks="adminLinks"
        />
        <NavMobile
          :currentPath="currentPath"
          :currentLinks="currentLinks"
          :adminLinks="adminLinks"
        />
        <NavUser :useUser="useUser" class="self-start" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
