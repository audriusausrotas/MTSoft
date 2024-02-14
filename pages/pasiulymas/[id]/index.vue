<script setup lang="ts">
definePageMeta({
  layout: "order",
});

const route = useRoute();
const offer = reactive<any>({});

onMounted(async () => {
  const data: any = await $fetch("/api/order", {
    method: "post",
    body: { _id: route.params.id },
  });
  if (data.success) {
    offer.value = { ...data.data };
  }
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
      <BaseInput
        :disable="true"
        :name="offer.value?.client.username"
        label="klientas"
      />
      <BaseInput
        :disable="true"
        :name="offer.value?.client.address"
        label="adresas"
      />
      <BaseInput
        :disable="true"
        :name="offer.value?.client.phone"
        label="telefono numeris"
      />
      <BaseInput
        :disable="true"
        :name="offer.value?.client.email"
        label="elektroninis pastas"
      />
    </div>

    <div class="flex gap-8">
      <BaseInput
        :disable="true"
        :name="
          offer.value?.creator.username + ' ' + offer.value?.creator.lastName
        "
        label="Atsakingas vadybininkas:"
      />

      <a
        :href="'tel:' + offer.value?.creator.phone"
        class="hover: cursor-pointer"
      >
        <BaseInput
          :disable="true"
          :name="offer.value?.creator.phone"
          label="Telefono numeris"
          class="pointer-events-none"
      /></a>

      <a :href="'mailto:' + offer.value?.creator.email">
        <BaseInput
          :disable="true"
          :name="offer.value?.creator.email"
          label="elektroninis pastas"
          class="pointer-events-none"
        />
      </a>
    </div>
    <div class="flex gap-8">
      <BaseInput
        :disable="true"
        :name="offer.value?.orderNumber"
        label="uzsakymas"
      />
      <BaseInput
        :disable="true"
        :name="offer.value?.status"
        label="Statusas:"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div
        class="text-2xl font-semibold bg-red-full rounded-2xl text-white text-center py-2"
      >
        Tvora
      </div>
      <div>
        <div class="flex border-b bg-gray-ultra-light font-semibold gap-10 p-2">
          <div class="w-6">Nr</div>
          <div class="w-[450px]">Pavadinimas</div>
          <div class="w-20">Kiekis</div>
          <div class="w-20">Kaina</div>
          <div class="w-20">Viso</div>
        </div>
        <div class="">
          <OfferResult
            v-for="(result, index) in offer.value?.results"
            :key="result._id"
            :result="result"
            :index="index"
          />
        </div>
      </div>
      <div
        class="text-2xl font-semibold bg-red-full rounded-2xl text-white text-center py-2"
      >
        Darbai
      </div>
      <div>
        <div
          class="flex border-b bg-gray-ultra-light font-semibold py-1 gap-10"
        >
          <div class="w-6">Nr</div>
          <div class="w-[450px]">Pavadinimas</div>
          <div class="w-20">Kiekis</div>
          <div class="w-20">Kaina</div>
          <div class="w-20">Viso</div>
        </div>
        <div class="">
          <OfferWork
            v-for="(work, index) in offer.value?.works"
            :key="work._id"
            :work="work"
            :index="index"
          />
        </div>
      </div>
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
