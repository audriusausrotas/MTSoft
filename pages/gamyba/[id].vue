-
<script setup lang="ts">
import type { Comment } from "~/data/interfaces";
import { ProductionStatus } from "~/data/selectFieldData";
const { setError, setIsError } = useError();
const productionStore = useProductionStore();
const userStore = useUserStore();
const route = useRoute();

const isAdmin = userStore.user?.accountType === "Administratorius";
const order: any = computed(() => {
  return productionStore.production.find((item) => item._id === route.params.id);
});

const statusHandler = async (value: string) => {
  const requestData = { _id: order?.value._id, status: value };

  const response: any = await request.patch("updateProductionStatus", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateStatus(response.data._id, response.data.status);

    setIsError(false);
    setError(response.message);
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
    setIsError(false);
    setError(response.message);
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
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const newBindingHandler = async () => {
  const response: any = await request.post(`addBinding/${order.value._id}`);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.addNewBinding(response.data._id, response.data.data);

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const bindingPrintHandler = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA").replace(/-/g, ".");

  const printContent = `
        <html>
            <head>
                <title>Print</title>
                <style>
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                    }
                    body {
                        width: 100vw;
                        height: fit-content;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        font-size: 22px;
                        font-weight: bold;
                        border: 2px solid black;
                    }
                    body p {
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width:100%;
                        display: flex;
                        justify-content: space-between;

                    }
                    .borderB {
                        width: 100%;
                        border-bottom: 2px solid black;
                    }
                    .padding {
                        padding: 10px;
                    }
                    .borderL {
                        border-left: 2px solid black;
                    }
                    .bigText {
                         font-size: 40px;
                    }
                </style>
            </head>
            <body class="">
            <div class="container borderB">
              <p class="padding ">${order.value?.orderNumber}</p>
              <div class="borderL"></div>
              <p class="padding">${formattedDate}</p>
            </div>
              <p class="padding borderB">${order.value?.client.address}</p>
              <p class="padding bigText">Papildomos Detalės</p>
            </body>
        </html>
    `;

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.print();
};

const uploadFiles = async (data: any) => {
  const response: any = await $fetch("http://localhost:3001/uploadFiles", {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateFiles(response.data._id, response.data.files);
    setIsError(false);
    setError(response.message);
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
        :fenceIndex="index"
        :_id="order._id"
        :orderNr="order?.orderNumber"
        :clientAddress="order?.client.address"
      />
    </div>

    <div class="flex flex-col select-none">
      <div class="flex gap-4 items-center mb-2">
        <p class="text-2xl font-bold">Apkaustai</p>
      </div>
      <div class="flex w-fit border-y items-center h-8 border-black select-none">
        <p class="w-10 border-x border-black h-full flex justify-center items-center">Nr</p>
        <p class="w-48 border-r border-black h-full flex justify-center items-center">tipas</p>
        <p class="w-16 border-r border-black h-full flex justify-center items-center">Ilgis</p>
        <p class="w-16 border-r border-black h-full flex justify-center items-center">Kiekis</p>
        <p class="w-16 border-r border-black h-full flex justify-center items-center">spalva</p>
        <p class="w-24 border-r border-black h-full flex justify-center items-center">Išpjauta</p>
        <p class="w-24 border-r border-black h-full flex justify-center items-center">Pagaminta</p>
        <p
          v-if="isAdmin"
          class="w-24 border-r border-black h-full flex justify-center items-center print:hidden"
        >
          Veiksmai
        </p>
        <p
          v-if="isAdmin"
          class="w-10 border-r border-black h-full flex justify-center items-center print:hidden"
        ></p>
      </div>

      <ProductionBindings
        v-for="(binding, index) in order?.bindings"
        :key="binding.id"
        :binding="binding"
        :index="index"
        :_id="order._id"
      />
      <div class="flex gap-4 flex-wrap mt-2">
        <BaseButton v-if="isAdmin" @click="newBindingHandler" name="Pridėti naują" />
        <BaseButton @click="bindingPrintHandler" name="Spausdinti lipduką" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
