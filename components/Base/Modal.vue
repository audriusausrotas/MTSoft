<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
  width: {
    type: String,
    default: "w-full",
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["onClose", "onConfirm"]);

const closeHandler = () => {
  emit("onClose");
};

const confirmHandler = () => {
  emit("onConfirm");
};
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed flex flex-col items-center justify-center backdrop-brightness-50 bg-neutral-300 bg-opacity-30 backdrop-blur-sm z-50 select-none top-0 left-0 w-full h-full"
    >
      <div
        class="bg-white rounded-md p-4 relative flex flex-col items-center justify-center gap-4"
        :class="props.width"
      >
        <h3 v-if="props.title" class="font-semibold text-xl">
          {{ props.title }}
        </h3>
        <slot />
        <div v-if="showButtons" class="flex gap-4">
          <BaseButton @click="confirmHandler">Patvirtinti</BaseButton>
          <BaseButton @click="closeHandler">Atšaukti</BaseButton>
        </div>
      </div>

      <NuxtImg
        src="/icons/close.svg"
        width="40"
        height="40"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        class="absolute top-2 right-4 font-bold text-2xl hover:cursor-pointer px-1 py-1"
        @click="closeHandler"
      />
    </div>
  </Teleport>
</template>
<style scoped></style>
