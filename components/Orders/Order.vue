<script setup lang="ts">
const props = defineProps(["order", "index"]);

const { setError, setIsError } = useError();

const deleteHandler = async (event: Event) => {
  const response: any = await request.delete(`deleteOrder/${props.order._id}`);

  if (response.success) {
    if (!useSocketStore().connected) {
      useOrderStore().deleteOrder(response.data._id);
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const clickHandler = () => {
  navigateTo("/uzsakymai/" + props.order._id);
};
</script>

<template>
  <div class="flex gap-4 items-center border-b px-2">
    <div
      @click="clickHandler"
      class="flex gap-4 hover:scale-105 transition-transform hover:cursor-pointer"
    >
      <div>{{ index + 1 }}</div>
      <div>{{ order.orderDate }}</div>
      <div>{{ order.deliveryDate }}</div>
      <div>{{ order.client.address }}</div>
      <div>{{ order.deliveryMethod }}</div>
      <div>{{ order.user.username }}</div>
    </div>
    <div
      @click="deleteHandler"
      class="hover:cursor-pointer hover:bg-red-200 flex items-center justify-center w-8 h-8 rounded-md"
    >
      <NuxtImg
        src="/icons/delete.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped></style>
