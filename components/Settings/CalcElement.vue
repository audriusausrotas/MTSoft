<script setup lang="ts">
import type { Product } from "~/data/interfaces";
const { setError, setIsError } = useError();
const props = defineProps(["value", "data", "field", "name"]);
const settingsStore = useSettingsStore();
const input = ref<string>("");

const editable = ref<boolean>(false);

const clickHandler = (value: Product) => {
  input.value = value.name;
  settingsStore.changeDefaultValue(value.name, props.field);
};

const saveHandler = async () => {
  const requestData = { value: input.value, field: props.field };

  const response: any = await request.post("newDefaultValue", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      settingsStore.changeDefaultValue(response.data.value, response.data.field);
    editable.value = false;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex gap-4 items-center">
    <NuxtImg
      v-if="!editable"
      @click="editable = true"
      src="/icons/edit.svg"
      alt="edit button"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      class="hover:cursor-pointer hover:scale-125 transition-transform"
    />
    <NuxtImg
      v-else
      @click="saveHandler"
      width="20"
      height="20"
      src="/icons/save.svg"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer hover:scale-125 transition-transform"
    />
    <BaseInfoField width="w-96" :name="props.name" />
    <BaseInfoField v-if="!editable" width="w-full max-w-[500px] " :name="props.value" />
    <BaseSearchField
      v-else
      width="w-full max-w-[500px]"
      :data="props.data"
      :name="input"
      @onChange="(value) => (input = value)"
      @OnClick="clickHandler"
    />
  </div>
</template>
<style scoped></style>
