<script setup lang="ts">
import type { Product } from "~/data/interfaces";

const props = defineProps(["name", "type", "data"]);
const emit = defineEmits(["onConfirm"]);

const openInput = ref<boolean>(false);
const openData = ref<boolean>(false);
const input = ref<string>("");
const filteredData = reactive<any>([]);
const selectedElement = ref<string>("");

const clickHandler = (value: Product) => {
  selectedElement.value = value.name;
  input.value = value.name;
  openData.value = false;
};

const cancelHandler = (): void => {
  openInput.value = false;
  openData.value = true;
  input.value = "";
  selectedElement.value = "";
};

const confirmHandler = () => {
  emit("onConfirm", selectedElement.value);
  cancelHandler();
};

const buttonOpen = () => {
  openInput.value = true;
  openData.value = true;
  filteredItems("");
};

const filteredItems = (value: string): void => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "");
  const regex = new RegExp(escapedValue, "i");
  const filteredItemsArray = props.data.filter((item: Product) =>
    regex.test(item.name)
  );

  filteredData.value = [...filteredItemsArray];
};

watch(input, (newValue) => {
  filteredItems(newValue);
});
</script>

<template>
  <div class="relative w-fit">
    <BaseButton v-if="!openInput" :name="props.name" @click="buttonOpen" />
    <div
      v-else-if="openInput"
      class="flex h-10 overflow-hidden border rounded-lg"
    >
      <input
        :type="type || 'string'"
        class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
        v-model="input"
        @keyup.enter="confirmHandler"
      />
      <ul
        v-if="openData"
        class="absolute left-0 z-50 flex max-h-60 flex-col overflow-auto bg-white border divide-y rounded-lg shadow-sm top-10 border-dark-light w-96 min-w-fit"
      >
        <li
          v-for="item in filteredData.value"
          :key="item.id"
          @click="clickHandler(item)"
          class="px-4 py-2 odd:bg-gray-ultra-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        >
          {{ item.name }}
        </li>
      </ul>
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
