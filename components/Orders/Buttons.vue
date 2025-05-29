<script setup lang="ts">
const props = defineProps(["_id", "editable"]);
const emits = defineEmits(["edit", "save"]);

const { setError, setIsError } = useError();

const editHandler = () => {
  emits("edit");
};

const saveHandler = async () => {
  emits("save");
};

const finishOrderHandler = async () => {};

const orderNrHandler = async () => {
  const requestData = { _id: props._id };

  const response: any = await request.patch("updateOrderNr", requestData);

  if (response.success) {
    // !useSocketStore().connected && gateStore.removeGates(response.data._id);
    setIsError(false);
    setError("Vartų užsakymas ištrintas");
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex gap-4">
    <BaseButtonWithInput
      @onConfirm="orderNrHandler"
      name="Pridėti užsakymo numerį"
    />
    <BaseButtonWithConfirmation
      v-if="editable"
      @onConfirm="saveHandler"
      name="išsaugoti pakeitimus"
    />
    <BaseButton v-else @click="editHandler" name="redaguoti užsakymą" />
    <BaseButtonWithConfirmation
      @onConfirm="finishOrderHandler"
      name="užbaigti užsakymą"
    />
  </div>
</template>
<style scoped></style>
