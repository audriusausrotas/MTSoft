<script setup lang="ts">
import { RALcolors } from "~/data/initialValues";
import type { Measure, ProductionMeasure } from "~/data/interfaces";

interface Props {
  fence: any;
  fenceIndex: number;
  _id: string;
  orderNr: string;
  clientAddress: string;
}

const props = defineProps<Props>();

type RALColorCode = keyof typeof RALcolors;

const { setError, setSuccess } = useCustomError();
const productionStore = useProductionStore();
const userStore = useUserStore();

const manufacturer = ref<string>(props.fence.manufacturer || "Nežinoma");
const material = ref<string>(props.fence.material || "Nežinoma");
const holesCount = ref<number>(props.fence.holesDone || 0);
const color = ref<string>(props.fence.color || "Nežinoma");
const side = ref<string>(props.fence.side || "Nežinoma");
const name = ref<string>(props.fence.name || "Nežinoma");
const holes = ref<string>(props.fence.holes);
const step = ref<number>(props.fence.step);
const isSavedHoles = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const editable = ref<boolean>(false);

const showHoles = computed(() => {
  if (
    userStore.user?.accountType === "Vadybininkas" ||
    userStore.user?.accountType === "Administratorius"
  )
    return true;
  if (productionStore.selectedMachine.includes("Pjovimo")) return false;
  if (productionStore.selectedMachine.includes("Skylučių")) return true;
  if (
    productionStore.selectedMachine.includes("Lenkimo") &&
    productionStore.selectedHolesInfo.includes("Skylutes")
  )
    return true;
  return false;
});

const isAdmin =
  userStore.user?.accountType === "Administratorius" ||
  userStore.user?.accountType === "Vadybininkas";

const filterIndex = ref<boolean>(false);
const filterLength = ref<boolean>(false);

const filteredMeasures = ref([...props.fence.measures]);

const RALcolor = computed(() => RALcolors[color.value as RALColorCode] || "#FFFFFF");

const newMeasureHandler = async () => {
  const requestData = { _id: props._id, index: props.fenceIndex };

  const response: any = await request.post("addMeasure", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.addNewMeasure(
        response.data_id,
        response.data.index,
        response.data.newMeasure,
      );
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

function addIndex() {
  return props.fence.measures.map((item: Measure, index: number) => {
    return { ...item, index };
  });
}

const filterByLength = () => {
  const temp = addIndex();
  temp.sort((a: any, b: any) => b.length - a.length);

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

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti tvorą?");
  if (!confirmed) return;

  const requestData = { _id: props._id, fenceId: props.fence.id };

  const response: any = await request.delete("deleteFence", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.deleteFence(response.data._id, response.data.fenceId);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const selectFile = async (file: any) => {
  isLoading.value = true;

  const requestData = {
    _id: props._id,
    id: props.fence.id,
    file,
  };

  const response: any = await request.patch("updateProductionFenceFiles", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateBindingFiles(response.data._id, response.data.id, response.data.files);
    setSuccess(response.message);
  } else setError(response.message);
  isLoading.value = false;
};

const uploadFiles = async (data: any) => {
  isLoading.value = true;
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api/uploadFiles"
      : "https://mtsoft.lt/api/uploadFiles";

  const response: any = await $fetch(url, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateFenceFiles(response.data._id, response.data.id, response.data.files);
    setSuccess(response.message);
  } else setError(response.message);
};

const saveHolesHandler = async () => {
  const count = (props.fence.measures ?? []).reduce(
    (acc: { total: number; count: number }, item: ProductionMeasure) => {
      if (!item.gates?.exist) {
        acc.total += Number(item.elements || 0);
        acc.count += 1;
      }

      return acc;
    },
    {
      total: 0,
      count: 0,
    },
  );

  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    value: holesCount.value,
    holesCount: Math.round((count.total / (count.count * 2)) * 4),
    field: "holes",
    selectedMachine: productionStore.selectedMachine,
    selectedHolesInfo: productionStore.selectedHolesInfo,
  };

  const response: any = await request.patch("updateHoles", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateHoles(response.data._id, response.data.index, response.data.value);
    isSavedHoles.value = true;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    side: side.value,
    color: color.value,
    name: name.value,
    manufacturer: manufacturer.value,
    material: material.value,
    holes: holes.value,
    step: step.value,
  };

  const response: any = await request.patch("updateFence", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateFence(
        response.data._id,
        response.data.index,
        response.data.side,
        response.data.color,
        response.data.name,
        response.data.manufacturer,
        response.data.material,
        response.data.holes,
        response.data.step,
      );

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  editable.value = false;
};

watch(
  () => props.fence.measures,
  (newMeasures) => {
    filteredMeasures.value = [...newMeasures];
    if (filterIndex.value) filterByIndex();
    else if (filterLength.value) filterByLength();
  },
  { deep: true },
);

watch(
  () => props.fence,
  (f) => {
    color.value = f.color;
    name.value = f.name;
    side.value = f.side;
    manufacturer.value = f.manufacturer;
    material.value = f.material;
    holes.value = f.holes;
    step.value = f.step;
  },
  { immediate: true, deep: true },
);

watch(
  () => holesCount.value,
  () => {
    if (holesCount.value !== props.fence.holesDone) {
      isSavedHoles.value = false;
    }
  },
);

watch(
  () => props.fence.holesDone,
  (value) => {
    holesCount.value = value || 0;
    isSavedHoles.value = true;
  },
);

onMounted(() => {
  filterByIndex();
});
</script>

<template>
  <div class="flex flex-col max-w-fit">
    <div class="divide-y divide-black border border-black">
      <div v-if="fence.comment">{{ fence.comment }}</div>
      <div class="flex items-center font-bold text-lg divide-x divide-black h-8">
        <div class="w-40 flex items-center justify-center h-full px-2">
          <input
            type="text"
            v-model="side"
            class="w-full"
            :class="{ 'text-center': !editable }"
            :disabled="!editable"
          />
        </div>

        <div
          class="w-[152px] flex items-center justify-center h-full px-2"
          :class="[`bg-[${RALcolor}]`, RALcolor === '#FFFFFF' ? 'text-black' : 'text-white']"
        >
          <input
            type="text"
            v-model="color"
            class="w-full"
            :class="{ 'text-center': !editable }"
            :disabled="!editable"
          />
        </div>

        <div class="flex-1 min-w-fit flex items-center justify-center h-full">
          <input
            type="text"
            v-model="name"
            class="w-full"
            :class="{ 'text-center': !editable }"
            :disabled="!editable"
          />
          <ProductionGalleryButton
            :files="props.fence.files"
            :_id="props._id"
            :id="props.fence.id"
            category="fence"
          />
        </div>

        <ProductionUploadButton
          v-if="isAdmin"
          @upload="uploadFiles"
          @select="selectFile"
          :_id="props._id"
          :id="props.fence.id"
          category="fence"
        />

        <div v-if="isAdmin" class="flex w-16 h-full justify-around">
          <img
            @click="editable = true"
            v-if="!editable"
            src="/icons/edit.svg"
            alt="edit button"
            class="hover:cursor-pointer hover:scale-125 transition-transform w-5 h-full"
          />

          <img
            v-else
            @click="saveHandler"
            src="/icons/save.svg"
            alt="save button"
            class="hover:cursor-pointer hover:scale-125 transition-transform w-5 h-full"
          />

          <img
            @click="deleteHandler"
            src="/icons/delete.svg"
            alt="delete button"
            class="hover:cursor-pointer hover:scale-125 transition-transform w-5 h-full"
          />
        </div>
      </div>

      <div class="flex items-center font-bold text-lg divide-x divide-black">
        <div class="w-40 flex items-center justify-center h-full px-2">
          <input
            type="text"
            v-model="manufacturer"
            class="w-full"
            :class="{ 'text-center': !editable }"
            :disabled="!editable"
          />
        </div>

        <div class="w-[152px] flex items-center justify-center h-full px-2">
          <input
            type="text"
            v-model="material"
            class="w-full"
            :class="{ 'text-center': !editable }"
            :disabled="!editable"
          />
        </div>

        <div class="flex-1 min-w-fit flex justify-center gap-2 px-2">
          <div v-if="!editable" class="cursor-default">
            {{ holes === "Taip" ? "Su skylutėmis " + step + "  cm" : "Be skylučių" }}
          </div>

          <div v-else class="flex items-center w-full justify-evenly">
            <div class="flex gap-2">
              Skylutės:
              <div
                class="select-none hover:cursor-pointer"
                @click="holes = holes === 'Taip' ? 'Ne' : 'Taip'"
              >
                {{ holes }}
              </div>
            </div>

            <div v-if="holes === 'Taip'">
              Žingsnis:
              <input v-model="step" @wheel="(e) => e.preventDefault()" type="number" class="w-10" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="showHoles" class="flex w-full items-center font-bold">
        <div class="py-1 px-2 w-[313px] border-r border-black select-none">
          Skylutės išmuštos į U formos profilius:
        </div>
        <div class="flex gap-4 items-center justify-center py-1 px-2 text-center flex-1">
          <span class="border border-black px-2">
            <input type="number" v-model="holesCount" class="w-8" />
          </span>
          iš
          {{
            fence.measures.reduce(
              (acc: number, item: any) =>
                acc + (item.gates.exist ? 0 : item.kampas.exist ? 0 : item.laiptas.exist ? 0 : 1),
              0,
            ) * 2
          }}
          <div class="w-6">
            <img
              v-if="!isSavedHoles"
              @click="saveHolesHandler"
              src="/icons/save.svg"
              alt="save"
              class="hover:cursor-pointer hover:scale-125 transition-transform"
            />
          </div>
        </div>
      </div>

      <div class="flex w-fit divide-x divide-black items-center h-8 select-none">
        <p
          class="hover:cursor-pointer h-full items-center w-10 flex justify-evenly"
          @click="filterByIndex"
        >
          Nr
          <img
            src="/icons/arrowDown.svg"
            alt="arrow down"
            class="w-2 h-2 transition-all"
            :class="filterIndex ? 'rotate-180' : ''"
          />
        </p>
        <p
          class="hover:cursor-pointer w-20 flex gap-1 justify-center h-full items-center"
          @click="filterByLength"
        >
          Ilgis
          <img
            src="/icons/arrowDown.svg"
            alt="arrow down"
            class="w-2 h-2 transition-all"
            :class="filterLength ? 'rotate-180' : ''"
          />
        </p>
        <p class="w-24 flex items-center justify-center h-full">Elementai</p>
        <p class="w-24 flex items-center justify-center h-full">Aukštis</p>
        <p class="w-24 flex items-center justify-center h-full">Išpjauti</p>
        <p class="w-24 flex items-center justify-center h-full">Pagaminti</p>
        <p v-if="showHoles" class="w-24 flex items-center justify-center h-full">Skylutės</p>
        <p class="w-32 flex items-center justify-center h-full print:hidden">Veiksmai</p>
        <p v-if="isAdmin" class="w-24 flex items-center justify-center h-full print:hidden">
          Veiksmai
        </p>
      </div>

      <div class="flex flex-col w-full divide-y divide-black">
        <ProductionFenceInfo
          v-for="data in filteredMeasures"
          :key="data?._id?.toString()"
          :data="data"
          :index="data?.index"
          :fenceSide="props.fence.side"
          :total="filteredMeasures.length"
          :fenceIndex="props.fenceIndex"
          :_id="props._id"
          :orderNr="props.orderNr"
          :clientAddress="props.clientAddress"
          :showHoles="showHoles"
          class="divide-x divide-black"
        />
      </div>
    </div>

    <BaseButton v-if="isAdmin" name="Pridėti naują" class="mt-2" @click="newMeasureHandler" />
  </div>
</template>
<style scoped></style>
