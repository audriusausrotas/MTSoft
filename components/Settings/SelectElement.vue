<script setup lang="ts">
import type { Product } from "~/data/interfaces";

const props = defineProps(["data", "field", "name"]);
const { setError, setSuccess } = useError();
const settingsStore = useSettingsStore();
const productsStore = useProductsStore();

const fenceTypes = props.field.toLowerCase().includes("fencetypes");
const editable = ref<boolean>(false);

const fences = ref<Product[]>([]);

productsStore?.products?.forEach((item) => {
  switch (item.category.toLowerCase()) {
    case "tvoros":
      fences.value.push(item);
      break;
    default:
      break;
  }
});

const saveHandler = async (value: string) => {
  const requestData = { field: props.field, value };

  const response: any = await request.post("newSelect", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      settingsStore.newSelectValue(response.data.field, response.data.value);
    editable.value = false;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 border-b pb-8 border-red-full">
    <div class="flex gap-4 items-center">
      <p class="font-bold text-2xl">{{ props.name }}</p>
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
      <div v-else class="flex gap-2">
        <NuxtImg
          @click="editable = false"
          width="20"
          height="20"
          src="/icons/save.svg"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>
    <BaseButtonWithInput
      v-if="!fenceTypes"
      name="pridėti naują"
      @onConfirm="saveHandler"
      class="w-fit"
    />
    <SettingsSelectSearchField
      v-else
      class="font-normal"
      :data="fences"
      name="Pridėti naują"
      @onConfirm="saveHandler"
    />
    <div class="flex gap-4 flex-wrap">
      <SettingsSelectElementValue
        v-for="(value, index) in props.data"
        :key="value"
        :editable="editable"
        :index="index"
        :value="value"
        :field="props.field"
      />
    </div>
  </div>
</template>
<style scoped></style>
