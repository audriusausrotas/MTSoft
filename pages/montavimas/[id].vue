<script setup lang="ts">
import { InstallationStatus } from "~/data/selectFieldData";
import type { Comment } from "~/data/interfaces";

const { setError, setIsError } = useError();

const installationStore = useInstallationStore();
const userStore = useUserStore();
const route = useRoute();

const order: any = computed(() => {
  return installationStore.installation.find((item) => item._id === route.params.id);
});

const statusHandler = async (value: string) => {
  const requestData = { _id: order?.value._id, status: value };

  const response: any = await request.patch("updateInstallationStatus", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      installationStore.updateStatus(response.data._id, response.data.status);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const commentHandler = async (comment: Comment) => {
  const requestData = {
    _id: order?.value._id,
    comment,
    username: userStore.user?.username,
  };

  const response: any = await request.post("addInstallationComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      installationStore.addComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async (_id: string, comment: Comment) => {
  const requestData = { _id, comment };

  const response: any = await request.delete("deleteInstallationComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      installationStore.deleteComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
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
      installationStore.updateFiles(response.data._id, response.data.files);
    setIsError(false);
    setError(response.message);
  } else setError(response.message);
};

const deliverHandler = async (value: boolean, measureIndex: number) => {
  const requestData = { _id: order.value._id, measureIndex, value };

  const response: any = await request.patch("partsDelivered", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      installationStore.updatePartsDelivered(
        response.data._id,
        response.data.measureIndex,
        response.data.value
      );
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 items-center flex-col xl:flex-row">
      <div class="flex gap-4 flex-wrap justify-center md:justify-between">
        <BaseInput width="w-28" :disable="true" label="Užsakymo Nr." class="">
          {{ order?.orderNumber }}
        </BaseInput>
        <BaseSelectField
          label="Statusas"
          :values="InstallationStatus"
          width="w-36"
          class=""
          id="installationStatus"
          :defaultValue="order?.status || InstallationStatus[0]"
          @onChange="(value: string) => statusHandler(value)
                "
        />

        <BaseInput :disable="true" :name="order?.client.address" width="min-w-60" label="Adresas" />
      </div>
      <div class="flex gap-4">
        <BaseInput :disable="true" label="Kliento Nr." width="w-28" class="flex-1">
          <a :href="'tel:' + order?.client.phone">{{ order?.client.phone }}</a>
        </BaseInput>
        <BaseInput :disable="true" width="w-28" label="Vadybininkas" class="flex-1">
          <a :href="'tel:' + order?.creator.phone">{{ order?.creator.username }}</a>
        </BaseInput>
      </div>
    </div>

    <BaseComment
      :commentsArray="order?.comments"
      :id="order._id"
      @onSave="commentHandler"
      @onDelete="deleteHandler"
    />
    <div class="flex flex-col gap-4 items-center md:items-start">
      <BaseUploadButton @upload="uploadFiles" :_id="order?._id" category="installation" />
      <BaseGalleryElement :_id="order?._id" :files="order?.files" category="installation" />
    </div>

    <div class="flex flex-col gap-8">
      <div class="text-2xl font-semibold text-black text-center">Medžiagos</div>
      <div class="flex flex-col">
        <div class="border-y border-black font-semibold hidden gap-10 px-2 py-2 sm:flex">
          <div class="w-6 text-center">Nr</div>
          <div class="flex-1">Pavadinimas</div>
          <div class="w-20">Kiekis</div>
          <div class="w-20">Medžiagos pristatytos</div>
        </div>
        <div
          v-for="(result, index) in order.results"
          class="flex print:border-b border-dark-full gap-10"
        >
          <OfferResult
            :key="result.id"
            :result="result"
            :hidePrices="true"
            :index="index"
            class="flex-1"
          />
          <div class="w-20 flex justify-center items-center pr-2">
            <BaseCheckField
              :name="'vartai' + index"
              @onChange="
                (value: boolean) =>
                  deliverHandler(value, index)
              "
              :checked="result.delivered"
              height="h-10"
            />
          </div>
        </div>
      </div>
      <div class="text-2xl font-semibold text-black text-center">Darbai</div>
      <div class="flex flex-col">
        <div class="border-y border-black font-semibold gap-10 px-2 py-2 hidden sm:flex">
          <div class="w-6 text-center">Nr</div>
          <div class="flex-1">Pavadinimas</div>
          <div class="w-20">Kiekis</div>
        </div>

        <div
          v-for="(work, index) in order.works"
          class="flex print:border-b border-dark-full gap-10"
        >
          <OfferWork :key="work.id" :work="work" :hidePrices="true" :index="index" class="flex-1" />
        </div>
      </div>
      <div class="flex gap-8 justify-evenly flex-wrap">
        <PreviewMeasures
          v-for="(fence, index) in order.fenceMeasures"
          :key="fence.id"
          :fence="fence"
          :index="index"
          :showFull="true"
        />
      </div>
    </div>

    <div class="flex gap-8 flex-wrap justify-center">
      <InstallationFence
        v-for="(fence, index) in order?.fences"
        :key="fence._id"
        :fence="fence"
        :fenceIndex="index"
        :_id="order._id"
      />
    </div>
  </div>
</template>
<style scoped></style>
