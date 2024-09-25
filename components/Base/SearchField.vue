<script setup lang="ts">
import type { Product } from "~/data/interfaces";
const props = defineProps(["width", "data", "name", "index", "label"]);
const emit = defineEmits(["onClick", "onChange"]);
const inputRef = ref<HTMLInputElement | null>(null);
const filteredData = reactive<any>([]);
const open = ref<boolean>(false);

const emitUpdate = (value: string): void => {
  if (value.length === 0) {
    filteredData.value = [];
    open.value = false;
  } else {
    open.value = true;
  }

  emit("onChange", value);
  filteredItems(props.name);
};

const emitClick = (value: Product): void => {
  emit("onClick", value);
  open.value = false;
};

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

const filteredItems = (value: string): void => {
  const regex = new RegExp(value, "i");
  const filteredItemsArray = props.data.filter((item: Product) => regex.test(item.name));

  filteredData.value = [...filteredItemsArray];

  if (filteredItemsArray.length === 0) {
    open.value = false;
  } else {
    open.value = true;
  }
};
</script>

<template>
  <div class="relative flex flex-col font-medium gap-1">
    <label v-if="props.label" :for="props.label" class="pl-2 text-sm">{{ props.label }}</label>
    <input
      class="h-10 px-4 overflow-auto bg-white border rounded-lg shadow-sm outline-none border-dark-light"
      :id="props.label"
      :class="props.width ? props.width : 'w-60'"
      placeholder="Pavadinimas"
      :value="props.name"
      @input="emitUpdate(($event.target as HTMLInputElement)?.value)"
      ref="inputRef"
    />
    <ul
      v-if="open"
      class="absolute left-0 z-50 flex flex-col overflow-auto bg-white border divide-y rounded-lg shadow-sm top-14 border-dark-light w-96 min-w-fit"
    >
      <li
        v-for="item in filteredData.value"
        :key="item.id"
        @click="emitClick(item)"
        class="px-4 py-2 odd:bg-gray-ultra-light hover:cursor-pointer hover:bg-red-full hover:text-white"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
