<script setup lang="ts">
const { error } = useError();
const { isError } = useError();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="error"
      class="fixed top-0 left-0 z-50 flex justify-center w-full pointer-events-none"
      :class="error ? 'animation' : ''"
    >
      <div
        class="flex items-center justify-center px-8 py-4 text-xl font-medium text-center text-white capitalize w-72 min-h-24 rounded-b-3xl"
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
