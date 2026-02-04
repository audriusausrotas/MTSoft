<script setup lang="ts">
const props = defineProps(["name", "label", "checked", "height", "disabled"]);

const emit = defineEmits(["onChange"]);

const emitUpdate = (value: boolean): void => {
  emit("onChange", value);
};
</script>

<template>
  <div
    class="flex flex-col text-sm items-center gap-4 justify-start"
    :class="height ? height : 'h-[64px]'"
  >
    <label v-if="label" :for="name" class="capitalize cursor-pointer select-none"
      >{{ label }}
    </label>
    <input
      :disabled="disabled"
      class="hover:cursor-pointer h-4 w-4"
      type="checkbox"
      :checked="checked"
      :id="name"
      @change="emitUpdate(($event.target as HTMLInputElement)?.checked)"
    />
  </div>
</template>
