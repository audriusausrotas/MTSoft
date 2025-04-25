<script setup lang="ts">
const props = defineProps(["value", "editable", "index", "field", "disable"]);

const { setError, setIsError } = useError();
const settingsStore = useSettingsStore();

const deleteHandler = async () => {
  const requestData = { field: props.field, index: props.index };

  const response = await request.delete("deleteSelect", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      settingsStore.deleteSelectValue(response.data.field, response.data.index);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="relative">
    <BaseInfoField :name="props.value" width="w-72" />

    <NuxtImg
      v-if="props.editable"
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
