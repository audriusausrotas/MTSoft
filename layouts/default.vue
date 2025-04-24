<script setup lang="ts">
import { useSocketStore } from "~/store/socket";
const useSocket = useSocketStore();

// onMounted(() => {
//   useSocket.connect();
// });
</script>

<template>
  <SocketStatus :connected="useSocket.isConnected" :transporter="useSocket.transporter" />
  <NavMain />
  <div class="px-4 py-10 flex justify-center max-w-[1400px] m-auto">
    <slot />
  </div>
</template>
<style scoped></style>
