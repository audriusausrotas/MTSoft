<script setup lang="ts">
const props = defineProps(["name", "placeholder", "type"]);
const emit = defineEmits(["onConfirm"]);

const open = ref<boolean>(false);
const inputValue = ref<string>("");

const cancelHandler = (): void => {
  open.value = false;
  inputValue.value = "";
};

const confirmHandler = () => {
  emit("onConfirm", inputValue.value);
  cancelHandler();
};
</script>

<template>
  <div>
    <BaseButton v-if="!open" :name="props.name" @click="open = !open" />
    <div v-else-if="open" class="flex h-10 overflow-hidden border rounded-lg">
      <input
        :placeholder="props.placeholder"
        :type="type || 'string'"
        class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
        v-model="inputValue"
        :autofocus="open"
        @keyup.enter="confirmHandler"
      />
      <button
        class="w-12 text-white bg-dark-full hover:bg-red-full hover:cursor-pointer"
        @click="confirmHandler"
      >
        OK
      </button>

      <button
        class="w-12 text-white border-l bg-dark-full hover:bg-red-full hover:cursor-pointer"
        @click="cancelHandler"
      >
        X
      </button>
    </div>
  </div>
</template>
<style scoped></style>
