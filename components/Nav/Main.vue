<script setup lang="ts">
import { navigationLinks, optionLinks } from "~/data/initialValues";
import type { MenuLinks } from "~/data/interfaces";

const settingsStore = useSettingsStore();
const userStore = useUserStore();
const route = useRoute();

const currentPath = ref("");

const userRights = settingsStore.userRights.find(
  (item) => item.accountType === userStore?.user?.accountType
);

const adminLinks = userRights?.admin ? optionLinks : null;

const currentLinks: MenuLinks[] = navigationLinks.filter((link) => {
  if (link.name === "Projektai" && userRights?.project) return true;
  else if (link.name === "Grafikas" && userRights?.schedule) return true;
  else if (link.name === "Gamyba" && userRights?.production) return true;
  else if (link.name === "Montavimas" && userRights?.installation) return true;
  else if (link.name === "Sandėlys" && userRights?.warehouse) return true;
  else if (link.name === "Užsakymai" && userRights?.orders) return true;
  else if (link.name === "Vartai" && userRights?.gate) return true;
  else return false;
});

const routeHandler = (newPath: string) => {
  if (newPath.includes("/projektai")) {
    currentPath.value = "Projektai";
  } else if (newPath === "/") {
    currentPath.value = "Projektai";
  } else if (newPath === "/skaiciuokle") {
    currentPath.value = "Projektai";
  } else if (newPath.includes("/perziura")) {
    currentPath.value = "Projektai";
  } else if (newPath === "/grafikas") {
    currentPath.value = "Grafikas";
  } else if (newPath.includes("/gamyba")) {
    currentPath.value = "Gamyba";
  } else if (newPath.includes("/montavimas")) {
    currentPath.value = "Montavimas";
  } else if (newPath.includes("/sandelys")) {
    currentPath.value = "Sandėlys";
  } else if (newPath.includes("/uzsakymai")) {
    currentPath.value = "Užsakymai";
  } else if (newPath.includes("/vartai")) {
    currentPath.value = "Vartai";
  } else {
    currentPath.value = "Admin";
  }
};

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
        <NavUser :userStore="userStore" class="self-start" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
