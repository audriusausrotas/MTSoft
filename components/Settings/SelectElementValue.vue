div
<script setup lang="ts">
const { setError, setIsError } = useError();
const props = defineProps(["value", "editable", "index"]);

const useSettings = useSettingsStore();

const deleteHandler = () => {};
</script>

<template>
  <div class="relative">
    <BaseInput
      :disable="!props.editable"
      :name="props.value"
      :variant="props.editable ? 'light' : ''"
      placeholder="Pasirinkimas"
      @on-change=""
    />
    <NuxtImg
      @click="deleteHandler"
      width="20"
      height="20"
      src="/icons/delete.svg"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer hover:scale-125 transition-transform absolute top-2 right-1"
    />
  </div>
</template>
<style scoped></style>
