<script setup lang="ts">
import type { Client, Project } from "~/data/interfaces";
const props = defineProps(["data"]);
const emit = defineEmits(["onClick"]);
const inputRef = ref<HTMLInputElement | null>(null);
const filteredData = reactive<any>([]);
const input = ref<string>("");

const emitClick = (value: Project): void => {
  input.value = "";
  emit("onClick", value);
};

onMounted(() => {
  filteredData.value = [...props.data];
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

const filteredItems = (value: string): void => {
  const regex = new RegExp(value, "i");
  const filteredItemsArray = props.data.filter((item: Client) => {
    return (
      regex.test(item.username) ||
      regex.test(item.address) ||
      regex.test(item.phone) ||
      regex.test(item.email)
    );
  });

  filteredData.value = [...filteredItemsArray];
};

watch(input, (newValue) => {
  filteredItems(newValue);
});
</script>

<template>
  <div
    class="relative flex flex-col font-medium border-2 border-red-600 rounded-lg overflow-hidden"
  >
    <div class="flex justify-center items-center pr-1">
      <input
        class="h-10 px-4 overflow-auto border outline-none w-full"
        placeholder="Ieškoti"
        v-model="input"
        ref="inputRef"
      />
    </div>
    <ul class="flex flex-col overflow-auto w-full divide-y max-h-96">
      <li
        v-for="item in filteredData.value"
        :key="item.id"
        @click="emitClick(item)"
        class="px-2 py-2 flex justify-between items-center odd:bg-gray-ultra-light hover:cursor-pointer hover:bg-red-full hover:text-white"
      >
        <p>
          {{ item.username }}
        </p>
        <p>
          {{ item.address }}
        </p>
      </li>
    </ul>
  </div>
</template>
