divdivdivdiv
<script setup lang="ts">
import type { Image } from "~/data/interfaces";
const { setError, setSuccess } = useCustomError();
const websiteSettings = useWebsiteSettingsStore();

const newOpen = ref<boolean>(false);
const name = ref<string>("");
const url = ref<string>("");
const alt = ref<string>("");
const altEN = ref<string>("");

const saveHandler = async () => {
  const requestData: Image = {
    name: name.value,
    url: url.value,
    alt: alt.value,
    altEN: altEN.value,
  };

  const response: any = await request.post("newGalleryImage", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      websiteSettings.addGalleryImage(requestData);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  cancelHandler();
};

const cancelHandler = () => {
  newOpen.value = false;

  name.value = "";
  url.value = "";
  alt.value = "";
  altEN.value = "";
};
</script>

<template>
  <div>
    <BaseButton v-if="!newOpen" name="Pridėti naują" @click="newOpen = true" />
    <div v-else class="flex flex-col gap-2">
      <div class="flex gap-4">
        <BaseButton name="Išsaugoti" @click="saveHandler" />
        <BaseButton name="Atšaukti" @click="cancelHandler" />
      </div>

      <div class="flex gap-4 flex-wrap">
        <BaseInput
          label="Pavadinimas"
          width="w-80"
          :name="name"
          @onChange="(value: string) => (name = value)"
        />
        <BaseInput
          label="Nuoroda"
          width="w-80"
          :name="url"
          @onChange="(value: string) => (url = value)"
        />
        <BaseInput
          label="Aprašymas"
          width="w-80"
          :name="alt"
          @onChange="(value: string) => (alt = value)"
        />
        <BaseInput
          label="Aprašymas EN"
          width="w-80"
          :name="altEN"
          @onChange="(value: string) => (altEN = value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
