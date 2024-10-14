<script setup>
import { socket } from "./socket";

const useGamyba = useGamybaStore();

const isConnected = ref(false);
const transport = ref("N/A");

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});

socket.on("aaaa", (data) => {
  console.log(data);
  useGamyba.addGamyba(data);
});
</script>

<template>
  <div class="absolute top-1 left-1 flex gap-1">
    <div :class="['w-2 h-2 rounded-full ', isConnected ? 'bg-green-500' : 'bg-red-600']"></div>
    <div
      :class="['w-2 h-2 rounded-full ', transport !== 'N/A' ? 'bg-green-500' : 'bg-red-600']"
    ></div>
  </div>
</template>
