<script setup lang="ts">
import type { Production, Supplier } from "~/data/interfaces";

const props = defineProps(["offer", "location"]);

const { setError, setSuccess } = useError();

const suppliersStore = useSuppliersStore();

let selectedProducts: any = [];
const selectedSuppliers = ref<Supplier[]>([]);

const production = computed<Production | null>(
  () => useProductionStore().production.find((item) => item._id === props?.offer?._id) ?? null
);

const companies = computed<string[]>(() => [
  ...new Set(suppliersStore?.suppliers?.map((item) => item.company) || []),
]);

const suppliers = computed<Supplier[]>(
  () => suppliersStore?.suppliers?.filter((item) => item.company === company.value) ?? []
);

const deliveryValues = ["Kliento adresu", "Į MT sandėlį", "Atsiimsime patys"];
const company = ref<string>(companies.value[0] || "");
const deliveryMethod = ref<string>(deliveryValues[0]);
const showOrderButtons = ref<boolean>(false);
const date = ref<Date | null>(null);
const message = ref<string>("");
const isOpen = ref<boolean>(false);

const resultsTotal = computed(() => {
  let cost = 0;
  let price = 0;
  let profit = 0;
  let tempMargin = 0;
  let count = 0;

  for (const result of props?.offer?.results) {
    cost += result?.cost * result?.quantity;
    price += result?.price * result?.quantity;
    profit += result?.profit;
    tempMargin += result?.margin;
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

  for (const result of props?.offer?.works) {
    cost += result?.cost * result?.quantity;
    price += result?.price * result?.quantity;
    profit += result?.profit;
    tempMargin += result?.margin;
    count++;
  }

  const margin = tempMargin / count;
  return { cost, price, profit, margin };
});

const orderConfirmHandler = async () => {
  if (!selectedProducts.length) {
    setError("Nepasirinktos medžiagos");
    return;
  }

  if (!selectedSuppliers.value.length) {
    setError("Nepasirinktas gavėjas");
    return;
  }

  const requestData = {
    _id: props?.offer?._id,
    projectOrderNr: props.offer.orderNumber,
    data: selectedProducts,
    client: props?.offer?.client,
    date: date?.value,
    deliveryMethod: deliveryMethod?.value,
    message: message.value,
    to: selectedSuppliers.value,
  };

  const response: any = await request.post("newOrder", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      useOrderStore().newOrder(response.data.orderData);
      for (const item of response.data.data) {
        useProjectsStore().partsDelivered(response.data._id, item.measureIndex, true);
      }
    }

    cancelHandler();

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
console.log(props.offer.orderNumber);
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
  message.value = "";
  selectedSuppliers.value = [];
  company.value = companies.value[0];
  isOpen.value = false;
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

    setSuccess(response.message);
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

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const changeHandler = (value: Supplier) => {
  if (!value._id) return;
  const index = selectedSuppliers.value.findIndex((supplier) => supplier._id === value._id);
  if (index === -1) {
    selectedSuppliers.value.push(value);
  } else {
    selectedSuppliers.value.splice(index, 1);
  }
};

const isSelected = (id?: string) => {
  return !!id && selectedSuppliers.value.some((s) => s._id === id);
};

watch(
  () => suppliers.value,
  (newSuppliers) => {
    if (newSuppliers.length === 1) {
      selectedSuppliers.value = [newSuppliers[0]];
      isOpen.value = false;
    } else {
      selectedSuppliers.value = [];
    }
  }
);

onMounted(async () => {
  const exists = useProductionStore().production.find((item) => item._id === props?.offer?._id);
  if (!exists) {
    await fetchProduction(props?.offer?._id as string);
  }
});
</script>

<template>
  <div v-if="props.offer" class="w-full flex flex-col gap-8">
    <PreviewVersions
      v-if="props.location === 'projects'"
      :versions="props?.offer?.versions"
      :_id="props?.offer?._id"
      class="print:hidden"
    />

    <PreviewClient
      :client="props?.offer?.client"
      :orderNr="props?.offer?.orderNumber"
      :creator="props?.offer?.creator"
      :location="props?.location"
    />

    <PreviewButtons
      :offer="props?.offer"
      :location="props?.location"
      class="print:hidden"
      @conformOrder="orderConfirmHandler"
      @openOrder="showOrderButtons = true"
      @cancel="cancelHandler"
      :showButtons="showOrderButtons"
    />

    <div
      v-if="showOrderButtons"
      class="flex gap-4 flex-wrap justify-around md:justify-normal border px-4 py-2 rounded-lg shadow-lg w-full max-w-[1264px]"
    >
      <BaseSelectField
        :values="companies"
        id="companies"
        label="Įmonė"
        :defaultValue="company"
        width="w-48"
        @onChange="(value: string) => company = value
    "
      />

      <div class="flex flex-col gap-1 select-none rounded-lg">
        <label class="pl-2 text-sm">Gavėjas</label>
        <div class="relative selct-none h-10 w-60">
          <div
            v-if="suppliers.length === 1"
            class="flex justify-between h-10 gap-3 py-2 pl-4 border border-dark-light rounded-lg bg-inherit shadow-sm"
          >
            {{ selectedSuppliers[0]?.username }}
          </div>
          <div
            v-else
            @click="isOpen = !isOpen"
            class="flex justify-between h-10 gap-3 py-2 pl-4 border border-dark-light rounded-lg bg-inherit shadow-sm hover:cursor-pointer"
          >
            <div class="flex gap-3">
              {{
                selectedSuppliers.length
                  ? selectedSuppliers.length === 1
                    ? selectedSuppliers[0].username
                    : selectedSuppliers.length
                  : "Pasirinkti gavėjus"
              }}
            </div>
            <NuxtImg
              src="/icons/doubleArrow.svg"
              width="20"
              height="20"
              decoding="auto"
              loading="lazy"
              :ismap="true"
            />
          </div>
          <div
            v-if="isOpen"
            class="absolute left-0 z-50 flex flex-col w-[inherit] overflow-y-auto border shadow-lg max-h-52 rounded-lg top-10 border-dark-light"
          >
            <div
              v-for="value in suppliers"
              :key="value._id"
              @click="changeHandler(value)"
              class="flex gap-1 px-4 py-2 bg-white hover:bg-red-full hover:cursor-pointer hover:text-white"
            >
              <NuxtImg
                v-if="isSelected(value._id)"
                src="/icons/checked.svg"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>
                {{ value.username }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label for="finalDate" class="mb-1 text-sm">Pristatymo data iki:</label>
        <div class="border rounded-md border-dark-light">
          <input
            v-model="date"
            type="date"
            id="finalDate"
            name="finalDate"
            class="h-10 px-4 hover:cursor-text"
          />
        </div>
      </div>
      <BaseSelectField
        :values="deliveryValues"
        label="Medžiagų pristatymas"
        id="deliferyStuff"
        :defaultValue="deliveryMethod"
        @onChange="(value: string) => deliveryMethod = value
        "
      />

      <textarea
        class="px-2 py-1 flex-1 rounded-md border border-dark-light focus:outline-none"
        v-model="message"
        rows="2"
        placeholder="Žinutė"
      />
    </div>

    <BaseGalleryElement :_id="offer?._id" :files="offer?.files" :category="props?.location" />

    <BaseComment
      :commentsArray="props.offer?.comments"
      :id="props?.offer?._id"
      @onSave="addComment"
      class="max-w-[1260px]"
      @onDelete="deleteComment"
    />

    <PreviewTotalElement
      v-if="props?.location === 'projects'"
      :discount="offer?.discount"
      :priceWithDiscount="offer?.discount ? offer?.priceWithDiscount : null"
      :priceVAT="offer?.priceVAT"
      :totalCost="offer?.totalCost"
      :totalPrice="offer?.totalPrice"
      :totalMargin="offer?.totalMargin"
      :totalProfit="offer?.totalProfit"
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
        <div class="w-16">Užsakyta</div>
        <div class="w-16">Pristatyta</div>
      </div>

      <div class="border-dark-full">
        <PreviewResults
          v-for="(result, index) in props?.offer?.results"
          :key="result.id"
          :result="result"
          :index="index"
          :_id="props?.offer?._id"
          :location="props?.location"
          :hidePrices="location !== 'projects'"
          :showbuttons="showOrderButtons"
          @checked="checkedHandler"
          @unchecked="uncheckedHandler"
        />

        <PreviewTotal v-if="props?.location === 'projects'" :values="resultsTotal" :parts="true" />
      </div>
    </div>

    <div class="text-2xl font-semibold text-black text-center">Darbai</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-6 px-2 py-2 hidden lg:flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div v-if="props?.location === 'projects'" class="w-20">Savikaina</div>
        <div v-if="props?.location === 'projects'" class="w-20">Kaina</div>
        <div v-if="props?.location === 'projects'" class="w-20">Viso</div>
        <div v-if="props?.location === 'projects'" class="w-20">Pelnas</div>
        <div v-if="props?.location === 'projects'" class="w-20">Marža</div>
        <div class="w-16">Atlikta</div>
      </div>
      <div class="print:border-b border-dark-full">
        <PreviewWorks
          v-for="(work, index) in props.offer?.works"
          :key="work.id"
          :work="work"
          :index="index"
          :hidePrices="props?.location !== 'projects'"
          :location="props.location"
          :_id="props.offer._id"
        />
        <PreviewTotal v-if="props?.location === 'projects'" :values="worksTotal" />
      </div>
    </div>

    <div class="flex flex-col items-center gap-4 border-y py-4">
      <div class="font-semibold text-2xl">Matavimai</div>
      <div class="flex gap-8 flex-wrap justify-around">
        <PreviewMeasures
          v-for="(fence, index) in props?.offer?.fenceMeasures"
          :key="fence.id"
          :fence="fence"
          :index="index"
          :showFull="true"
        />
      </div>
    </div>

    <div v-if="production" class="flex flex-col items-center gap-4">
      <div class="font-semibold text-2xl">Gamyba</div>

      <PreviewProduction :order="production" />
    </div>
  </div>
</template>
<style scoped></style>
