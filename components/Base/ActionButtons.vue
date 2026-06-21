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
    <img
      v-if="editable"
      @click="saveHandler"
      src="/icons/save.svg"
      alt="save"
      class="default-button"
    />

    <img v-else @click="editHandler" src="/icons/edit.svg" alt="edit" class="default-button" />

    <img
      v-if="!editable"
      @click="deleteHandler"
      src="/icons/delete.svg"
      alt="delete"
      class="default-button"
    />
    <img v-else @click="cancelHandler" src="/icons/close.svg" alt="cancel" class="default-button" />
  </div>
</template>

<style scoped>
.default-button {
  @apply hover:cursor-pointer hover:scale-125 transition-transform border h-10 rounded-lg w-10 p-2;
}
</style>
