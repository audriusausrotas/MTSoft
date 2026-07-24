<script setup lang="ts">
definePageMeta({
  layout: false,
  ssr: false,
});

const useSocket = useSocketStore();

async function logoutHandler() {
  const response: any = await request.get("logout");
  if (response.success) {
    const userStore = useUserStore();
    userStore.logout();
    const router = useRouter();
    router.push("/login");
  }
}

onMounted(async () => {
  useSocket.connect();
});
</script>

<template>
  <div
    class="flex flex-col h-screen w-screen p-8 items-center gap-14 relative select-none"
  >
    <ClientOnly>
      <ScreenTime />
    </ClientOnly>
    <ScreenReports />
    <div
      @click="logoutHandler"
      class="absolute top-1 left-1 border border-gray-300 rounded-lg shadow-lg p-1.5 w-8 h-8 hover:cursor-pointer"
    >
      <img src="/icons/logout.svg" alt="logout button" />
    </div>
  </div>
</template>
<style scoped></style>
