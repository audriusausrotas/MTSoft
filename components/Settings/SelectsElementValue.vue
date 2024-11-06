<script setup lang="ts">
const props = defineProps(["value", "editable", "index", "valueIndex"]);
const useSettings = useSettingsStore();

const deleteHandler = () => {
  useSettings.deleteSelect(props.index, props.valueIndex);
};
</script>

<template>
  <div class="relative group">
    <BaseInput
      :name="props.value.value"
      :disable="!props.editable"
      :variant="props.editable ? 'light' : ''"
      @onChange="
        (value: string): void =>
          useSettings.updateSelect(props.index, props.valueIndex, value)
      "
    />
    <NuxtImg
      v-if="props.editable"
      @click="deleteHandler"
      src="/icons/delete.svg"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      class="absolute top-2 right-1 hover:cursor-pointer hidden group-hover:block hover:scale-125 transition-transform"
    />
  </div>
</template>
<style scoped></style>
