<script setup lang="ts">
const props = defineProps(["value", "editable", "index", "valueIndex", "_id"]);
const useSettings = useSettingsStore();
const { setError, setIsError } = useError();

const deleteHandler = async () => {
  const data: any = await $fetch("/api/selects", {
    method: "put",
    body: {
      _id: props._id,
      value: props.value,
    },
  });
  if (data.success) {
    useSettings.deleteSelectData(props.index, props.valueIndex);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
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
          useSettings.updateSelectData(props.index, props.valueIndex, value)
      "
    />
    <NuxtImg
      v-if="!props.editable"
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
