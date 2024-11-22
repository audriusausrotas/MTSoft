<script setup lang="ts">
import type { Product } from "~/data/interfaces";
const props = defineProps(["width", "data", "label", "name", "disable"]);
const emit = defineEmits(["onClick", "onChange"]);
const inputRef = ref<HTMLInputElement | null>(null);
const filteredData = reactive<any>([]);
const open = ref<boolean>(false);
const shouldClose = ref<boolean>(false);
const input = ref<string>(props.name);

const emitClick = (value: Product): void => {
  shouldClose.value = true;
  input.value = value.name;
  emit("onClick", value);
  open.value = false;
};

const filteredItems = (value: string): void => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "");
  const regex = new RegExp(escapedValue, "i");
  const filteredItemsArray = props.data.filter((item: Product) =>
    regex.test(item.name)
  );
  filteredData.value = [...filteredItemsArray];

  if (filteredItemsArray.length === 0) {
    open.value = false;
  } else {
    open.value = true;
  }
};

watch(input, (newValue) => {
  if (shouldClose.value) {
    open.value = false;
    shouldClose.value = false;
  } else {
    if (newValue.length > 1) filteredItems(newValue);
    else open.value = false;
  }
});

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div
    class="relative flex flex-col font-medium gap-1"
    :class="props.width ? props.width : 'w-60'"
  >
    <label v-if="props.label" :for="props.label" class="pl-2 text-sm">{{
      props.label
    }}</label>
    <input
      class="h-10 px-4 overflow-auto rounded-lg shadow-sm outline-none costom-border w-full"
      :class="props.disable ? 'bg-gray-ultra-light' : 'bg-white'"
      :id="props.label"
      placeholder="Pavadinimas"
      :disabled="props.disable"
      v-model="input"
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
<style scoped>
.costom-border {
  border: 1px solid lightgray;
}
</style>
