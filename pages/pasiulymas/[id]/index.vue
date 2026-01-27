<script setup lang="ts">
import type { Result, Works } from "~/data/interfaces";

definePageMeta({
  layout: "order",
});

const { setError, setSuccess } = useCustomError();
const offer = useOfferStore();
const totalPriceParts = ref<number>(0);
const totalPriceWorks = ref<number>(0);
const showButtons = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const pdfSection = ref<HTMLElement | null>(null);

offer.offer?.results?.forEach((item: Result) => (totalPriceParts.value += item.totalPrice));
offer.offer?.works?.forEach((item: Works) => (totalPriceWorks.value += item.totalPrice));
showButtons.value = offer.offer?.status === "Nepatvirtintas";

const downloadAsPDF = async () => {
  isLoading.value = true;
  const content = pdfSection.value;
  const address = offer.offer.client.address;
  const contentWidth = content!.offsetWidth / 3.5;
  const contentHeight = content!.offsetHeight / 3.5;

  if (import.meta.client) {
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
  isLoading.value = false;
};

const orderStatusHandler = async (value: boolean) => {
  const requestData = { _id: offer.offer._id, value };

  const response: any = await request.patch(`changeOfferStatus`, requestData);

  if (response.success) {
    offer.offer = { ...response.data };

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  showButtons.value = offer.offer?.status === "Nepatvirtintas";
  isLoading.value = false;
};
</script>

<template>
  <div class="flex flex-col print:gap-0 sm:py-8 py-0 print:py-0 gap-6 sm:gap-12" ref="pdfSection">
    <div
      class="flex justify-center flex-wrap text-center md:justify-between p-8 sm:p-14 text-xl font-semibold items-center gap-8 md:gap-0 rounded-t-xl text-white bg-red-full print:hidden"
    >
      <h5>
        Užsakymo data:<br />
        {{ offer.offer?.dates?.dateCreated?.slice(0, 10) }}
      </h5>
      <h5>
        Pasiūlymo galiojimo data: <br />
        {{ offer.offer?.dates?.dateExparation?.slice(0, 10) }}
      </h5>
      <h3>
        Pasiūlymo Nr.: <br />
        {{ offer.offer?.orderNumber }}
      </h3>
      <h6>
        Būsena: <br />
        <span
          :class="
            offer.offer?.status === 'Nepatvirtintas'
              ? 'text-orange-300'
              : offer.offer?.status === 'Netinkamas'
                ? 'text-red-300'
                : 'text-green-300'
          "
        >
          {{ offer.offer?.status }}
        </span>
      </h6>
    </div>

    <div class="flex justify-evenly flex-wrap gap-8 lg:gap-0 lg:py-4 py-0 print:hidden">
      <div class="flex flex-col items-center gap-8">
        <p class="text-xl font-semibold">Kliento Duomenys</p>
        <div class="flex gap-2 sm:gap-8 justify-center flex-wrap">
          <div class="flex flex-col gap-2">
            <BaseInput :disable="true" :name="offer.offer?.client?.username" label="klientas" />
            <BaseInput :disable="true" :name="offer.offer?.client?.address" label="adresas" />
          </div>
          <div class="flex flex-col gap-2">
            <a :href="'tel:' + offer.offer?.client?.phone">
              <BaseInput
                :disable="true"
                :name="offer.offer?.client?.phone"
                label="telefono numeris"
                class="pointer-events-none"
              />
            </a>
            <a :href="'mailto:' + offer.offer?.client?.email">
              <BaseInput
                :disable="true"
                :name="offer.offer?.client?.email"
                label="elektroninis pastas"
                class="pointer-events-none"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="border border-dark-ultra-light min-h-full hidden xl:block"></div>

      <div class="flex flex-col items-center gap-8">
        <p class="text-xl font-semibold">Moderni Tvora Kontaktai</p>
        <div class="flex gap-2 sm:gap-8 justify-center flex-wrap">
          <div class="flex flex-col gap-2">
            <BaseInput
              :disable="true"
              :name="offer.offer?.creator?.username + ' ' + offer.offer?.creator?.lastName"
              label="Atsakingas vadybininkas:"
            />

            <BaseInput :disable="true" name=" Kauno g. 31, Marijampolė" label="adresas" />
          </div>
          <div class="flex flex-col gap-2">
            <a :href="'tel:' + offer.offer?.creator?.phone" class="hover: cursor-pointer">
              <BaseInput
                :disable="true"
                :name="offer.offer?.creator?.phone"
                label="Telefono numeris"
                class="pointer-events-none"
              />
            </a>

            <a :href="'mailto:' + offer.offer?.creator?.email">
              <BaseInput
                :disable="true"
                :name="offer.offer?.creator?.email"
                label="elektroninis pastas"
                class="pointer-events-none"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="print:flex hidden items-center justify-between">
      <div class="flex flex-col">
        <h3 class="text-3xl font-bold">PASIŪLYMAS</h3>
        <h3 class="font-medium">Pasiūlymo Nr.: {{ offer.offer?.orderNumber }}</h3>
      </div>
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
    </div>

    <div class="hidden print:flex justify-between border-y text-xs border-dark-full">
      <div class="flex flex-col justify-between py-4 print:font-medium flex-1 pr-4">
        <div class="flex flex-col flex-1 gap-1">
          <p class="">Pasiūlymo data:</p>
          <p>
            {{ offer.offer?.dates?.dateCreated?.slice(0, 10) }}
          </p>
        </div>
        <div class="flex flex-col flex-1 gap-1">
          <p>Pasiūlymo galiojimo data:</p>
          <p>
            {{ offer.offer?.dateExparation?.slice(0, 10) }}
          </p>
        </div>
      </div>
      <div class="flex flex-col flex-1 gap-1 border-x border-dark-full font-medium p-4">
        <h3 class="font-bold">Kliento Duomenys</h3>
        <p>Klientas: {{ offer.offer?.client?.username }}</p>
        <p>Adresas: {{ offer.offer?.client?.address }}</p>
        <p>Telefonas: {{ offer.offer?.client?.phone }}</p>
        <p>El. Paštas {{ offer.offer?.client?.email }}</p>
      </div>

      <div class="flex flex-col font-medium flex-1 gap-1 py-4 pl-4">
        <h3 class="font-bold">Moderni Tvora Kontaktai</h3>
        <p>
          Vadybininkas:
          {{ offer.offer?.creator?.username + " " + offer.offer?.creator?.lastName }}
        </p>
        <p>Adresas: Kauno g. 31, Marijampolė</p>
        <p>Telefonas: {{ offer.offer?.creator?.phone }}</p>
        <p>El. Paštas: {{ offer.offer?.creator?.email }}</p>
      </div>
    </div>

    <div
      class="text-2xl font-semibold print:font-bold bg-red-full rounded-xl print:rounded-none print:bg-transparent print:text-black p-3 print:p-0 print:text-base print:py-4 text-white text-center"
    >
      Medžiagos
    </div>
    <div class="flex flex-col pr-4 sm:pr-0">
      <div
        class="hidden border-y print:py-1 bg-gray-light print:bg-transparent print:border-y print:gap-6 print:border-black font-semibold gap-10 text-lg print:text-sm px-2 py-3 print:rounded-t-none sm:flex rounded-t-xl"
      >
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
      </div>
      <div class="print:border-b border-dark-full">
        <OfferResult
          v-for="(result, index) in offer.offer?.results"
          :key="result._id"
          :result="result"
          :index="index"
        />
      </div>
      <p
        class="sm:text-2xl text-lg print:text-base print:font-medium text-center print:bg-transparent p-2 print:pt-0 print:w-fit bg-gray-light rounded-2xl font-semibold w-56 sm:w-96 mt-8 print:mt-1 self-end"
      >
        Viso: {{ totalPriceParts.toFixed(2) }} €
      </p>
    </div>
    <div
      class="text-2xl font-semibold bg-red-full rounded-xl print:rounded-none print:bg-transparent print:text-black print:border-black p-3 print:font-bold print:pb-4 print:p-0 print:text-base text-white text-center"
    >
      Darbai
    </div>
    <div class="flex flex-col pr-4 sm:pr-0">
      <div
        class="hidden border-y print:py-1 bg-gray-light print:bg-transparent print:border-y print:gap-6 print:border-black font-semibold gap-10 text-lg print:text-sm px-2 py-3 print:rounded-t-none sm:flex rounded-t-xl"
      >
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
      </div>
      <div class="print:border-b border-dark-full">
        <OfferWork
          v-for="(work, index) in offer.offer?.works"
          :key="work._id"
          :work="work"
          :index="index"
        />
      </div>
      <p
        class="sm:text-2xl text-lg print:text-base print:font-medium text-center print:bg-transparent p-2 print:pt-0 print:w-fit bg-gray-light rounded-2xl font-semibold w-56 sm:w-96 mt-8 print:mt-1 self-end"
      >
        Viso: {{ totalPriceWorks.toFixed(2) }} €
      </p>
    </div>

    <div class="flex justify-end border-dark-full">
      <div class="w-96 print:w-72">
        <div class="text-xl print:text-base flex flex-col print:gap-0 gap-2">
          <div class="flex px-4 justify-between print:border-t border-dark-full">
            <p class="font-semibold">Kaina:</p>
            <p class="">{{ offer.offer?.totalPrice }} €</p>
          </div>

          <div class="flex px-4 justify-between">
            <p class="font-semibold">PVM Suma:</p>
            <p>{{ (offer.offer?.totalPrice * 0.21).toFixed(2) }} €</p>
          </div>

          <div
            class="flex px-4 justify-between"
            :class="!offer.offer?.discount ? 'border-y-2 border-dark-full py-1' : ''"
          >
            <p class="font-bold">Kaina su PVM:</p>
            <p class="text-red-full font-bold print:text-black">{{ offer.offer?.priceVAT }} €</p>
          </div>

          <div
            v-if="offer.offer?.discount"
            class="flex px-4 print:py-1 justify-between border-y-2 border-dark-full"
          >
            <p class="text-2xl print:text-base font-bold">Kaina su nuolaida:</p>
            <p class="text-red-full font-bold print:text-black">
              {{ offer.offer?.priceWithDiscount }}

              €
            </p>
          </div>
          <div class="flex px-4 print:py-1 text-base font-medium justify-between">
            <p class=" ">Avanso suma:</p>
            <p class="">
              {{
                offer.offer?.discount
                  ? Math.round(offer.offer?.priceWithDiscount * 0.3)
                  : Math.round(offer.offer?.priceVAT * 0.3)
              }}

              €
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center gap-10 mt-8 mb-12 print:hidden">
    <p v-if="showButtons" class="text-2xl font-semibold">Ar jus tenkina šis pasiūlymas?</p>
    <div v-if="showButtons" class="flex justify-center gap-8 flex-wrap">
      <BaseButton
        name="pasiūlymas tenkina"
        @click="orderStatusHandler(true)"
        width="w-56 sm:w-96"
        :isLoading="isLoading"
      />
      <BaseButton
        name="pasiūlymas netenkina"
        @click="orderStatusHandler(false)"
        width="w-56 sm:w-96"
        :isLoading="isLoading"
      />
    </div>
    <BaseButton
      name="atsisiūsti PDF"
      @click="downloadAsPDF"
      width="w-56 sm:w-96"
      :isLoading="isLoading"
    />
  </div>
  <div class="flex gap-1 justify-center flex-wrap text-center print:hidden">
    <p>Patvirtindamas užsakymą, patvirtinu, jog susipažinau ir sutinku su</p>
    <NuxtLink
      :to="`https://mtsoft.lt/pasiulymas/${offer.offer._id}/bendra_informacija`"
      class="font-medium text-blue-600 hover:text-red-600"
      >taisyklėmis,
    </NuxtLink>
    <NuxtLink
      :to="`https://mtsoft.lt/pasiulymas/${offer.offer._id}/tvoros_informacija`"
      class="font-medium text-blue-600 hover:text-red-600"
      >tvoros informacija</NuxtLink
    >
    <p>bei</p>
    <NuxtLink
      :to="`https://mtsoft.lt/pasiulymas/${offer.offer._id}/privatumas`"
      class="font-medium text-blue-600 hover:text-red-600"
      >privatumo politika.</NuxtLink
    >
  </div>
</template>
<style scoped></style>
