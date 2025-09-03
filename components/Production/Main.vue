-
<script setup lang="ts">
import type { Bindings } from "~/data/interfaces";

const props = defineProps(["_id", "orderNr", "client", "creator", "bindings"]);
const { setError, setSuccess } = useError();
const productionStore = useProductionStore();
const userStore = useUserStore();

const isAdmin = userStore.user?.accountType === "Administratorius";
const filterIndex = ref<boolean>(false);
const filterLength = ref<boolean>(false);

const filteredMeasures = ref([...props.bindings]);

function addIndex() {
  return props.bindings.map((item: Bindings, index: number) => {
    return { ...item, index };
  });
}

const filterByLength = () => {
  const temp = addIndex();
  temp.sort((a: any, b: any) => b.height - a.height);
  filteredMeasures.value = [...temp];
  filterLength.value = true;
  filterIndex.value = false;
};

const filterByIndex = () => {
  const temp = addIndex();
  temp.sort((a: any, b: any) => a.index - b.index);

  filteredMeasures.value = [...temp];
  filterLength.value = false;
  filterIndex.value = true;
};

const newBindingHandler = async () => {
  const response: any = await request.post(`addBinding/${props._id}`);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.addNewBinding(response.data._id, response.data.data);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const bindingPrintHandler = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA").replace(/-/g, ".");

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
                        text-align: center;
                        font-size: 22px;
                        font-weight: bold;
                        border: 2px solid black;
                    }
                    body p {
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width:100%;
                        display: flex;
                        justify-content: space-between;

                    }
                    .borderB {
                        width: 100%;
                        border-bottom: 2px solid black;
                    }
                    .padding {
                        padding: 10px;
                    }
                    .borderL {
                        border-left: 2px solid black;
                    }
                    .bigText {
                         font-size: 40px;
                    }
                </style>
            </head>
            <body class="">
            <div class="container borderB">
              <p class="padding ">${props.orderNr}</p>
              <div class="borderL"></div>
              <p class="padding">${formattedDate}</p>
            </div>
              <p class="padding borderB">${props.client.address}</p>
              <p class="padding bigText">Papildomos Detalės</p>
            </body>
        </html>
    `;

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.print();
};

watch(
  () => props.bindings,
  (newMeasures) => {
    filteredMeasures.value = [...newMeasures];
    if (filterIndex.value) filterByIndex();
    else if (filterLength.value) filterByLength();
  },
  { deep: true }
);

filterByIndex();
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col select-none">
      <div class="flex gap-4 items-center mb-2">
        <p class="text-2xl font-bold">Apkaustai</p>
      </div>
      <div
        class="flex w-fit border-y items-center h-8 border-black select-none"
      >
        <p
          class="hover:cursor-pointer h-full items-center w-10 border-x border-black flex justify-evenly"
          @click="filterByIndex"
        >
          Nr
          <NuxtImg
            src="/icons/arrowDown.svg"
            width="8"
            height="8"
            decoding="auto"
            :ismap="true"
            loading="lazy"
            :class="filterIndex ? 'rotate-180' : ''"
            class="transition-all"
          />
        </p>
        <p
          class="w-48 border-r border-black h-full flex justify-center items-center"
        >
          tipas
        </p>
        <p
          class="hover:cursor-pointer w-16 flex gap-1 justify-center border-r border-black h-full items-center"
          @click="filterByLength"
        >
          Ilgis
          <NuxtImg
            src="/icons/arrowDown.svg"
            width="8"
            height="8"
            decoding="auto"
            :ismap="true"
            loading="lazy"
            :class="filterLength ? 'rotate-180' : ''"
            class="transition-all"
          />
        </p>
        <p
          class="w-16 border-r border-black h-full flex justify-center items-center"
        >
          Kiekis
        </p>
        <p
          class="w-16 border-r border-black h-full flex justify-center items-center"
        >
          spalva
        </p>
        <p
          class="w-24 border-r border-black h-full flex justify-center items-center"
        >
          Išpjauta
        </p>
        <p
          class="w-24 border-r border-black h-full flex justify-center items-center"
        >
          Pagaminta
        </p>
        <p
          v-if="isAdmin"
          class="w-24 border-r border-black h-full flex justify-center items-center print:hidden"
        >
          Veiksmai
        </p>
        <p
          v-if="isAdmin"
          class="w-10 border-r border-black h-full flex justify-center items-center print:hidden"
        ></p>
      </div>

      <ProductionBindings
        v-for="binding in filteredMeasures"
        :key="binding.id"
        :binding="binding"
        :index="binding.index"
        :_id="props._id"
      />
      <div class="flex gap-4 flex-wrap mt-2">
        <BaseButton
          v-if="isAdmin"
          @click="newBindingHandler"
          name="Pridėti naują"
        />
        <BaseButton @click="bindingPrintHandler" name="Spausdinti lipduką" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
