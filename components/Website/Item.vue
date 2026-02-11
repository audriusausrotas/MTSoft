<script setup lang="ts">
import type { Image } from "~/data/interfaces";

const props = defineProps<{
  image: Image;

  index: number;
}>();

const emit = defineEmits(["onUpdate", "onDelete"]);

const editable = ref<boolean>(false);
const name = ref<string>(props.image.name);
const url = ref<string>(props.image.url);
const alt = ref<string>(props.image.alt);
const altEN = ref<string>(props.image.altEN || "");

const saveHandler = async () => {
  emit("onUpdate", {
    name: name.value,
    url: url.value,
    alt: alt.value,
    altEN: altEN.value,
    index: props.index,
  });
};

const editHandler = () => {
  editable.value = true;
};

const cancelHandler = () => {
  editable.value = false;
};

const deleteHandler = async () => {
  emit("onDelete", url.value);
};
</script>

<template>
  <div class="flex gap-4 items-center">
    <BaseInput :name="index + 1" type="number" width="w-10" :disable="true" />

    <BaseInput
      :name="name"
      width="w-80"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="(value) => (name = value)"
    />

    <BaseInput
      :name="url"
      width="w-80"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="(value) => (url = value)"
    />

    <BaseInput
      :name="alt"
      width="w-80"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="(value) => (alt = value)"
    />

    <BaseInput
      :name="altEN"
      width="w-80"
      :disable="!editable"
      :variant="editable ? 'light' : ''"
      @onChange="(value) => (altEN = value)"
    />

    <BaseActionButtons
      @onSave="saveHandler"
      @onEdit="editHandler"
      @onDelete="deleteHandler"
      @onCancel="cancelHandler"
    />
  </div>
</template>

<style scoped></style>
