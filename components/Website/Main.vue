<script setup lang="ts">
import type { Image } from "~/data/interfaces";

const websiteSettings = useWebsiteSettingsStore();
const { setError, setSuccess } = useCustomError();

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const storeConfig = computed(() => {
  const typeKey = props.type.toLowerCase();

  const typeConfig = {
    gallery: {
      dataKey: "gallery" as const,
      addMethod: websiteSettings.addGalleryImage,
      editMethod: websiteSettings.editGalleryImage,
      deleteMethod: websiteSettings.deleteGalleryImage,
    },
    funded: {
      dataKey: "funded" as const,
      addMethod: websiteSettings.addFundedImage,
      editMethod: websiteSettings.editFundedImage,
      deleteMethod: websiteSettings.deleteFundedImage,
    },
  };

  const config = typeConfig[typeKey as keyof typeof typeConfig];

  if (!config) {
    throw new Error(
      `Unsupported type: ${props.type}. Available types: ${Object.keys(typeConfig).join(", ")}`,
    );
  }

  return {
    data: websiteSettings.websiteSettings[config.dataKey],
    addMethod: config.addMethod,
    editMethod: config.editMethod,
    deleteMethod: config.deleteMethod,
  };
});

const getData = computed(() => storeConfig.value.data);

const saveHandler = async (image: Image) => {
  const requestData: Image = {
    name: image.name,
    url: image.url,
    alt: image.alt,
    altEN: image.altEN,
  };

  const response: any = await request.post(`new${props.type}Image`, requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      storeConfig.value.addMethod(requestData);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const updateHandler = async (data: any) => {
  const requestData = {
    name: data.name,
    url: data.url,
    alt: data.alt,
    altEN: data.altEN,
    index: data.index,
  };

  const response: any = await request.patch(`update${props.type}Image`, requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      storeConfig.value.editMethod(data.index, requestData);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async (url: string) => {
  const confirmed = confirm("Ar tikrai norite ištrinti šį paveikslėlį?");
  if (!confirmed) return;

  const requestData = { url };

  const response: any = await request.delete(`delete${props.type}Image`, requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      storeConfig.value.deleteMethod(requestData.url);
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <WebsiteNewImage @onSave="saveHandler" />
    <div class="flex gap-4 py-2 bg-gray-light rounded-lg font-medium text-lg">
      <div class="w-10 pl-3">Nr</div>
      <div class="w-80">Pavadinimas</div>
      <div class="w-80">Nuoroda</div>
      <div class="w-80">Aprašymas</div>
      <div class="w-80">Aprašymas EN</div>
      <div class="pr-3">Veiksmai</div>
    </div>
    <WebsiteItem
      v-for="(image, index) in getData"
      :key="image.url"
      :image="image"
      :index="index"
      @onEdit="updateHandler"
      @onUpdate="updateHandler"
      @onDelete="deleteHandler"
    />
  </div>
</template>

<style scoped></style>
