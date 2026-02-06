<script setup lang="ts">
import { navigationLinks, optionLinks, adminLinks } from "~/data/initialValues";
import type { MenuLinks } from "~/data/interfaces";

const settingsStore = useSettingsStore();
const userStore = useUserStore();
const route = useRoute();

// const currentPath = ref("");

const userRights = settingsStore.userRights.find(
  (item) => item.accountType === userStore?.user?.accountType,
);

const optionLinksFiltered = userRights?.other ? optionLinks : null;
const adminLinksFiltered = userRights?.admin ? adminLinks : null;

const currentLinks: MenuLinks[] = navigationLinks.filter((link) => {
  if (link.name === "Projektai" && userRights?.project) return true;
  else if (link.name === "Grafikas" && userRights?.schedule) return true;
  else if (link.name === "Gamyba" && userRights?.production) return true;
  else if (link.name === "Montavimas" && userRights?.installation) return true;
  else if (link.name === "Sandėlys" && userRights?.warehouse) return true;
  else if (link.name === "Užsakymai" && userRights?.orders) return true;
  else return false;
});

const currentPath = computed(() => {
  const newPath = route.path;

  if (newPath.includes("/projektai")) return "Projektai";
  if (newPath === "/") return "Projektai";
  if (newPath === "/skaiciuokle") return "Projektai";
  if (newPath.includes("/perziura")) return "Projektai";
  if (newPath === "/grafikas") return "Grafikas";
  if (newPath.includes("/gamyba")) return "Gamyba";
  if (newPath.includes("/montavimas")) return "Montavimas";
  if (newPath.includes("/sandelys")) return "Sandėlys";
  if (newPath.includes("/uzsakymai")) return "Užsakymai";
  if (newPath.includes("/vartotojai")) return "Admin";
  if (newPath.includes("/ataskaitos")) return "Admin";
  if (newPath.includes("/nustatymai")) return "Admin";
  if (newPath.includes("/tinklapio-nustatymai")) return "Admin";

  return "Kita";
});
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
          :adminLinks="adminLinksFiltered"
          :optionLinks="optionLinksFiltered"
        />
        <NavMobile
          :currentPath="currentPath"
          :currentLinks="currentLinks"
          :adminLinks="adminLinks"
          :optionLinks="optionLinksFiltered"
        />
        <NavUser :userStore="userStore" class="self-start" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
