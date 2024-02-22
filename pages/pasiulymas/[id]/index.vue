<script setup lang="ts">
import OrderLink from "~/components/Base/OrderLink.vue";
import type { Result, Works } from "~/data/interfaces";

definePageMeta({
  layout: "order",
});

const route = useRoute();
const offer = reactive<any>({});
const totalPriceParts = ref<number>(0);
const totalPriceWorks = ref<number>(0);
const showButtons = ref<boolean>(true);
const pdfSection = ref<HTMLElement | null>(null);

onMounted(async () => {
  const data: any = await $fetch("/api/order", {
    method: "post",
    body: { _id: route.params.id },
  });
  if (data.success) {
    offer.value = { ...data.data };
    offer.value.results.forEach(
      (item: Result) => (totalPriceParts.value += item.totalPrice)
    );
    offer.value.works.forEach(
      (item: Works) => (totalPriceWorks.value += item.totalPrice)
    );
    showButtons.value = offer.value?.status === "Nepatvirtintas";
  }
});

const downloadAsPDF = async () => {
  const content = pdfSection.value;
  const address = offer.value.client.address;
  const contentWidth = content!.offsetWidth / 3.5;
  const contentHeight = content!.offsetHeight / 3.5;

  if (process.client) {
    //@ts-ignore
    import("html2pdf.js").then((html2pdf) => {
      const options = {
        margin: 10,
        filename: address + ".pdf",
        jsPDF: {
          unit: "mm",
          format: [contentWidth, contentHeight],
          orientation: "portrait",
        },
      };

      html2pdf.default(content, options);
    });
  }
};

const confirmHandler = async () => {
  const data: any = await $fetch("/api/order", {
    method: "patch",
    body: { _id: offer.value._id },
  });
  if (data.success) {
    offer.value = { ...data.data };
  }
  showButtons.value = offer.value?.status === "Nepatvirtintas";
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
  <div
    class="flex flex-col print:gap-4 py-8 print:py-0 gap-12"
    ref="pdfSection"
  >
    <div
      class="flex justify-between text-center p-14 print:py-0 print:px-8 text-xl print:text-sm print:font-medium font-semibold items-center rounded-t-xl text-white bg-red-full print:bg-transparent print:text-black print:bg-gray-full"
    >
      <NuxtImg
        src="/images/logo.png"
        alt="Moderni Tvora logotipas"
        width="129"
        height="72"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        class="hidden print:block"
      />
      <h5>
        Užsakymo data:<br />
        {{ offer.value?.dateCreated.slice(0, 10) }}
      </h5>
      <h5>
        Pasiūlymo galiojimo data: <br />
        {{ offer.value?.dateExparation.slice(0, 10) }}
      </h5>
      <h3>
        Užsakymo Nr.: <br />
        {{ offer.value?.orderNumber }}
      </h3>
      <h6 class="print:hidden">
        Būsena: <br />
        <span
          :class="
            offer.value?.status === 'Nepatvirtintas'
              ? 'text-orange-300'
              : offer.value?.status === 'Netinkamas'
              ? 'text-red-300'
              : 'text-green-300'
          "
        >
          {{ offer.value?.status }}
        </span>
      </h6>
    </div>

    <div class="flex justify-evenly py-4 print:hidden">
      <div class="flex flex-col items-center gap-8">
        <p class="text-xl font-semibold">Kliento Duomenys</p>
        <div class="flex gap-8">
          <div class="flex flex-col gap-2">
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
          </div>
          <div class="flex flex-col gap-2">
            <a :href="'tel:' + offer.value?.client.phone">
              <BaseInput
                :disable="true"
                :name="offer.value?.client.phone"
                label="telefono numeris"
                class="pointer-events-none"
              />
            </a>
            <a :href="'mailto:' + offer.value?.client.email">
              <BaseInput
                :disable="true"
                :name="offer.value?.client.email"
                label="elektroninis pastas"
                class="pointer-events-none"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="border border-dark-ultra-light min-h-full"></div>

      <div class="flex flex-col items-center gap-8">
        <p class="text-xl font-semibold">Moderni Tvora Kontaktai</p>
        <div class="flex gap-7">
          <div class="flex flex-col gap-2">
            <BaseInput
              :disable="true"
              :name="
                offer.value?.creator.username +
                ' ' +
                offer.value?.creator.lastName
              "
              label="Atsakingas vadybininkas:"
            />

            <BaseInput
              :disable="true"
              name=" Kauno g. 31, Marijampolė"
              label="adresas"
            />
          </div>
          <div class="flex flex-col gap-2">
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
        </div>
      </div>
    </div>

    <div class="hidden print:flex justify-evenly print:py-4 text-xs">
      <div class="flex flex-col gap-1">
        <h3 class="font-medium">Kliento Duomenys</h3>
        <p>Klientas: {{ offer.value?.client.username }}</p>
        <p>Adresas: {{ offer.value?.client.address }}</p>
        <p>Telefonas: {{ offer.value?.client.phone }}</p>
        <p>El. Paštas {{ offer.value?.client.email }}</p>
      </div>
      <div class="border border-dark-light min-h-full"></div>
      <div class="flex flex-col gap-1">
        <h3 class="font-medium">Moderni Tvora Kontaktai</h3>
        <p>
          Vadybininkas:
          {{
            offer.value?.creator.username + " " + offer.value?.creator.lastName
          }}
        </p>
        <p>Adresas: Kauno g. 31, Marijampolė</p>
        <p>Telefonas: {{ offer.value?.creator.phone }}</p>
        <p>El. Paštas: {{ offer.value?.creator.email }}</p>
      </div>
    </div>

    <div
      class="text-2xl font-semibold bg-red-full rounded-xl print:rounded-none print:bg-transparent print:text-black print:border-y-4 print:border-black p-3 print:p-2 print:text-base text-white text-center"
    >
      Medžiagos
    </div>
    <div class="flex flex-col">
      <div
        class="flex border-b print:py-1 bg-gray-light print:bg-transparent print:border-b-2 print:gap-6 print:border-black font-semibold gap-10 text-lg print:text-sm px-2 py-3 rounded-t-xl"
      >
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
      </div>
      <div>
        <OfferResult
          v-for="(result, index) in offer.value?.results"
          :key="result._id"
          :result="result"
          :index="index"
        />
      </div>
      <p
        class="text-2xl print:text-base print:font-medium text-center print:bg-transparent p-2 print:w-fit bg-gray-light rounded-2xl font-semibold w-96 mt-8 print:mt-1 self-end"
      >
        Viso: {{ totalPriceParts.toFixed(2) }} €
      </p>
    </div>
    <div
      class="text-2xl font-semibold bg-red-full rounded-xl print:rounded-none print:bg-transparent print:text-black print:border-y-4 print:border-black p-3 print:p-2 print:text-base text-white text-center"
    >
      Darbai
    </div>
    <div class="flex flex-col">
      <div
        class="flex border-b print:py-1 bg-gray-light print:bg-transparent print:border-b-2 print:gap-6 print:border-black font-semibold gap-10 text-lg print:text-sm px-2 py-3 rounded-t-xl"
      >
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
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
      <p
        class="text-2xl print:text-base print:font-medium text-center print:bg-transparent p-2 print:w-fit bg-gray-light rounded-2xl font-semibold w-96 mt-8 print:mt-1 self-end"
      >
        Viso: {{ totalPriceWorks.toFixed(2) }} €
      </p>
    </div>

    <div class="flex justify-end">
      <div class="text-xl print:text-base flex flex-col print:gap-0 gap-2">
        <div class="flex w-96 px-4 justify-between">
          <p class="font-semibold">Kaina:</p>
          <p class="">{{ offer.value?.totalPrice }} €</p>
        </div>

        <div class="flex w-96 px-4 justify-between">
          <p class="font-semibold">PVM Suma:</p>
          <p>{{ (offer.value?.totalPrice * 0.21).toFixed(2) }} €</p>
        </div>

        <div class="flex w-96 px-4 justify-between">
          <p class="font-bold">Kaina su PVM:</p>
          <p class="text-red-full font-bold print:text-black">
            {{ offer.value?.priceVAT }} €
          </p>
        </div>

        <div
          v-if="offer.value?.discount"
          class="flex w-96 px-4 justify-between"
        >
          <p class="text-2xl print:text-base font-bold pb-4">
            Kaina su nuolaida:
          </p>
          <p class="text-red-full font-bold print:text-black">
            {{ offer.value?.priceWithDiscount }}

            €
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center gap-10 mt-8 mb-12 print:hidden">
    <p v-if="showButtons" class="text-2xl font-semibold">
      Ar jus tenkina šis pasiūlymas?
    </p>
    <div v-if="showButtons" class="flex gap-8">
      <BaseButton
        name="pasiūlymas tenkina"
        @click="confirmHandler"
        width="w-96"
      />
      <BaseButton
        name="pasiūlymas netekina"
        @click="cancelHandler"
        width="w-96"
      />
    </div>
    <BaseButton name="atsisiūsti PDF" @click="downloadAsPDF" width="w-96" />
  </div>
</template>
<style scoped></style>
