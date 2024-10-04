<script setup lang="ts">
import type { MenuLinks } from "~/data/interfaces";
import { navigationLinks } from "~/data/initialValues";

const props = defineProps(["useUser"]);

let currentMenu = navigationLinks.filter(
  (item: MenuLinks) => item.name === props.useUser.user?.accountType || item.name === "Grafikas"
);

if (
  props.useUser.user?.accountType === "Vartonas" ||
  props.useUser.user?.accountType === "Gigasta"
) {
  currentMenu = navigationLinks.filter((item: MenuLinks) => item.name === "Vartai");
}
</script>

<template>
  <div class="flex gap-2 w-full justify-center">
    <NuxtLink
      v-for="current in currentMenu"
      :key="current.name"
      :to="current?.link"
      class="flex px-4 py-2 bg-red-full max-w-96 text-white rounded-md flex-1 justify-center hover:bg-red-500"
    >
      {{ current.name }}
    </NuxtLink>
  </div>
</template>

<style scoped></style>
