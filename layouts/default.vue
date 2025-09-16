<script setup lang="ts">
import { useSocketStore } from "~/store/socket";
const useSocket = useSocketStore();

const upHandler = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  useSocket.connect();
});
</script>

<template>
  <SocketStatus
    :connected="useSocket.isConnected"
    :transporter="useSocket.transporter"
  />
  <NavMain />
  <div
    class="fixed bottom-1 right-1 rounded-full overflow-hidden hidden hover:scale-125 transition-transform lg:block bg-red-500 hover:cursor-pointer z-50"
    :onclick="upHandler"
  >
    <NuxtImg
      src="/icons/arrowUp.svg"
      alt="Rodykle aukstyn"
      width="32"
      height="32"
      decoding="auto"
      loading="lazy"
      :ismap="true"
    />
  </div>
  <div class="px-4 py-10 flex justify-center max-w-[1470px] m-auto">
    <slot />
  </div>
</template>
<style scoped></style>
