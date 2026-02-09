<script setup lang="ts">
const emit = defineEmits<{
  onSave: [];
  onEdit: [];
  onCancel: [];
  onDelete: [];
}>();

const editable = ref<boolean>(false);

const saveHandler = () => {
  emit("onSave");
  editable.value = false;
};

const editHandler = () => {
  emit("onEdit");
  editable.value = true;
};

const deleteHandler = () => {
  emit("onDelete");
};

const cancelHandler = () => {
  emit("onCancel");
  editable.value = false;
};
</script>

<template>
  <div class="flex gap-2">
    <NuxtImg
      v-if="editable"
      src="/icons/save.svg"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      class="default-button"
      @click="saveHandler"
    />
    <NuxtImg
      v-else
      src="/icons/edit.svg"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      class="default-button"
      @click="editHandler"
    />

    <NuxtImg
      v-if="!editable"
      @click="deleteHandler"
      src="/icons/delete.svg"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      class="default-button"
    />
    <NuxtImg
      v-else
      @click="cancelHandler"
      src="/icons/close.svg"
      width="20"
      height="20"
      decoding="auto"
      :ismap="true"
      loading="lazy"
      class="default-button"
    />
  </div>
</template>

<style scoped>
.default-button {
  @apply hover:cursor-pointer hover:scale-125 transition-transform border h-10 rounded-lg w-10 p-2 bg-gray-ultra-light border-dark-light;
}
</style>
