<script setup lang="ts">
const props = defineProps(["name", "label", "checked", "height"]);

const emit = defineEmits(["onChange"]);

const emitUpdate = (value: boolean): void => {
  emit("onChange", value);
};
</script>

<template>
  <div
    class="flex flex-col text-sm items-center gap-4 justify-start"
    :class="props.height ? props.height : 'h-[64px]'"
  >
    <label :for="props.name" class="capitalize cursor-pointer select-none"
      >{{ props.label }}
    </label>
    <input
      class="hover:cursor-pointer h-4 w-4"
      type="checkbox"
      :checked="props.checked"
      :id="props.name"
      @change="emitUpdate(($event.target as HTMLInputElement)?.checked)"
    />
  </div>
</template>
