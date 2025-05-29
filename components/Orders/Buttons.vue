<script setup lang="ts">
const props = defineProps(["_id", "projectID"]);

const { setError, setIsError } = useError();

const finishOrderHandler = async () => {
  const requestData = { _id: props._id, projectID: props.projectID };

  const response: any = await request.patch("finishOrder", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      const orderStore = useOrderStore();

      orderStore.finishOrder(response.data._id);

      const order = orderStore.orders.find((item) => item._id === response.data._id);

      if (order) {
        order.data.forEach((item) => {
          useProjectsStore().partsDelivered(
            response.data.projectID,
            item.measureIndex,
            item.delivered
          );
        });
      }
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  navigateTo("/uzsakymai");
  if (useUserStore().user?.accountType !== "Administratorius")
    useOrderStore().deleteOrder(response.data._id);
};

const orderNrHandler = async (value: string) => {
  const requestData = { _id: props._id, value };

  const response: any = await request.patch("updateOrderNr", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useOrderStore().updateOrderNr(response.data._id, response.data.value);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex gap-4">
    <BaseButtonWithInput @onConfirm="orderNrHandler" name="Pridėti užsakymo numerį" />
    <BaseButtonWithConfirmation @onConfirm="finishOrderHandler" name="užbaigti užsakymą" />
  </div>
</template>
<style scoped></style>
