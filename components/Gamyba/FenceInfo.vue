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

const useGamyba = useGamybaStore();
const useUser = useUserStore();

const cut = ref<string>(props.data.cut);
const done = ref<string>(props.data.done);
const elements = ref<string>(props.data.elements);
const height = ref<string>(props.data.height);
const length = ref<string>(props.data.length);
const postone = ref<boolean>(props.data.postone);
const isSavedElements = ref<boolean>(true);
const isSavedHeight = ref<boolean>(true);
const isSavedLength = ref<boolean>(true);
const isSavedCut = ref<boolean>(true);
const isSavedDone = ref<boolean>(true);
const isAdmin = useUser.user?.accountType === "Administratorius";

const { setError, setIsError } = useError();

const saveHandler = async (field: string) => {
  const response: any = await $fetch("/api/gamyba", {
    method: "put",
    body: {
      _id: props._id,
      index: props.fenceIndex,
      measureIndex: props.index,
      value:
        field === "cut"
          ? +cut.value
          : field === "done"
          ? +done.value
          : field === "elements"
          ? +elements.value
          : field === "length"
          ? +length.value
          : +height.value,
      field,
      option: "fences",
    },
  });
  if (response.success) {
    useGamyba.updateOrder(props.data._id, response.data);
    setIsError(false);
    setError(response.message);

    if (field === "cut") isSavedCut.value = true;
    else if (field === "elements") isSavedElements.value = true;
    else if (field === "height") isSavedHeight.value = true;
    else if (field === "done") isSavedDone.value = true;
    else if (field === "length") isSavedLength.value = true;
  } else {
    setError(response.message);
  }
};

const postoneHandler = async () => {
  if (!isAdmin) {
    setError("Ištrinti gali tik administratorius");
    return;
  }
  const response: any = await $fetch("/api/gamyba", {
    method: "patch",
    body: {
      _id: props._id,
      index: props.fenceIndex,
      measureIndex: props.index,
      value: !postone.value,
      option: "fences",
    },
  });

  if (response.success) {
    useGamyba.updateOrder(props._id, response.data);
    postone.value = !postone.value;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async () => {
  if (!isAdmin) {
    setError("Ištrinti gali tik administratorius");
    return;
  }

  const response: any = await $fetch("/api/gamybaMeasure", {
    method: "delete",
    body: {
      _id: props._id,
      index: props.fenceIndex,
      measureIndex: props.index,
    },
  });

  if (response.success) {
    useGamyba.updateOrder(props._id, response.data);
    setIsError(false);
    setError(response.message);
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
              <p class="padding bigText">${props.fenceSide} ${
    props.index + 1
  } / ${props.total}</p> 
            </body>
        </html>
    `;

  const printWindow = window.open("", "", "width=800,height=600");
  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.print();
};

watch(cut, (newCut) => {
  if (newCut !== props.data.cut) isSavedCut.value = false;
  else isSavedCut.value = true;
});

watch(done, (newDone) => {
  if (newDone !== props.data.done) isSavedDone.value = false;
  else isSavedDone.value = true;
});

watch(elements, (newElements) => {
  if (+newElements !== +props.data.elements) isSavedElements.value = false;
  else isSavedElements.value = true;
});

watch(height, (newHeight) => {
  if (+newHeight !== +props.data.height) isSavedHeight.value = false;
  else isSavedHeight.value = true;
});

watch(length, (newLength) => {
  if (+newLength !== +props.data.length) isSavedLength.value = false;
  else isSavedLength.value = true;
});
</script>

<template>
  <div
    v-if="props.data.laiptas.exist"
    class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex select-none h-8"
  >
    <p
      class="w-10 flex items-center justify-center h-full border-x border-black"
    >
      {{ props.index + 1 }}
    </p>
    <p
      class="w-20 flex items-center justify-center h-full border-r border-black"
    >
      Laiptas
    </p>
    <p
      class="w-24 flex items-center justify-center h-full border-r border-black"
    >
      {{ props.data.laiptas.direction }}
    </p>
    <p
      class="w-24 flex items-center justify-center h-full border-r border-black"
    >
      {{ props.data.laiptas.value }} cm
    </p>
    <p class="flex-1 h-full border-r border-black"></p>
    <div
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
    <p
      class="w-10 flex items-center justify-center h-full border-x border-black"
    >
      {{ props.index + 1 }}
    </p>
    <p
      class="w-20 flex items-center justify-center h-full border-r border-black"
    >
      Kampas
    </p>
    <p
      class="w-24 flex items-center justify-center h-full border-r border-black"
    >
      {{ props.data.kampas.value }}
    </p>
    <p
      class="w-24 flex items-center justify-center h-full border-r border-black"
    >
      laipsnių
    </p>
    <p class="flex-1 h-full border-r border-black"></p>
    <div
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
    v-else
    class="w-fit h-8 odd:bg-gray-ultra-light border-b border-black flex select-none"
  >
    <p
      class="w-10 flex items-center justify-center h-full border-x border-black"
      :class="
        postone
          ? 'bg-red-full text-white'
          : +cut === 0 || cut === undefined
          ? 'bg-transparent'
          : +cut === +props.data.elements && +done === +props.data.elements
          ? 'bg-green-500'
          : +cut > +props.data.elements
          ? 'bg-red-full'
          : +cut === +props.data.elements
          ? 'bg-green-300'
          : 'bg-orange-400'
      "
    >
      {{ props.index + 1 }}
    </p>

    <div
      class="w-20 flex items-center justify-center h-full border-r border-black px-1"
    >
      <input type="number" v-model="length" class="w-full" />
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
    <div
      class="w-24 flex items-center justify-center h-full border-r border-black px-1"
    >
      <input type="number" v-model="elements" class="w-full" />
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
    <div
      class="w-24 flex items-center justify-center h-full border-r border-black px-1"
    >
      <input type="number" v-model="height" class="w-full" />
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
      :class="
        +cut === 0 || cut === undefined
          ? 'bg-transparent'
          : +cut === +props.data.elements
          ? 'bg-green-500'
          : +cut > +props.data.elements
          ? 'bg-red-full'
          : 'bg-orange-500'
      "
    >
      <input
        v-model="cut"
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
      :class="
        +done === 0 || done === undefined
          ? 'bg-transparent'
          : +done === +props.data.elements
          ? 'bg-green-500'
          : +done > +props.data.elements
          ? 'bg-red-full'
          : 'bg-orange-500'
      "
    >
      <input
        v-model="done"
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
      class="flex items-center justify-center h-full border-r border-black w-24 print:hidden lg:hover:bg-red-full lg:hover:text-white"
      :class="{ 'bg-red-full text-white': postone }"
      @click="postoneHandler"
    >
      Negaminti
    </button>
    <div
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
