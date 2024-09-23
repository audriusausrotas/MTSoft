<script setup lang="ts">
import { GamybaStatus } from "~/data/initialValues";
import type { Photo } from "~/data/interfaces";
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore();
const useUser = useUserStore();
const route = useRoute();
const order: any = computed(() => {
  return useGamyba.gamybaList.find((item) => item._id === route.params.id);
});

const statusHandler = async (value: string) => {
  const response: any = await $fetch("/api/gamybaStatus", {
    method: "post",
    body: { _id: order?.value._id, status: value },
  });
  if (response.success) {
    useGamyba.updateOrder(order!.value._id, response.data);

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const commentHandler = async (value: string) => {
  const response: any = await $fetch("/api/gamybaComment", {
    method: "post",
    body: {
      _id: order?.value._id,
      comment: value,
      username: useUser.user?.username,
    },
  });
  if (response.success) {
    useGamyba.updateOrder(order!.value._id, response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async (value: string, comment: string) => {
  const response: any = await $fetch("/api/gamybaComment", {
    method: "delete",
    body: { _id: value, comment: comment },
  });

  if (response.success) {
    useGamyba.updateOrder(value, response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const newBindingHandler = async () => {
  const response: any = await $fetch("/api/bindings", {
    method: "post",
    body: { _id: order.value._id },
  });

  if (response.success) {
    useGamyba.updateOrder(order!.value._id, response.data);

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const photosHandler = async (photo: Photo) => {
  const response: any = await $fetch("/api/uploadPhotos", {
    method: "post",
    body: { photo, category: "production", _id: order?.value._id },
  });
  if (response.success) {
    useGamyba.addPhoto(order?.value._id, photo);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const printHandler = () => {
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
                        font-size: 22px;
                        font-weight: bold;
                        border: 1px solid black; 
                    }
                    body p {
                        margin: 0; 
                        padding: 0;
                    }
                    .container {
                        width:100%;
                        display: flex;
                        justify-content: space-between;
                        border-top: 1px solid black;
                    }
                    .borderB {
                        border-bottom: 1px solid black;
                    }
                    .padding {
                        padding: 10px;
                    }
                    .borderL {
                        border-left: 1px solid black;
                    }
                </style>
            </head>
            <body class="">
                <p class="padding">${order.value?.client.address}</p>
                <div class="container">
                    <p class="padding"></p> 
                    <div class="borderL"></div>
                    <p class="padding ">${order.value?.orderNumber}</p>
                </div>
            </body>
        </html>
    `;

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.print();
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
        :values="GamybaStatus"
        id="gamybaStatus"
        :defaultValue="order?.status || GamybaStatus[0]"
        width="w-60"
        @onChange="(value: string) => statusHandler(value)"
      />
    </div>

    <div class="flex flex-wrap gap-4">
      <BaseUpload @onSuccess="photosHandler" />
      <BaseButton name="spausdinti lipduką" @click="printHandler" />
    </div>

    <BaseGalleryElement :_id="order?._id" :files="order?.files" category="production" />

    <BaseComment
      :commentsArray="order?.aditional"
      :id="order._id"
      @onSave="commentHandler"
      class="max-w-[896px]"
      @onDelete="deleteHandler"
    />

    <div class="flex gap-4 flex-col">
      <GamybaFence
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
      <div class="text-2xl font-bold">Apkaustai</div>
      <div class="flex w-fit border-y items-center h-8 border-black select-none">
        <p class="w-10 border-x border-black h-full flex justify-center items-center">Nr</p>
        <p class="w-48 border-r border-black h-full flex justify-center items-center">tipas</p>
        <p class="w-16 border-r border-black h-full flex justify-center items-center">Ilgis</p>
        <p class="w-16 border-r border-black h-full flex justify-center items-center">Kiekis</p>
        <p class="w-16 border-r border-black h-full flex justify-center items-center">spalva</p>
        <p class="w-24 border-r border-black h-full flex justify-center items-center">Išpjauta</p>
        <p class="w-24 border-r border-black h-full flex justify-center items-center">Pagaminta</p>
        <p class="w-24 border-r border-black h-full flex justify-center items-center print:hidden">
          Veiksmai
        </p>
        <p
          class="w-10 border-r border-black h-full flex justify-center items-center print:hidden"
        ></p>
      </div>

      <GamybaBindings
        v-for="(binding, index) in order.bindings"
        :key="binding.id"
        :binding="binding"
        :index="index"
        :_id="order._id"
      />
      <BaseButton name="Pridėti naują" class="mt-2" @click="newBindingHandler" />
    </div>
  </div>
</template>
<style scoped></style>
