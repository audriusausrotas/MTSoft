<script setup lang="ts">
const props = defineProps(["_id", "editable"]);
const emits = defineEmits(["edit"]);

const editHandler = () => {
  emits("edit");
};
</script>

<template>
  <div class="flex gap-4">
    <BaseButtonWithInput name="Pridėti užsakymo numerį" />
    <BaseButtonWithConfirmation v-if="editable" name="išsaugoti pakeitimus" />
    <BaseButton v-else @click="editHandler" name="redaguoti užsakymą" />
    <BaseButtonWithConfirmation name="užbaigti užsakymą" />
  </div>
</template>
<style scoped></style>
