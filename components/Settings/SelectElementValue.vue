<script setup lang="ts">
const props = defineProps(["value", "editable", "index", "field", "disable"]);

const { setError, setIsError } = useError();
const useSettings = useSettingsStore();

const deleteHandler = async () => {
  const response: any = await $fetch("/api/selects", {
    method: "delete",
    body: { field: props.field, index: props.index },
  });
  if (response.success) {
    useSettings.deleteSelectValue(props.field, props.index);
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
