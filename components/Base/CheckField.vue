<script setup lang="ts">
const props = defineProps(["name", "label", "checked"]);

const emit = defineEmits(["onChange"]);

const emitUpdate = (value: boolean): void => {
  emit("onChange", value);
};
</script>

<template>
  <div class="flex flex-col text-sm items-center h-[64px] gap-4 justify-start ">
    <label :for="props.name" class="capitalize cursor-pointer select-none">{{ props.label }}
    </label>
    <input class=" hover:cursor-pointer h-4 w-4" type="checkbox" :checked="props.checked" :id="props.name"
      @change="emitUpdate(($event.target as HTMLInputElement)?.checked)" />
  </div>
</template>
