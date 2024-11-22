<script setup lang="ts">
import { MontavimasStatus } from "~/data/selectFieldData";
import type { Photo } from "~/data/interfaces";
const { setError, setIsError } = useError();
const useMontavimas = useMontavimasStore();
const useUser = useUserStore();
const route = useRoute();
const order: any = computed(() => {
  return useMontavimas.montavimasList.find(
    (item) => item._id === route.params.id
  );
});
const workers = useUser.users
  .filter((user) => user.accountType === "Montavimas")
  .map((user) => user.lastName);

const statusHandler = async (value: string) => {
  const response: any = await $fetch("/api/montavimasStatus", {
    method: "post",
    body: { _id: order?.value._id, status: value },
  });
  if (response.success) {
    useMontavimas.updateOrder(order!.value._id, response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const commentHandler = async (value: string) => {
  const response: any = await $fetch("/api/montavimasComment", {
    method: "post",
    body: {
      _id: order?.value._id,
      comment: value,
      username: useUser.user?.username,
    },
  });
  if (response.success) {
    useMontavimas.updateOrder(order!.value._id, response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async (value: string, comment: string) => {
  const response: any = await $fetch("/api/montavimasComment", {
    method: "delete",
    body: { _id: value, comment: comment },
  });

  if (response.success) {
    useMontavimas.updateOrder(value, response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const photosHandler = async (photo: Photo) => {
  const response: any = await $fetch("/api/uploadPhotos", {
    method: "post",
    body: { photo, category: "installation", _id: order.value._id },
  });
  if (response.success) {
    useMontavimas.addPhoto(order.value._id, photo);
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
          :values="MontavimasStatus"
          width="w-36"
          class=""
          id="montavimasStatus"
          :defaultValue="order?.status || MontavimasStatus[0]"
          @onChange="(value: string) => statusHandler(value)
                "
        />

        <BaseInput
          :disable="true"
          :name="order?.client.address"
          width="min-w-60"
          label="Adresas"
        />
      </div>
      <div class="flex gap-4">
        <BaseInput
          :disable="true"
          label="Kliento Nr."
          width="w-28"
          class="flex-1"
        >
          <a :href="'tel:' + order?.client.phone">{{ order?.client.phone }}</a>
        </BaseInput>
        <BaseInput
          :disable="true"
          width="w-28"
          label="Vadybininkas"
          class="flex-1"
        >
          <a :href="'tel:' + order?.creator.phone">{{
            order?.creator.username
          }}</a>
        </BaseInput>
      </div>
    </div>

    <BaseComment
      :commentsArray="order?.aditional"
      :id="order._id"
      @onSave="commentHandler"
      @onDelete="deleteHandler"
    />
    <div class="flex flex-col gap-4 items-center md:items-start">
      <BaseUpload @onSuccess="photosHandler" />
      <BaseGalleryElement
        :_id="order?._id"
        :files="order?.files"
        category="installation"
      />
    </div>

    <div class="flex flex-col gap-8">
      <div class="text-2xl font-semibold text-black text-center">Medžiagos</div>
      <div class="flex flex-col">
        <div
          class="border-y border-black font-semibold hidden gap-10 px-2 py-2 sm:flex"
        >
          <div class="w-6 text-center">Nr</div>
          <div class="flex-1">Pavadinimas</div>
          <div class="w-20">Kiekis</div>
        </div>
        <div class="border-dark-full">
          <OfferResult
            v-for="(result, index) in order.results"
            :key="result.id"
            :result="result"
            :hidePrices="true"
            :index="index"
          />
        </div>
      </div>
      <div class="text-2xl font-semibold text-black text-center">Darbai</div>
      <div class="flex flex-col">
        <div
          class="border-y border-black font-semibold gap-10 px-2 py-2 hidden sm:flex"
        >
          <div class="w-6 text-center">Nr</div>
          <div class="flex-1">Pavadinimas</div>
          <div class="w-20">Kiekis</div>
        </div>
        <div class="print:border-b border-dark-full">
          <OfferWork
            v-for="(work, index) in order.works"
            :key="work.id"
            :work="work"
            :hidePrices="true"
            :index="index"
          />
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
      <MontavimasFence
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
