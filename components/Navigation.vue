<script setup lang="ts">
import { menuLinks, adminPanelLinks } from "~/data/initialValues";

const route = useRoute();
const useUser = useUserStore();
const currentPath = ref("");

function routeHandler(newPath: String) {
  switch (newPath) {
    case "/samata":
      currentPath.value = "Sąmata";
      break;
    case "/skaiciuokle":
      currentPath.value = "Skaičiuoklė";
      break;
    case "/admin":
      currentPath.value = "Vartotojai";
      break;
    case "/kainos":
      currentPath.value = "Kainos";
      break;
    case "/bonusai":
      currentPath.value = "Bonusai";
      break;
    default:
      currentPath.value = "";
      break;
  }
}

routeHandler(route.path);

watch(
  () => route.path,
  (newPath) => {
    routeHandler(newPath);
  }
);
</script>

<template>
  <nav v-if="useUser?.user?.accountType === 'Administratorius' ||
    useUser?.user?.accountType === 'Paprastas vartotojas'
    " class="lg:sticky flex flex-col items-center gap-10 top-8 w-44">
    <div>
      <div class="flex items-center gap-2">
        <h4 class="text-sm capitalize">panelė</h4>
      </div>

      <NuxtLink v-for="link in menuLinks" :to="link.link"
        class="flex gap-2 px-4 py-2 rounded-md w-36 hover:bg-red-full hover:text-white"
        :class="currentPath === link.name ? 'bg-red-full text-white' : ''">
        <NuxtImg :src="link.iconPath" width="20" height="20" decoding="auto" loading="lazy" :ismap="true" />
        {{ link.name }}
      </NuxtLink>
    </div>

    <div v-if="useUser?.user?.accountType === 'Administratorius'">
      <div class="flex items-center gap-2">
        <h4 class="text-sm capitalize">admin panelė</h4>
      </div>

      <NuxtLink v-for="link in adminPanelLinks" :to="link.link"
        class="flex gap-2 px-4 py-2 rounded-md w-36 hover:bg-red-full hover:text-white"
        :class="currentPath === link.name ? 'bg-red-full text-white' : ''">
        <NuxtImg :src="link.iconPath" width="20" height="20" decoding="auto" loading="lazy" :ismap="true" />
        {{ link.name }}
      </NuxtLink>
      <NuxtLink v-if="useUser?.user?.username === 'Audrius' || useUser?.user?.username === 'Andrius'" to="/bonusai"
        class="flex gap-2 px-4 py-2 rounded-md w-36 hover:bg-red-full hover:text-white"
        :class="currentPath === 'Bonusai' ? 'bg-red-full text-white' : ''">
        <NuxtImg src="/icons/bank.svg" width="20" height="20" decoding="auto" loading="lazy" :ismap="true" />
        Bonusai
      </NuxtLink>
    </div>
  </nav>
</template>
<style scoped></style>
