<script setup lang="ts">
import { topBarLinks } from "~/data/initialValues";

const router = useRouter();
const route = useRoute();
const useUser = useUserStore();
const useProducts = useProductsStore();
const useProjects = useProjectsStore();

const isOpen = ref<boolean>(false);
const initials = computed(() => useUser?.user?.username.slice(0, 2));
const currentPath = ref("");

function routeHandler(newPath: string) {
  if (newPath === "/") currentPath.value = "Projektai";
  else {
    const path = newPath.replace("/", "");
    currentPath.value = path[0]?.toUpperCase() + path.slice(1);
  }
}
routeHandler(route.path);

watchEffect(() => {
  if (useUser.user && useProducts.products.length === 0) {
    useProjects.fetchProjects();
    useProducts.fetchProducts();
  }
});

watch(
  () => route.path,
  (newPath) => {
    routeHandler(newPath);
  }
);

function logoutHandler(): void {
  useUser.logout();
  router.replace("/login");
}
</script>

<template>
  <div v-if="useUser?.user?.username" class="shadow-bottom">
    <div
      class="flex flex-col items-center gap-4 px-12 py-4 m-auto sm:flex-row max-w-custom"
    >
      <div
        class="flex flex-col items-center justify-center flex-1 sm:flex-row sm:justify-between"
      >
        <NuxtImg
          src="/images/logo.png"
          alt="Moderni Tvora logotipas"
          width="86"
          height="48"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
        <!-- <SearchBar class="hidden lg:flex" /> -->

        <div
          v-if="useUser.user.accountType === 'Administratorius'"
          class="flex gap-4 justify-center flex-wrap flex-1"
        >
          <NuxtLink
            v-for="link in topBarLinks"
            :to="link.link"
            class="flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white"
            :class="currentPath === link.name ? 'bg-red-full text-white' : ''"
          >
            <NuxtImg
              v-if="link.iconPath !== ''"
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

      <div class="h-0 border-0 sm:h-12 sm:border"></div>
      <div
        @click="
          () => {
            isOpen = !isOpen;
          }
        "
        class="relative flex items-center gap-2 select-none hover:cursor-pointer"
      >
        <div
          class="flex items-center justify-center w-12 h-12 overflow-hidden font-semibold text-center uppercase rounded-full bg-red-full"
        >
          <NuxtImg
            v-if="useUser.user.photo !== ''"
            :src="useUser.user?.photo"
            class="object-cover object-center w-full h-full"
            width="48"
            height="48"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          <p v-else>{{ initials }}</p>
        </div>

        <div>{{ useUser.user.username }}</div>
        <NuxtImg
          src="/icons/arrowDown.svg"
          width="8"
          height="8"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />

        <div
          v-if="isOpen"
          class="absolute left-0 flex flex-col overflow-hidden bg-white border rounded-md top-14"
        >
          <NuxtLink
            to="/profilis"
            class="px-6 py-2 hover:text-white hover:bg-red-full"
            >Profilis</NuxtLink
          >
          <div
            @click="logoutHandler"
            class="px-6 py-2 hover:text-white hover:bg-red-full hover:cursor-pointer"
          >
            Atsijungti
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
