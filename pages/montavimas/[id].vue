<script setup lang="ts">
import { InstallationStatus } from "~/data/selectFieldData";

const { setError, setIsError } = useError();

const useInstallation = useInstallationStore();
const useUser = useUserStore();
const route = useRoute();

const order: any = computed(() => {
  return useInstallation.installation.find((item) => item._id === route.params.id);
});

const statusHandler = async (value: string) => {
  const requestData = { _id: order?.value._id, status: value };

  const response: any = await request.patch("updateInstallationStatus", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useInstallation.updateStatus(response.data._id, response.data.status);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const commentHandler = async (value: string) => {
  const requestData = {
    _id: order?.value._id,
    comment: value,
    username: useUser.user?.username,
  };

  const response: any = await request.post("addInstallationComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useInstallation.addComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async (value: string, comment: string) => {
  const requestData = { _id: value, comment: comment };

  const response: any = await request.delete("deleteInstallationComment", requestData);

  if (response.success) {
    !useSocketStore().connected && useInstallation.deleteInstallationOrder(value);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const uploadFiles = async (data: any) => {
  const response: any = await $fetch("http://localhost:3001/uploadFiles", {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.success) {
    !useSocketStore().connected &&
      useInstallation.updateFiles(response.data._id, response.data.files);
    setIsError(false);
    setError(response.message);
  } else setError(response.message);
};

const deliverHandler = async (value: boolean, measureIndex: number) => {
  const requestData = { _id: order.value._id, measureIndex, value };

  const response: any = await request.patch("partsDelivered", requestData);

  if (response.success) {
    !useSocketStore().connected &&  useInstallation.updatePartsDelivered(
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
      :commentsArray="order?.comment"
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
