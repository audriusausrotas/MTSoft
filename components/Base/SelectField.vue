<script setup>
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

const isOpen = ref(false);
const selectedValue = ref(props.defaultValue);

const changeHandler = (value) => {
  selectedValue.value = value;
  emit("onChange", value);
  isOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-2 capitalize select-none">
    <label v-if="props.label" :for="props.label" class="pl-2 text-sm">{{
      props.label
    }}</label>
    <div class="relative selct-none" :class="props.width ? `${props.width}` : 'w-48'">
      <div @click="props.disable ? '' : (isOpen = !isOpen)"
        class="flex justify-between gap-3 py-2 pl-4 border border-dark-light rounded-2xl" :class="[
          props.variant !== 'light'
            ? 'bg-gray-ultra-light'
            : props.disable
              ? 'bg-gray-ultra-light'
              : 'bg-white',
          props.disable ? '' : 'cursor-pointer',
        ]">
        <div class="flex gap-3 capitalize">
          <NuxtImg v-if="props.name === 'verified'" :src="selectedValue === 'patvirtintas'
              ? '/icons/ellipseg.svg'
              : '/icons/ellipser.svg'
            " width="8" height="8" />
          {{ selectedValue }}
        </div>
        <NuxtImg src="/icons/doubleArrow.svg" width="20" height="20" />
      </div>
      <div v-if="isOpen"
        class="absolute left-0 z-50 flex flex-col w-[inherit] overflow-y-scroll border max-h-52 rounded-xl top-10 border-gray-light"
        :class="props.variant === 'light' ? 'bg-white' : 'bg-gray-ultra-light'">
        <div v-for="(value, index) in props.values" :key="index" @click="changeHandler(value)"
          class="px-4 py-2 hover:bg-red-full hover:cursor-pointer hover:text-white">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
