<script setup lang="ts">
const { setError, setIsError } = useError();
const route = useRoute();

const order = computed(() =>
  useOrderStore().orders.find((item) => item._id === route.params.id)
);

const editable = ref<boolean>(false);

const addComment = async (comment: Comment) => {
  const requestData = {
    _id: order.value?._id,
    comment,
  };

  const response: any = await request.post("addOrderComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useOrderStore().addComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteComment = async (_id: string, comment: Comment) => {
  const requestData = { _id, comment };

  const response = await request.delete("deleteOrderComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useOrderStore().deleteComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <OrdersInfo :order="order" />

    <OrdersButtons
      :_id="order?._id"
      :editable="editable"
      @edit="editable = !editable"
    />

    <BaseComment
      :commentsArray="order?.comments"
      :id="order?._id"
      @onSave="addComment"
      class="max-w-[1260px]"
      @onDelete="deleteComment"
    />

    <div class="flex flex-col gap-4">
      <OrdersMain
        v-for="(data, index) in order?.data"
        :data="data"
        :key="data.name"
        :index="index"
      />
    </div>
  </div>
</template>
<style scoped></style>
