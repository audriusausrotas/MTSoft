<script setup lang="ts">
import { useSocketStore } from "~/store/socket";
const useUser = useUserStore();
const useSocket = useSocketStore();

onMounted(() => {
  const userID = useUser!.user!._id;
  const accountType = useUser!.user!.accountType;
  const username = useUser!.user!.username;
  const email = useUser!.user!.email;
  console.log(useUser!.user!._id);
  useSocket.connect(userID, accountType, username, email);
});
</script>

<template>
  <NavMain />
  <div class="px-4 py-10 flex justify-center max-w-[1400px] m-auto">
    <slot />
  </div>
</template>
<style scoped></style>
