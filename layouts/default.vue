<script setup lang="ts">
import { useSocketStore } from "~/store/socket";
const useSocket = useSocketStore();

const upHandler = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const downHandler = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
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
    class="fixed bottom-9 right-0 rounded-full overflow-hidden hidden bg-green-500 hover:scale-125 transition-transform lg:block hover:cursor-pointer z-50"
    @click="upHandler"
  >
    <NuxtImg
      src="/icons/arrowUpBold.svg"
      alt="Rodykle aukstyn"
      width="28"
      height="28"
      decoding="auto"
      loading="lazy"
      :ismap="true"
    />
  </div>
  <div
    class="fixed bottom-1 right-0 rounded-full rotate-180 overflow-hidden hidden bg-red-500 hover:scale-125 transition-transform lg:block hover:cursor-pointer z-50"
    @click="downHandler"
  >
    <NuxtImg
      src="/icons/arrowUpBold.svg"
      alt="Rodykle aukstyn"
      width="28"
      height="28"
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
