<script setup lang="ts">
const { error } = useError();
const { isError } = useError();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="error"
      class="fixed justify-center flex w-full top-0 left-0 z-50 pointer-events-none"
      :class="error ? 'animation' : ''"
    >
      <div
        class="text-white items-center font-medium capitalize text-xl text-center flex px-8 w-72 min-h-24 rounded-b-3xl justify-center py-4"
        :class="isError ? 'bg-red-full ' : 'bg-green-500 text-black'"
      >
        {{ error }}
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.animation {
  animation: slide 3s;
}

@keyframes slide {
  0% {
    transform: translateY(-100%);
  }
  10% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
