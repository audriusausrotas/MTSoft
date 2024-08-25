<script setup lang="ts">
const props = defineProps([
  "values",
  "defaultValue",
  "name",
  "label",
  "width",
  "disable",
  "variant",
]);
const emit = defineEmits(["onChange"]);

const isOpen = ref<boolean>(false);
const selectedValue = ref<string>(props.defaultValue);

const changeHandler = (value: string): void => {
  selectedValue.value = value;
  emit("onChange", value);
  isOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col self-end gap-1 select-none">
    <label v-if="props.label" :for="props.label" class="pl-2 text-sm">{{
      props.label
    }}</label>
    <div class="relative selct-none h-10" :class="[props.width ? `${props.width}` : 'w-48'
      ]">
      <div @click="props.disable ? '' : (isOpen = !isOpen)"
        class="flex justify-between h-10 gap-3 py-2 pl-4 border border-dark-light rounded-lg  shadow-sm" :class="[
      props.variant !== 'light'
        ? 'bg-gray-ultra-light'
        : props.disable
          ? 'bg-gray-ultra-light'
          : 'bg-white',
      props.disable ? '' : 'cursor-pointer',
      props.defaultValue.includes('@') ? 'lowercase' : 'capitalize'
    ]">
        <div class="flex gap-3">
          <NuxtImg v-if="props.name === 'verified'" :src="props.defaultValue === 'patvirtintas'
      ? '/icons/ellipseg.svg'
      : '/icons/ellipser.svg'
      " width="8" height="8" decoding="auto" loading="lazy" :ismap="true" />
          {{ selectedValue }}
        </div>
        <NuxtImg src="/icons/doubleArrow.svg" width="20" height="20" decoding="auto" loading="lazy" :ismap="true" />
      </div>
      <div v-if="isOpen"
        class="absolute left-0 z-50 flex flex-col w-[inherit] overflow-y-auto border max-h-52 rounded-xl top-10 border-dark-light"
        :class="[props.variant === 'light' ? 'bg-white' : 'bg-gray-ultra-light', props.values.some((item: string) => item.includes('@'))]">
        <div v-for="( value, index ) in  props.values " :key="index" @click="changeHandler(value)"
          class="px-4 py-2 hover:bg-red-full hover:cursor-pointer hover:text-white">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
