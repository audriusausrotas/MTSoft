<script setup lang="ts">
import type { Fence } from "~/data/interfaces";
import { RALcolors } from "~/data/initialValues";
import type { Measure } from "~/data/interfaces";

interface Props {
  fence: Fence;
  fenceIndex: number;
  _id: string;
  orderNr: string;
  clientAddress: string;
}

const props = defineProps<Props>();

type RALColorCode = keyof typeof RALcolors;

const { setError, setSuccess } = useError();
const productionStore = useProductionStore();
const userStore = useUserStore();

const isAdmin = userStore.user?.accountType === "Administratorius";
const filterIndex = ref<boolean>(false);
const filterLength = ref<boolean>(false);

const filteredMeasures = ref([...props.fence.measures]);

const fenceSettings = useSettingsStore().fences.find((item) => item.name === props.fence.name);

const RALcolor = computed(() => RALcolors[props.fence.color as RALColorCode] || "#FFFFFF");

let step = null;

if (fenceSettings && props.fence.holes === "Taip") {
  const fenceRename = props?.fence?.seeThrough
    .replace("š", "s")
    .replace("25% Pramatomumas", "pramatoma25")
    .replace("50% Pramatomumas", "pramatoma50")
    .toLowerCase() as keyof typeof fenceSettings.steps;

  step = fenceSettings?.steps[fenceRename];
}

const newMeasureHandler = async () => {
  const requestData = { _id: props._id, index: props.fenceIndex };

  const response: any = await request.post("addMeasure", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.addNewMeasure(
        response.data_id,
        response.data.index,
        response.data.newMeasure
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

  const requestData = { _id: props._id, index: props.fenceIndex };

  const response: any = await request.delete("deleteFence", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.deleteFence(response.data._id, response.data.index);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

filterByIndex();

watch(
  () => props.fence.measures,
  (newMeasures) => {
    filteredMeasures.value = [...newMeasures];
    if (filterIndex.value) filterByIndex();
    else if (filterLength.value) filterByLength();
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col" :class="isAdmin ? 'max-w-[736px]' : 'max-w-[600px]'">
    <p v-if="props.fence.comment">{{ props.fence.comment }}</p>
    <div class="flex items-center font-bold text-lg border-black border-t border-r border-l">
      <p class="w-40 flex items-center justify-center h-full border-black">
        {{ props.fence.side }}
      </p>
      <p
        class="w-40 flex items-center justify-center h-full border-black"
        :class="[`bg-[${RALcolor}]`, RALcolor === '#FFFFFF' ? 'text-black' : 'text-white']"
      >
        {{ props.fence.color }}
      </p>
      <p class="flex-1 min-w-fit flex items-center justify-center h-full border-r border-black">
        {{ props.fence.name }}
      </p>
      <div
        v-if="isAdmin"
        class="hover:cursor-pointer w-[39px] flex items-center justify-center"
        @click="deleteHandler"
        -
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

    <div class="flex items-center font-bold text-lg max-w-[736px] border border-black border-b-0">
      <p class="w-40 flex items-center justify-center h-full border-black">
        {{ props.fence.manufacturer || "Nežinoma" }}
      </p>
      <p class="w-40 flex items-center justify-center h-full border-r border-black">
        {{ props.fence.material }}
      </p>
      <p class="flex-1 min-w-fit flex items-center justify-center h-full border-black">
        {{ props.fence.holes === "Taip" ? "Su skylutėmis" : "Be skylučių" }} -
        {{ step ? step + " cm" : "" }}
      </p>
      <div
        v-if="isAdmin"
        class="hover:cursor-pointer w-[39px] flex items-center justify-center"
      ></div>
    </div>

    <div class="flex w-fit border-y items-center h-8 border-black select-none">
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
        class="hover:cursor-pointer w-20 flex gap-1 justify-center border-r border-black h-full items-center"
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
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Elementai</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Aukštis</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Išpjauti</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Pagaminti</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black print:hidden">
        Veiksmai
      </p>
      <p
        v-if="isAdmin"
        class="w-24 flex items-center justify-center h-full border-r border-black print:hidden"
      >
        Veiksmai
      </p>
      <p
        v-if="isAdmin"
        class="w-10 flex items-center justify-center h-full border-r border-black print:hidden"
      ></p>
    </div>

    <div class="flex flex-col flex-1">
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
      />
      <BaseButton v-if="isAdmin" name="Pridėti naują" class="mt-2" @click="newMeasureHandler" />
    </div>
  </div>
</template>
<style scoped></style>
