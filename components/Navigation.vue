<script setup lang="ts">
import { navigationLinks, optionLinks, gateLinks } from "~/data/initialValues";
const route = useRoute();
const useUser = useUserStore();

const isOpen = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);
const gateOpen = ref<boolean>(false);
const optionsOpen = ref<boolean>(false);
const initials = computed(() => useUser?.user?.username.slice(0, 2));
const currentPath = ref("");

const currentMenu = navigationLinks.filter(
  (item) => item.name === useUser.user?.accountType || item.name === "Grafikas"
);

function routeHandler(newPath: string) {
  if (newPath === "/") currentPath.value = "Projektai";
  else {
    const path = newPath.replace("/", "");
    currentPath.value = path[0]?.toUpperCase() + path.slice(1);
  }
}
routeHandler(route.path);

function logoutHandler(): void {
  useUser.logout();
}

watch(
  () => route.path,
  (newPath) => {
    routeHandler(newPath);
  }
);
</script>

<template>
  <div class="shadow-bottom select-none">
    <div class="flex items-center gap-4 px-12 py-4 m-auto max-w-custom">
      <div class="flex items-center flex-1 flex-row justify-between">
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

        <div
          v-if="useUser.user!.accountType === 'Administratorius'"
          class="flex gap-4 md:justify-center flex-wrap flex-1"
        >
          <div
            v-for="link in navigationLinks"
            :key="link.name"
            @mouseenter="
              link.name === 'Vartai'
                ? (gateOpen = true)
                : link.name === 'Nustatymai'
                ? (optionsOpen = true)
                : ''
            "
            @mouseleave="
              link.name === 'Vartai'
                ? (gateOpen = false)
                : link.name === 'Nustatymai'
                ? (optionsOpen = false)
                : ''
            "
          >
            <NuxtLink
              :to="link.link"
              class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white relative"
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

              <div
                v-if="link.name === 'Vartai' && gateOpen"
                class="absolute top-10 left-0 w-40 z-40 bg-white shadow-lg rounded-md border border-dark-light"
              >
                <NuxtLink
                  v-for="lnk in gateLinks"
                  :key="lnk.name"
                  :to="lnk.link"
                  class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
                  :class="
                    currentPath === lnk.name
                      ? 'bg-red-full text-white'
                      : 'text-black'
                  "
                  >{{ lnk.name }}</NuxtLink
                >
              </div>

              <div
                v-if="link.name === 'Nustatymai' && optionsOpen"
                class="absolute top-10 left-0 w-40 z-40 bg-white shadow-lg rounded-md border border-dark-light"
              >
                <NuxtLink
                  v-for="lnk in optionLinks"
                  :key="lnk.name"
                  :to="lnk.link"
                  class="md:flex gap-2 px-4 py-2 rounded-md w-40 justify-center hover:bg-red-full hover:text-white hidden relative"
                  :class="
                    currentPath === lnk.name
                      ? 'bg-red-full text-white'
                      : 'text-black'
                  "
                  >{{ lnk.name }}</NuxtLink
                >
              </div>
            </NuxtLink>
          </div>

          <div class="flex md:hidden" @click="isMenuOpen = !isMenuOpen">
            <NuxtImg
              src="/icons/hamburger.svg"
              width="24"
              height="24"
              decoding="auto"
              loading="lazy"
              :ismap="true"
            />
          </div>
        </div>

        <div v-else class="flex gap-2">
          <NuxtLink
            v-for="current in currentMenu"
            :key="current.name"
            :to="current?.link"
            class="flex px-4 py-2 bg-red-full text-white rounded-md w-40 justify-center hover:bg-red-500"
          >
            <NuxtImg
              v-if="current?.iconPath !== ''"
              :src="current?.iconPath"
              width="20"
              height="20"
              decoding="auto"
              loading="lazy"
              :ismap="true"
            />

            {{ current.name }}
          </NuxtLink>
        </div>
      </div>

      <div class="h-0 border-0 sm:h-12 sm:border hidden md:block"></div>
      <div
        @click="
          () => {
            isOpen = !isOpen;
          }
        "
        class="relative flex items-center gap-2 select-none hover:cursor-pointer"
      >
        <div
          class="md:flex hidden items-center justify-center w-12 h-12 overflow-hidden font-semibold text-center uppercase rounded-full bg-red-full"
        >
          <NuxtImg
            v-if="useUser.user?.photo?.url && useUser.user.photo.url !== ''"
            :src="useUser.user?.photo?.url"
            class="object-cover object-center w-full h-full"
            width="48"
            height="48"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          <p v-else>{{ initials }}</p>
        </div>

        <div>{{ useUser.user!.username }}</div>
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
          class="absolute left-0 flex flex-col overflow-hidden bg-white border rounded-md top-8 md:top-14 z-50"
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
    <div
      v-if="isMenuOpen"
      class="flex md:hidden border-t p-4 top-14 left-0 w-full"
    >
      <div class="flex-1">
        <NuxtLink
          v-for="link in navigationLinks"
          :to="link.link"
          class="flex gap-2 px-4 py-2 rounded-md w-40 hover:bg-red-full hover:text-white"
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
      <div class="flex-1">
        <Navigation />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
