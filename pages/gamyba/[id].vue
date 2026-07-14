<script setup lang="ts">
import type { Comment } from "~/data/interfaces";
import { ProductionStatus } from "~/data/selectFieldData";
const { setError, setSuccess } = useCustomError();
const productionStore = useProductionStore();
const userStore = useUserStore();
const route = useRoute();

const HOLESINFO = ["Skylutes mušu pats", "Skylučių pats nemušu"];
const MACHINES = [
  "Pjovimo staklės",
  "Lenkimo staklės 1",
  "Lenkimo staklės 2",
  "Skylučių mušimo staklės",
];

const isAdmin =
  userStore.user?.accountType === "Administratorius" ||
  userStore.user?.accountType === "Vadybininkas";

const order: any = computed(() => {
  return productionStore.production.find(
    (item) => item._id === route.params.id,
  );
});
console.log(order.value);
const statusHandler = async (value: string) => {
  const requestData = { _id: order?.value._id, status: value };

  const response: any = await request.patch(
    "updateProductionStatus",
    requestData,
  );

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

watch(
  () => productionStore.selectedMachine,
  () => {
    productionStore.selectHolesInfo("");
  },
);
</script>

<template>
  <div
    class="flex flex-col gap-4 w-full"
    :class="isAdmin ? 'max-w-[830px]' : 'max-w-[700px]'"
  >
    <div class="flex gap-4 items-end flex-wrap">
      <BaseInput
        :name="order?.orderNumber"
        width="w-28"
        label="Užsakymo Nr."
        disable
      />
      <BaseInput
        :name="order?.client.address"
        class="flex-1"
        label="Adresas"
        disable
      />
      <BaseInput
        :name="order?.creator.username"
        width="w-28"
        label="Vadybininkas"
        disable
      />

      <BaseSelectField
        label="Statusas"
        :values="ProductionStatus"
        id="productionStatus"
        :defaultValue="order?.status || ProductionStatus[0]"
        width="w-32"
        class=""
        @onChange="(value: string) => statusHandler(value)"
      />
    </div>

    <div v-if="!isAdmin" class="flex gap-4 items-end flex-wrap">
      <BaseInput
        :name="userStore.user?.username || ''"
        width="w-32"
        label="Operatorius"
        disable
      />

      <BaseSelectField
        label="Staklės"
        :values="MACHINES"
        id="stakles"
        defaultValue="Pasirinkti stakles"
        width="w-56"
        @onChange="(value: string) => productionStore.selectMachine(value)"
      />

      <BaseSelectField
        :key="productionStore.selectedMachine"
        v-if="productionStore.selectedMachine.includes('Lenkimo')"
        label="Skylučių informacija"
        :values="HOLESINFO"
        id="skyluciuInformacija"
        defaultValue="Pasirinkti skylučių informaciją"
        width="min-w-fit w-full"
        class="flex-1"
        @onChange="(value: string) => productionStore.selectHolesInfo(value)"
      />
    </div>

    <div v-if="isAdmin" class="flex flex-wrap gap-4">
      <BaseUploadButton
        @upload="uploadFiles"
        :_id="order?._id"
        category="production"
      />
    </div>

    <BaseGalleryElement
      :_id="order?._id"
      :files="order?.files"
      category="production"
    />

    <BaseComment
      :commentsArray="order?.comments"
      :id="order?._id"
      :hideInput="!isAdmin"
      @onSave="commentHandler"
      @onDelete="deleteHandler"
    />

    <div class="flex gap-8 flex-col">
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
      :_id="order?._id"
      :orderNr="order?.orderNumber"
      :client="order?.client"
      :creator="order?.creator"
      :bindings="order?.bindings"
    />
  </div>
</template>
<style scoped></style>
