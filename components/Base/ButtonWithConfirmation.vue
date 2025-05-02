<script setup lang="ts">
const props = defineProps(["name", "isLoading"]);
const emit = defineEmits(["onConfirm"]);
const open = ref<Boolean>(false);

const buttonHandler = () => {
  emit("onConfirm");
  open.value = false;
};
</script>

<template>
  <div class="w-60">
    <BaseButton v-if="!open" :name="props.name" @click="open = true" :isLoading="props.isLoading" />
    <div v-else class="flex justify-between overflow-hidden text-white rounded-lg">
      <button class="flex-1 px-4 py-2 bg-dark-full hover:bg-red-full" @click="buttonHandler">
        Patvirtinti
      </button>
      <div class="border border-red-full"></div>
      <button
        class="flex-1 px-4 py-2 font-bold bg-dark-full text-red-full hover:text-black hover:bg-red-full"
        @click="open = false"
      >
        X
      </button>
    </div>
  </div>
</template>
<style scoped></style>
