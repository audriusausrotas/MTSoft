<script setup lang="ts">
import { menuLinks } from "~/data/initialValues";

const route = useRoute();
const useUser = useUserStore();
const currentPath = ref("");

function routeHandler(newPath: String) {
  if (newPath.includes("samata")) currentPath.value = "Sąmata";
  else if (newPath.includes("skaiciuokle")) currentPath.value = "Skaičiuoklė";
  else currentPath.value = newPath.replace("/", " ");
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
  <nav
    v-if="useUser?.user?.username"
    class="lg:sticky flex flex-col items-center gap-10 top-8 w-44"
  >
    <div v-if="useUser?.user?.username" class="flex items-center gap-2">
      <NuxtImg
        src="/icons/menu.svg"
        width="16"
        height="16"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
      <h2 class="text-xl font-bold capitalize">
        {{ currentPath.length > 0 ? currentPath : "Projektai" }}
      </h2>
    </div>

    <div>
      <div class="flex items-center gap-2">
        <NuxtImg
          src="/icons/arrowDown.svg"
          width="8"
          height="8"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
        <h4 class="text-sm capitalize">panelė</h4>
      </div>

      <div v-for="link in menuLinks">
        <NuxtLink
          :to="link.link"
          class="flex gap-2 px-4 py-2 rounded-md w-36 hover:bg-red-full hover:text-white"
          :class="currentPath === link.name ? 'bg-red-full text-white' : ''"
        >
          <NuxtImg
            :src="link.iconPath"
            width="20"
            height="20"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>

    <div>
      <div class="flex items-center gap-2">
        <NuxtImg
          src="/icons/arrowDown.svg"
          width="8"
          height="8"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
        <h4 class="text-sm capitalize">admin panelė</h4>
      </div>
      <NuxtLink
        to="/admin"
        class="flex gap-2 px-4 py-2 rounded-md hover:bg-red-full hover:text-white hover:bg-dark"
      >
        <NuxtImg
          src="/icons/users.svg"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
        <h3 class="capitalize hover:bg-red-full hover:text-white">
          vartotojai
        </h3>
      </NuxtLink>
    </div>
  </nav>
</template>
<style scoped></style>
