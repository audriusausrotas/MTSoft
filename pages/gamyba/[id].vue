-
<script setup lang="ts">
import type { Comment } from "~/data/interfaces";
import { ProductionStatus } from "~/data/selectFieldData";
const { setError, setSuccess } = useError();
const productionStore = useProductionStore();
const route = useRoute();

const order: any = computed(() => {
  return productionStore.production.find((item) => item._id === route.params.id);
});

const statusHandler = async (value: string) => {
  const requestData = { _id: order?.value._id, status: value };

  const response: any = await request.patch("updateProductionStatus", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateStatus(response.data._id, response.data.status);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const commentHandler = async (comment: Comment) => {
  const requestData = {
    _id: order.value._id,
    comment,
  };

  const response: any = await request.post("addProductionComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.addComment(response.data._id, response.data.comment);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async (_id: string, comment: Comment) => {
  const requestData = { _id, comment };

  const response = await request.delete("deleteProductionComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.deleteComment(response.data._id, response.data.comment);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const uploadFiles = async (data: any) => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api/uploadFiles"
      : "https://mtsoft.lt/api/uploadFiles";

  const response: any = await $fetch(url, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateFiles(response.data._id, response.data.files);
    setSuccess(response.message);
  } else setError(response.message);
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 items-end flex-wrap">
      <BaseInput :name="order?.orderNumber" width="w-28" label="Užsakymo Nr." />
      <BaseInput :name="order?.client.address" width="w-96" label="Adresas" />
      <BaseInput :name="order?.creator.username" width="w-28" label="Vadybininkas" />

      <BaseSelectField
        label="Statusas"
        :values="ProductionStatus"
        id="productionStatus"
        :defaultValue="order?.status || ProductionStatus[0]"
        width="w-60"
        @onChange="(value: string) => statusHandler(value)"
      />
    </div>
    <div class="flex flex-wrap gap-4">
      <BaseUploadButton @upload="uploadFiles" :_id="order?._id" category="production" />
    </div>

    <BaseGalleryElement :_id="order?._id" :files="order?.files" category="production" />

    <BaseComment
      :commentsArray="order?.comments"
      :id="order?._id"
      @onSave="commentHandler"
      class="max-w-[896px]"
      @onDelete="deleteHandler"
    />

    <div class="flex gap-4 flex-col">
      <ProductionFence
        v-for="(fence, index) in order?.fences"
        :key="fence._id"
        :fence="fence"
        :fenceIndex="+index"
        :_id="order._id"
        :orderNr="order?.orderNumber"
        :clientAddress="order?.client.address"
      />
    </div>

    <ProductionMain
      :_id="order._id"
      :orderNr="order?.orderNumber"
      :client="order.client"
      :creator="order.creator"
      :bindings="order.bindings"
    />
  </div>
</template>
<style scoped></style>
