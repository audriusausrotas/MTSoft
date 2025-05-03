<script setup lang="ts">
import type { Production } from "~/data/interfaces";

const props = defineProps(["offer", "location"]);

const { setError, setIsError } = useError();

const deliveryValues = ["Kliento adresu", "Į MT sandėlį", "Atsiimsime patys"];
let selectedProducts: any = [];

const production = ref<Production | null>(null);

const localOffer = useProductionStore().production.find((item) => item._id === props.offer._id);
if (localOffer) {
  production.value = localOffer;
}
if (!production.value) {
  const remoteOffer = await fetchProduction(props.offer._id as string);
  if (remoteOffer) {
    production.value = remoteOffer;
  }
}

const deliveryMethod = ref<string>(deliveryValues[0]);
const showOrderButtons = ref<boolean>(false);
const date = ref<Date | null>(null);

const resultsTotal = computed(() => {
  let cost = 0;
  let price = 0;
  let profit = 0;
  let tempMargin = 0;
  let count = 0;

  for (const result of props.offer.results) {
    cost += result.cost * result.quantity;
    price += result.price * result.quantity;
    profit += result.profit;
    tempMargin += result.margin;
    count++;
  }

  const margin = tempMargin / count;
  return { cost, price, profit, margin };
});

const worksTotal = computed(() => {
  let cost = 0;
  let price = 0;
  let profit = 0;
  let tempMargin = 0;
  let count = 0;

  for (const result of props.offer.works) {
    cost += result.cost * result.quantity;
    price += result.price * result.quantity;
    profit += result.profit;
    tempMargin += result.margin;
    count++;
  }

  const margin = tempMargin / count;
  return { cost, price, profit, margin };
});

const totals = computed(() => {
  const cost = resultsTotal.value.cost + worksTotal.value.cost;
  const price = resultsTotal.value.price + worksTotal.value.price;
  const profit = resultsTotal.value.profit + worksTotal.value.profit;
  const margin = (resultsTotal.value.margin + worksTotal.value.margin) / 2;

  return { cost, price, profit, margin };
});

const orderConfirmHandler = async () => {
  const requestData = {
    _id: props.offer?._id,
    data: selectedProducts,
    client: props.offer?.client,
    date: date.value,
    deliveryMethod: deliveryMethod.value,
  };

  const response: any = await request.post("orderProducts", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      for (const item of response.data.data) {
        useProjectsStore().partsDelivered(response.data._id, item.measureIndex, true);
      }
    }

    cancelHandler();
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const checkedHandler = (data: any) => {
  selectedProducts.push(data);
};

const uncheckedHandler = (data: any) => {
  selectedProducts = selectedProducts.filter((item: any) => item.name !== data);
};

const cancelHandler = () => {
  showOrderButtons.value = false;
  selectedProducts = [];
  deliveryMethod.value = deliveryValues[0];
  date.value = null;
};

const addComment = async (comment: Comment) => {
  const requestData = {
    _id: props.offer?._id,
    comment,
    username: useUserStore().user?.username,
  };

  const response: any = await request.post("addProjectComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useProjectsStore().addComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteComment = async (_id: string, comment: Comment) => {
  const requestData = {
    _id,
    comment,
  };

  const response: any = await request.delete("deleteProjectComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useProjectsStore().deleteComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <PreviewVersions
      v-if="props.location === 'projects'"
      :versions="props.offer.versions"
      :_id="props.offer._id"
      class="print:hidden"
    />

    <PreviewClient
      :client="props.offer?.client"
      :orderNr="props.offer?.orderNumber"
      :creator="props.offer?.creator"
      :location="props.location"
    />

    <PreviewButtons
      :offer="props.offer"
      :location="props.location"
      class="print:hidden"
      @conformOrder="orderConfirmHandler"
      @openOrder="showOrderButtons = true"
      @cancel="cancelHandler"
      :showButtons="showOrderButtons"
    />

    <div
      v-if="showOrderButtons"
      class="flex gap-4 flex-wrap justify-around md:justify-normal border px-4 py-2 w-fit rounded-lg shadow-lg"
    >
      <div class="flex flex-col">
        <label for="finalDate" class="font-medium mb-1">Pristatymo data iki:</label>
        <input v-model="date" type="date" id="finalDate" name="finalDate" class="" />
      </div>
      <BaseSelectField
        :values="deliveryValues"
        label="Medžiagų pristatymas"
        id="deliferyStuff"
        :defaultValue="deliveryMethod"
        @onChange="(value: string) => deliveryMethod = value
        "
      />
    </div>

    <BaseGalleryElement :_id="offer?._id" :files="offer?.files" :category="props.location" />

    <BaseComment
      :commentsArray="props.offer?.comments"
      :id="props.offer?._id"
      @onSave="addComment"
      class="max-w-[1260px]"
      @onDelete="deleteComment"
    />

    <PreviewTotalElement
      v-if="props.location === 'projects'"
      :totals="totals"
      :discount="offer?.discount"
      :priceWithDiscount="offer?.discount ? offer?.priceWithDiscount : null"
    />

    <div class="text-2xl font-semibold text-black text-center">Medžiagos</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-6 px-2 py-2 hidden lg:flex">
        <div class="w-6 text-center">Nr</div>
        <div v-if="showOrderButtons" class="w-6"></div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div v-if="props.location === 'projects'" class="w-20">Savikaina</div>
        <div v-if="props.location === 'projects'" class="w-20">Kaina</div>
        <div v-if="props.location === 'projects'" class="w-20">Viso</div>
        <div v-if="props.location === 'projects'" class="w-20">Pelnas</div>
        <div v-if="props.location === 'projects'" class="w-20">Marža</div>
        <div class="w-16">Pristatyta</div>
      </div>

      <div class="border-dark-full">
        <PreviewResults
          v-for="(result, index) in props.offer?.results"
          :key="result.id"
          :result="result"
          :index="index"
          :_id="props.offer._id"
          :location="props.location"
          :hidePrices="location !== 'projects'"
          :showbuttons="showOrderButtons"
          @checked="checkedHandler"
          @unchecked="uncheckedHandler"
        />

        <PreviewTotal v-if="props.location === 'projects'" :values="resultsTotal" :parts="true" />
      </div>
    </div>

    <div class="text-2xl font-semibold text-black text-center">Darbai</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-6 px-2 py-2 hidden lg:flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div v-if="props.location === 'projects'" class="w-20">Savikaina</div>
        <div v-if="props.location === 'projects'" class="w-20">Kaina</div>
        <div v-if="props.location === 'projects'" class="w-20">Viso</div>
        <div v-if="props.location === 'projects'" class="w-20">Pelnas</div>
        <div v-if="props.location === 'projects'" class="w-20">Marža</div>
      </div>
      <div class="print:border-b border-dark-full">
        <PreviewWorks
          v-for="(work, index) in props.offer?.works"
          :key="work.id"
          :work="work"
          :index="index"
          :hidePrices="location !== 'projects'"
        />
        <PreviewTotal v-if="props.location === 'projects'" :values="worksTotal" />
      </div>
    </div>

    <div class="flex flex-col items-center gap-4 border-y py-4">
      <div class="font-semibold text-2xl">Matavimai</div>
      <div class="flex gap-8 flex-wrap justify-around">
        <PreviewMeasures
          v-for="(fence, index) in props.offer?.fenceMeasures"
          :key="fence.id"
          :fence="fence"
          :index="index"
          :showFull="true"
        />
      </div>
    </div>

    <div v-if="production" class="flex flex-col items-center gap-4">
      <div class="font-semibold text-2xl">Gamyba</div>

      <PreviewProduction v-if="production" :order="production" :location="props.location" />
    </div>
  </div>
</template>
<style scoped></style>
