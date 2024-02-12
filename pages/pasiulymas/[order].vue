<script setup lang="ts">
definePageMeta({
  layout: "order",
});

const route = useRoute();

const offer = reactive<any>({});

onMounted(async () => {
  const data: any = await $fetch("/api/order", {
    method: "post",
    body: { order: route.params.order },
  });
  if (data.success) {
    offer.value = { ...data.data };
  }
  console.log(offer.value);
});

const confirmHandler = async () => {
  const data: any = await $fetch("/api/order", {
    method: "patch",
    body: { _id: offer.value._id },
  });
  if (data.success) {
    offer.value = { ...data.data };
  }
};

const cancelHandler = async () => {
  const data: any = await $fetch("/api/order", {
    method: "put",
    body: { _id: offer.value._id },
  });
  if (data.success) {
    offer.value = { ...data.data };
  }
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-8">
      <div>client name: {{ offer.value?.client.username }}</div>
      <div>client address: {{ offer.value?.client.address }}</div>
      <div>client phone: {{ offer.value?.client.phone }}</div>
      <div>client email{{ offer.value?.client.email }}</div>
    </div>
    <div class="flex gap-8">
      <div>uzsakymas: {{ offer.value?.orderNumber }}</div>
      <div>Statusas: {{ offer.value?.status }}</div>
      <div>Atsakingas vadybininkas: {{ offer.value?.creator }}</div>
      <a :href="'tel:' + 37067517745">+37067517745</a>
      <a :href="'mailto:' + 'audrius@modernitvora.lt'"
        >audrius@modernitvora.lt</a
      >
    </div>

    <div class="flex flex-col">
      <div class="text-2xl font-semibold text-center py-2">Tvora</div>
      <div class="flex border-b font-semibold even:bg-gray-ultra-light py-1">
        <div class="w-6">Nr</div>
        <div class="w-96">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
        <div class="w-20">spalva</div>
      </div>
      <OfferResult
        v-for="(result, index) in offer.value?.results"
        :key="result._id"
        :result="result"
        :index="index"
      />
      <div class="text-2xl font-semibold text-center py-2">Darbai</div>
      <div class="flex border-b font-semibold even:bg-gray-ultra-light py-1">
        <div class="w-6">Nr</div>
        <div class="w-96">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
      </div>
      <OfferWork
        v-for="(work, index) in offer.value?.works"
        :key="work._id"
        :work="work"
        :index="index"
      />
    </div>
    <div class="flex justify-between">
      <div class="flex gap-8">
        <BaseButton name="užsakymas tenkina" @click="confirmHandler" />
        <BaseButton name="užsakymas netekina" @click="cancelHandler" />
      </div>
      <div class="flex flex-col text-xl">
        <div>
          Kaina: <span class="font-medium"> {{ offer.value?.totalPrice }}</span>
        </div>
        <div>
          Kaina su PVM:
          <span class="font-medium text-red-full">{{
            offer.value?.priceVAT
          }}</span>
        </div>
        <div
          v-if="offer.value?.priceWithDiscount"
          class="text-2xl font-semibold"
        >
          Kaina su nuolaida:
          <span class="font-medium text-red-full">{{
            offer.value?.priceWithDiscount
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
