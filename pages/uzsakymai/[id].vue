<script setup lang="ts">
const { setError, setIsError } = useError();
const route = useRoute();

const order = computed(() => useOrderStore().orders.find((item) => item._id === route.params.id));

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

    <OrdersButtons :_id="order?._id" :projectID="order?.projectID" />

    <BaseComment
      :commentsArray="order?.comments"
      :id="order?._id"
      @onSave="addComment"
      class="max-w-[1260px]"
      @onDelete="deleteComment"
    />

    <div class="text-2xl font-bold m-auto">Užsakomos medžiagos</div>

    <div>
      <div class="flex gap-2 border-b font-medium border-black">
        <div class="w-6">Nr.</div>
        <div class="w-96">Pavadinimas</div>
        <div class="w-20 text-center">Spalva</div>
        <div class="w-16 text-center">Kiekis</div>
        <div class="w-24 text-center">Užsakyta</div>
        <div class="w-24 text-center">Sandėlyje</div>
        <div class="w-24 text-center">Pristatyta</div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <OrdersMain
        v-for="(data, index) in order?.data"
        :data="data"
        :key="data.name"
        :index="index"
        :_id="order?._id"
      />
    </div>
  </div>
</template>
<style scoped></style>
