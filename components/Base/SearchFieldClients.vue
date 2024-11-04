<script setup lang="ts">
import type { Client, Project } from "~/data/interfaces";
const props = defineProps(["data", "name"]);
const emit = defineEmits(["onClick", "onChange", "modalClose"]);
const inputRef = ref<HTMLInputElement | null>(null);
const filteredData = reactive<any>([]);

const emitUpdate = (value: string): void => {
  if (value.length === 0) {
    filteredData.value = [];
  }
  emit("onChange", value);
  filteredItems(props.name);
};

const emitClick = (value: Project): void => {
  emit("onClick", value);
};

const emitClose = () => {
  emit("modalClose");
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
</script>

<template>
  <div
    class="relative flex flex-col font-medium border-2 border-red-600 rounded-lg overflow-hidden"
  >
    <div class="flex justify-center items-center pr-1">
      <input
        class="h-10 px-4 overflow-auto border outline-none w-full"
        placeholder="Ieškoti"
        :value="props.name"
        @input="emitUpdate(($event.target as HTMLInputElement)?.value)"
        ref="inputRef"
      />
      <button
        @click="emitClose"
        class="bg-red-600 text-white w-8 h-8 flex justify-center items-center rounded-md"
      >
        X
      </button>
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
