<script setup lang="ts">
const isOpen = ref<boolean>(false);

const props = defineProps(["userStore"]);

const initials = computed(() => props.userStore?.user?.username.slice(0, 2));

async function logoutHandler() {
  const response: any = await request.get("logout");
  if (response.success) {
    const userStore = useUserStore();
    userStore.logout();
    const router = useRouter();
    router.push("/login");
  }
}
</script>

<template>
  <div class="flex gap-4">
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
        class="md:flex hidden items-center justify-center w-10 h-10 overflow-hidden font-semibold text-center uppercase rounded-full bg-red-full"
      >
        <!-- <NuxtImg
          v-if="props.userStore.user?.photo?.url && props.userStore.user.photo.url !== ''"
          :src="props.userStore.user?.photo?.url"
          class="object-cover object-center w-full h-full"
          width="48"
          height="48"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        /> -->
        <p>{{ initials }}</p>
      </div>

      <!-- <div v-if="userStore.user?.accountType === 'Administratorius'">
        {{ props.userStore.user?.username }}
      </div> -->
      <NuxtImg
        src="/icons/arrowDown.svg"
        width="10"
        height="10"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />

      <div
        v-if="isOpen"
        class="absolute right-0 flex flex-col overflow-hidden bg-white border rounded-md top-8 md:top-14 z-50"
      >
        <NuxtLink to="/profilis" class="px-6 py-2 hover:text-white hover:bg-red-full"
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
</template>

<style scoped></style>
