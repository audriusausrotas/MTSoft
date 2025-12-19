<script setup lang="ts">
const props = defineProps([
  "data",
  "fenceIndex",
  "index",
  "fenceSide",
  "total",
  "_id",
  "orderNr",
  "clientAddress",
]);

const { setError, setSuccess } = useError();
const productionStore = useProductionStore();
const userStore = useUserStore();

const isAdmin = userStore.user?.accountType === "Administratorius";

const cut = ref<number>(props.data.cut);
const done = ref<number>(props.data.done);
const elements = ref<number>(props.data.elements);
const height = ref<number>(props.data.height);
const length = ref<number>(props.data.length);

const iMadeChanges = ref<boolean>(false);
const isSavedElements = ref<boolean>(true);
const isSavedHeight = ref<boolean>(true);
const isSavedLength = ref<boolean>(true);
const isSavedCut = ref<boolean>(true);
const isSavedDone = ref<boolean>(true);

const indexColor = computed(() => {
  return props.data.postone
    ? "bg-red-full text-white"
    : +props.data.cut === 0 || props.data.cut === undefined
    ? "bg-transparent"
    : +props.data.cut === +props.data.elements && +props.data.done === +props.data.elements
    ? "bg-green-500"
    : +props.data.cut > +props.data.elements
    ? "bg-red-full"
    : +props.data.cut === +props.data.elements
    ? "bg-green-300"
    : "bg-orange-400";
});

const cutColor = computed(() => {
  return +props.data.cut === +props.data.elements
    ? "bg-green-500"
    : +props.data.cut === 0 || props.data.cut === undefined
    ? "bg-transparent"
    : +props.data.cut > +props.data.elements
    ? "bg-red-full"
    : "bg-orange-500";
});

const doneColor = computed(() => {
  return +props.data.done === +props.data.elements
    ? "bg-green-500"
    : +props.data.done === 0 || props.data.done === undefined
    ? "bg-transparent"
    : +props.data.done > +props.data.elements
    ? "bg-red-full"
    : "bg-orange-500";
});

const saveHandler = async (field: string) => {
  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    measureIndex: props.index,
    value:
      field === "cut"
        ? +props.data.cut
        : field === "done"
        ? +props.data.done
        : field === "elements"
        ? +props.data.elements
        : field === "length"
        ? +props.data.length
        : +props.data.height,
    field,
    option: "fences",
  };

  const response: any = await request.patch("updateMeasure", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateMeasure(
        response.data._id,
        response.data.index,
        response.data.measureIndex,
        response.data.value,
        response.data.field,
        response.data.option
      );

    setSuccess(response.message);

    if (field === "cut") {
      cut.value = +requestData.value;
      isSavedCut.value = true;
    } else if (field === "elements") {
      elements.value = +requestData.value;
      isSavedElements.value = true;
    } else if (field === "height") {
      height.value = +requestData.value;
      isSavedHeight.value = true;
    } else if (field === "done") {
      done.value = +requestData.value;
      isSavedDone.value = true;
    } else if (field === "length") {
      length.value = +requestData.value;
      isSavedLength.value = true;
    }

    iMadeChanges.value = false;
  } else {
    setError(response.message);
  }
};

const postoneHandler = async () => {
  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    measureIndex: props.index,
    value: !props.data.postone,
    option: "fences",
  };

  const response: any = await request.patch("updateProductionPostone", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateMeasure(
        response.data._id,
        response.data.index,
        response.data.measureIndex,
        response.data.value,
        "postone",
        response.data.option
      );
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti matavimą?");
  if (!confirmed) return;

  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    measureIndex: props.index,
  };

  const response: any = await request.delete("deleteMeasure", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.deleteMeasure(
        response.data._id,
        response.data.index,
        response.data.measureIndex
      );
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const printHandler = () => {
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
              <p class="padding borderB">${props.clientAddress}</p>
              <p class="padding bigText">${props.fenceSide} ${props.index + 1} / ${props.total}</p>
            </body>
        </html>
    `;

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.print();
};

const updateMeasure = (field: string, event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  iMadeChanges.value = true;

  productionStore.updateMeasure(
    props._id,
    props.fenceIndex,
    props.index,
    +inputElement.value,
    field,
    "fence"
  );

  if (field === "cut")
    +inputElement.value !== cut.value ? (isSavedCut.value = false) : (isSavedCut.value = true);
  else if (field === "elements")
    +inputElement.value !== elements.value
      ? (isSavedElements.value = false)
      : (isSavedElements.value = true);
  else if (field === "height")
    +inputElement.value !== height.value
      ? (isSavedHeight.value = false)
      : (isSavedHeight.value = true);
  else if (field === "done")
    +inputElement.value !== done.value ? (isSavedDone.value = false) : (isSavedDone.value = true);
  else if (field === "length")
    +inputElement.value !== length.value
      ? (isSavedLength.value = false)
      : (isSavedLength.value = true);
};

watch(
  () => props.data,
  (fence) => {
    if (!iMadeChanges.value) {
      if (fence.elements !== elements.value) {
        elements.value = +fence.elements;
      }
      if (fence.cut !== cut.value) {
        cut.value = +fence.cut;
      }
      if (fence.done !== done.value) {
        done.value = +fence.done;
        console.log(done.value, fence.done);
      }
      if (fence.height !== height.value) {
        height.value = +fence.height;
      }
      if (fence.length !== length.value) {
        length.value = +fence.length;
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    v-if="props.data.laiptas.exist"
    class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Laiptas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.laiptas.direction }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.laiptas.value }} cm
    </p>
    <p class="flex-1 h-full border-r border-black"></p>
    <div
      v-if="isAdmin"
      class="w-10 border-r border-black print:hidden flex justify-center items-center hover:bg-red-ulta-light hover:cursor-pointer"
      @click="deleteHandler"
    >
      <NuxtImg
        width="20"
        height="20"
        src="/icons/delete.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
    </div>
  </div>
  <div
    v-else-if="props.data.kampas.exist"
    class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Kampas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.kampas.value }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">laipsnių</p>
    <p class="flex-1 h-full border-r border-black"></p>
    <div
      v-if="isAdmin"
      class="w-10 border-r border-black print:hidden flex justify-center items-center hover:bg-red-ulta-light hover:cursor-pointer"
      @click="deleteHandler"
    >
      <NuxtImg
        width="20"
        height="20"
        src="/icons/delete.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
    </div>
  </div>
  <div v-else class="w-fit h-8 odd:bg-gray-ultra-light border-b border-black flex select-none">
    <p
      class="w-10 flex items-center justify-center h-full border-x border-black"
      :class="indexColor"
    >
      {{ props.index + 1 }} {{ props.data.gates.exist ? "v" : "" }}
    </p>

    <div class="w-20 flex items-center justify-center h-full border-r border-black px-1">
      <input
        type="number"
        class="w-full"
        :value="props.data.length"
        @input="updateMeasure('length', $event)"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedLength"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('length')"
        class="hover:cursor-pointer"
      />
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      <input
        type="number"
        :value="props.data.elements"
        @input="updateMeasure('elements', $event)"
        class="w-full"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedElements"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('elements')"
        class="hover:cursor-pointer"
      />
    </div>
    <div class="w-24 flex items-center justify-center h-full border-r border-black px-1">
      <input
        type="number"
        :value="props.data.height"
        @input="updateMeasure('height', $event)"
        class="w-full"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedHeight"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('height')"
        class="hover:cursor-pointer"
      />
    </div>
    <div
      class="w-24 flex items-center justify-center h-full border-r border-black px-1"
      :class="cutColor"
    >
      <input
        :value="props.data.cut"
        @input="updateMeasure('cut', $event)"
        type="number"
        placeholder="Išpjauti"
        class="w-full"
      />
      <NuxtImg
        v-if="!isSavedCut"
        src="/icons/save.svg"
        width="20"
        height="20"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('cut')"
        class="hover:cursor-pointer"
      />
    </div>
    <div
      class="w-24 flex items-center justify-center h-full border-r border-black px-1"
      :class="doneColor"
    >
      <input
        :value="props.data.done"
        @input="updateMeasure('done', $event)"
        type="number"
        placeholder="Pagaminti"
        class="w-full"
      />
      <NuxtImg
        v-if="!isSavedDone"
        src="/icons/save.svg"
        width="20"
        height="20"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('done')"
        class="hover:cursor-pointer"
      />
    </div>
    <button
      class="flex items-center justify-center h-full border-r border-black w-24 print:hidden lg:hover:bg-red-full lg:hover:text-white"
      @click="printHandler"
    >
      Spausdinti
    </button>
    <button
      v-if="isAdmin"
      class="flex items-center justify-center h-full border-r border-black w-24 print:hidden lg:hover:bg-red-full lg:hover:text-white"
      :class="{ 'bg-red-full text-white': props.data.postone }"
      @click="postoneHandler"
    >
      Negaminti
    </button>
    <div
      v-if="isAdmin"
      class="w-10 border-r border-black print:hidden flex justify-center items-center hover:bg-red-ulta-light hover:cursor-pointer"
      @click="deleteHandler"
    >
      <NuxtImg
        width="20"
        height="20"
        src="/icons/delete.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
    </div>
  </div>
</template>
<style scoped></style>
