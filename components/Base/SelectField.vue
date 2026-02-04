<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    values?: string[];
    defaultValue?: string;
    name?: string;
    label?: string;
    width?: string;
    disable?: boolean;
    variant?: string;
  }>(),
  {
    values: () => [],
    defaultValue: "",
    name: "",
    label: "",
    width: "w-48",
    disable: false,
    variant: "light",
  },
);

const emit = defineEmits(["onChange"]);

const isOpen = ref<boolean>(false);
const selectedValue = ref<string>(props?.defaultValue);

const changeHandler = (value: string): void => {
  selectedValue.value = value;
  emit("onChange", value);
  isOpen.value = false;
};

watch(
  () => props.defaultValue,
  (newVal) => {
    selectedValue.value = newVal;
  },
);
</script>

<template>
  <div class="flex flex-col gap-1 select-none rounded-lg">
    <label v-if="label" :for="label" class="pl-2 text-sm">{{ label }}</label>
    <div class="relative selct-none h-10" :class="[width, disable ? 'bg-stone-100' : '']">
      <div
        @click="disable ? '' : (isOpen = !isOpen)"
        class="flex justify-between h-10 gap-3 py-2 pl-4 border border-dark-light rounded-lg bg-inherit shadow-sm"
        :class="[
          variant !== 'light'
            ? 'bg-gray-ultra-light'
            : disable
              ? 'bg-gray-ultra-light'
              : 'bg-white',
          disable ? '' : 'cursor-pointer',
          props?.defaultValue?.includes('@') ? 'lowercase' : 'capitalize',
        ]"
      >
        <div class="flex gap-3">
          <NuxtImg
            v-if="name === 'verified'"
            :src="defaultValue === 'patvirtintas' ? '/icons/ellipseg.svg' : '/icons/ellipser.svg'"
            width="8"
            height="8"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          {{ selectedValue }}
        </div>
        <NuxtImg
          src="/icons/doubleArrow.svg"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </div>
      <div
        v-if="isOpen"
        class="absolute left-0 z-50 flex flex-col w-[inherit] overflow-y-auto border shadow-lg max-h-52 rounded-lg top-10 border-dark-light"
        :class="[
          variant === 'light' ? 'bg-white' : 'bg-gray-ultra-light',
          values?.some((item: any) => item.value?.includes('@')),
        ]"
      >
        <div
          v-for="(value, index) in values"
          :key="index"
          @click="changeHandler(value)"
          class="px-4 py-2 hover:bg-red-full hover:cursor-pointer hover:text-white"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
