<script setup lang="ts">
import { RALcolors } from "~/data/initialValues";
import type { Measure } from "~/data/interfaces";

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

const editable = ref<boolean>(false);
const name = ref<string>(props.fence.name || "Nežinoma");
const side = ref<string>(props.fence.side || "Nežinoma");
const color = ref<string>(props.fence.color || "Nežinoma");
const manufacturer = ref<string>(props.fence.manufacturer || "Nežinoma");
const material = ref<string>(props.fence.material || "Nežinoma");
const holes = ref<string>(props.fence.holes);
const step = ref<number>(props.fence.step);

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

filterByIndex();

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
</script>

<template>
  <div class="flex flex-col" :class="isAdmin ? 'max-w-[736px]' : 'max-w-[600px]'">
    <div v-if="fence.comment">{{ fence.comment }}</div>
    <div class="flex items-center font-bold text-lg border-black border-t border-r border-l">
      <div class="w-40 flex items-center justify-center h-full border-black px-2">
        <input
          type="text"
          v-model="side"
          class="w-full"
          :class="{ 'text-center': !editable }"
          :disabled="!editable"
        />
      </div>

      <div
        class="w-40 flex items-center justify-center h-full border-black px-2"
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

      <div
        class="flex-1 min-w-fit flex items-center justify-center h-full border-r border-black px-2"
      >
        <input
          type="text"
          v-model="name"
          class="w-full"
          :class="{ 'text-center': !editable }"
          :disabled="!editable"
        />
      </div>

      <div v-if="isAdmin" class="flex w-16 justify-around">
        <NuxtImg
          @click="editable = true"
          v-if="!editable"
          width="20"
          height="20"
          src="/icons/edit.svg"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
        <NuxtImg
          @click="saveHandler"
          v-else
          width="20"
          height="20"
          src="/icons/save.svg"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
        <NuxtImg
          @click="deleteHandler"
          width="20"
          height="20"
          src="/icons/delete.svg"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="hover:cursor-pointer hover:scale-125 transition-transform"
        />
      </div>
    </div>

    <div class="flex items-center font-bold text-lg max-w-[736px] border border-black border-b-0">
      <div class="w-40 flex items-center justify-center h-full border-r border-black px-2">
        <input
          type="text"
          v-model="manufacturer"
          class="w-full"
          :class="{ 'text-center': !editable }"
          :disabled="!editable"
        />
      </div>

      <div class="w-40 flex items-center justify-center h-full border-r border-black px-2">
        <input
          type="text"
          v-model="material"
          class="w-full"
          :class="{ 'text-center': !editable }"
          :disabled="!editable"
        />
      </div>

      <div class="flex-1 min-w-fit flex justify-center gap-2 border-black px-2">
        <div v-if="!editable" class="cursor-default">
          {{ holes === "Taip" ? "Su skylutėmis " + step + "  cm" : "Be skylučių" }}
        </div>

        <div v-else class="flex items-center w-full justify-between">
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
            <input v-model="step" type="number" class="w-10" />
          </div>
        </div>
      </div>
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
