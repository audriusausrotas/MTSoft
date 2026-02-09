<script setup lang="ts">
import type { Image } from "~/data/interfaces";
const { setError, setSuccess } = useCustomError();

const props = defineProps<{
  image: Image;
  index: number;
}>();

const websiteSettings = useWebsiteSettingsStore();
const editable = ref<boolean>(false);

const name = ref<string>(props.image.name);
const url = ref<string>(props.image.url);
const alt = ref<string>(props.image.alt);
const altEN = ref<string>(props.image.altEN || "");

const saveHandler = async () => {
  const requestData = {
    name: name.value,
    url: url.value,
    alt: alt.value,
    altEN: altEN.value,
    index: props.index,
  };

  const response: any = await request.patch("updateGalleryImage", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      websiteSettings.editGalleryImage(props.index, requestData);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  editable.value = false;
};

const editHandler = () => {
  editable.value = true;
};

const cancelHandler = () => {
  editable.value = false;
};

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti šį paveikslėlį?");
  if (!confirmed) return;

  const requestData = {
    url: url.value,
  };

  const response: any = await request.delete("deleteGalleryImage", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      websiteSettings.deleteGalleryImage(requestData.url);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex gap-4">
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
