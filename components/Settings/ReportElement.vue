<script setup lang="ts">
const props = defineProps(["element", "index"]);

const { setError, setSuccess } = useCustomError();
const settingsStore = useSettingsStore();

const editable = ref<boolean>(false);
const name = ref<string>(props.element.name);
const keyword = ref<string>(props.element.keyword);
const bends = ref<string>(props.element.bends);

const deleteHandler = async () => {
  if (!confirm("Ar tikrai norite ištrinti nustatymus?")) return;

  const response: any = await request.delete(`deleteReport/${props.element._id}`);
  if (response.success) {
    !useSocketStore().connected && settingsStore.deleteReport(response.data);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const editHandler = async () => {
  const requestData = {
    _id: props.element._id,
    name: name.value,
    keyword: keyword.value,
    bends: bends.value,
  };

  const response: any = await request.patch("updateReport", requestData);
  if (response.success) {
    !useSocketStore().connected && settingsStore.editReport(response.data._id);
    setSuccess(response.message);
    editable.value = false;
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex gap-4 flex-wrap">
    <BaseInput :name="index + 1" :disable="true" width="w-12" />

    <BaseInput :name="name" :disable="!editable" @onChange="(value: string) => (name = value)" />
    <BaseInput
      :name="keyword"
      :disable="!editable"
      @onChange="(value: string) => (keyword = value)"
    />
    <BaseInput
      :name="bends"
      :disable="!editable"
      @onChange="(value: string) => (bends = value)"
      width="w-36"
    />

    <BaseActionButtons
      @onSave="editHandler"
      @onEdit="editable = true"
      @onDelete="deleteHandler"
      @onCancel="editable = false"
    />
  </div>
</template>

<style scoped></style>
