<script setup lang="ts">
import type { Product } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
  width?: string;
  data: string[];
  name: string;
  disable?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "onClick", value: string): void;
  (e: "onChange", event: Event): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const input = ref(props.name);
const filteredData = ref<string[]>([]);
const open = ref(false);
const shouldClose = ref(false);

const emitClick = (product: string): void => {
  shouldClose.value = true;
  input.value = product;
  open.value = false;
  emit("onClick", product);
};

const filteredItems = (value: string): void => {
  if (!value.trim()) {
    filteredData.value = [];
    open.value = false;
    return;
  }

  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");

  filteredData.value = props.data.filter((item) => regex.test(item));

  open.value = filteredData.value.length > 0;
};

const emitUpdate = (event: Event): void => {
  const target = event.currentTarget as HTMLInputElement;

  input.value = target.value;

  emit("onChange", event);

  filteredItems(target.value);
};

const cancelHandler = (): void => {
  input.value = "";
  filteredData.value = [];
  open.value = false;
};

watch(input, (value) => {
  if (shouldClose.value) {
    shouldClose.value = false;
    open.value = false;
    return;
  }

  if (value.length > 1) {
    filteredItems(value);
  } else {
    filteredData.value = [];
    open.value = false;
  }
});

watch(
  () => props.name,
  (value) => {
    input.value = value;
  },
);

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <div class="relative flex" :class="width ?? 'w-60'">
    <input
      ref="inputRef"
      v-model="input"
      class="w-full overflow-auto outline-none"
      :class="disable ? 'bg-gray-ultra-light' : 'bg-white'"
      :disabled="disable"
      @input="emitUpdate"
    />

    <ul
      v-if="open"
      class="absolute -left-2 border-2 border-red-full bottom-7 divide-dark-light z-50 flex w-72 min-w-fit flex-col overflow-auto rounded-lg bg-white shadow-sm divide-y"
    >
      <li
        v-for="item in filteredData"
        :key="uuidv4()"
        class="cursor-pointer bg-white font-medium px-2 py-2 odd:bg-gray-ultra-light hover:bg-red-full hover:text-white"
        @click="emitClick(item)"
      >
        {{ item }}
      </li>
    </ul>

    <div
      v-if="open"
      class="absolute -left-[46px] bottom-7 border-2 text-3xl text-center text-red-full font-bold border-red-full h-10 w-10 cursor-pointer select-none rounded-lg bg-white hover:bg-red-full hover:text-white"
      @click="cancelHandler"
    >
      X
    </div>
  </div>
</template>
