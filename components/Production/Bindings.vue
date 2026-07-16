<script setup lang="ts">
import { RALcolors } from "~/data/initialValues";

const props = defineProps(["binding", "index", "_id"]);
const { setError, setSuccess } = useCustomError();
const productionStore = useProductionStore();
const settingsStore = useSettingsStore();
const userStore = useUserStore();

type RALColorCode = keyof typeof RALcolors;

const isAdmin =
  userStore.user?.accountType === "Administratorius" ||
  userStore.user?.accountType === "Vadybininkas";

const canEdit = computed(() => {
  if (productionStore.selectedMachine.includes("Pjovimo")) return "cut";
  if (productionStore.selectedMachine.includes("Lenkimo")) return "done";
  if (productionStore.selectedMachine.includes("Skylučių")) return "holes";
});

const cut = ref<number>(props.binding.cut);
const done = ref<number>(props.binding.done);
const name = ref<string>(props.binding.name);
const height = ref<number>(props.binding.height);
const quantity = ref<number>(props.binding.quantity);
const color = ref<string>(props.binding.color);
const isLoading = ref<boolean>(false);

const iMadeChanges = ref<boolean>(false);
const isSavedCut = ref<boolean>(true);
const isSavedDone = ref<boolean>(true);
const isSavedName = ref<boolean>(true);
const isSavedHeight = ref<boolean>(true);
const isSavedQuantity = ref<boolean>(true);
const isSavedColor = ref<boolean>(true);

const indexColor = computed(() => {
  return props.binding.postone
    ? "bg-red-full text-white"
    : +props.binding.cut === 0 || props.binding.cut === undefined
      ? "bg-transparent"
      : +props.binding.cut === +props.binding.quantity &&
          +done === +props.binding.quantity
        ? "bg-green-500"
        : +props.binding.cut > +props.binding.quantity
          ? "bg-red-full"
          : +props.binding.cut === +props.binding.quantity
            ? "bg-green-300"
            : "bg-orange-400";
});

const cutColor = computed(() => {
  return +props.binding.cut === +props.binding.quantity
    ? "bg-green-500"
    : +props.binding.cut === 0 || props.binding.cut === undefined
      ? "bg-transparent"
      : +props.binding.cut > +props.binding.quantity
        ? "bg-red-full"
        : "bg-orange-500";
});

const doneColor = computed(() => {
  return +props.binding.done === +props.binding.quantity
    ? "bg-green-500"
    : +props.binding.done === 0 || props.binding.done === undefined
      ? "bg-transparent"
      : +props.binding.done > +props.binding.quantity
        ? "bg-red-full"
        : "bg-orange-500";
});

const RALcolor = computed(
  () => RALcolors[props.binding.color as RALColorCode] || "#FFFFFF",
);

const saveHandler = async (field: string) => {
  const requestData = {
    _id: props._id,
    index: props.index,
    value:
      field === "cut"
        ? +props.binding.cut
        : field === "done"
          ? +props.binding.done
          : field === "name"
            ? props.binding.name
            : field === "height"
              ? +props.binding.height
              : field === "quantity"
                ? +props.binding.quantity
                : props.binding.color,
    field,
    holesCount: 0,
    selectedMachine: productionStore.selectedMachine,
    selectedHolesInfo: productionStore.selectedHolesInfo,
  };

  const response: any = await request.patch("updateMeasure", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateMeasure(
        response.data._id,
        response.data.index,
        null,
        response.data.value,
        response.data.field,
      );

    setSuccess(response.message);

    if (field === "cut") {
      cut.value = +requestData.value;
      isSavedCut.value = true;
    } else if (field === "done") {
      done.value = +requestData.value;
      isSavedDone.value = true;
    } else if (field === "name") {
      name.value = String(requestData.value);
      isSavedName.value = true;
    } else if (field === "height") {
      height.value = +requestData.value;
      isSavedHeight.value = true;
    } else if (field === "quantity") {
      quantity.value = +requestData.value;
      isSavedQuantity.value = true;
    } else if (field === "color") {
      color.value = String(requestData.value);
      isSavedColor.value = true;
    }

    iMadeChanges.value = false;
  } else {
    setError(response.message);
  }
};

const postoneHandler = async () => {
  const requestData = {
    _id: props._id,
    index: props.index,
    value: !props.binding.postone,
    option: "bindings",
  };

  const response: any = await request.patch(
    "updateProductionPostone",
    requestData,
  );

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateMeasure(
        response.data._id,
        response.data.index,
        null,
        response.data.value,
        "postone",
      );

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti gaminį?");
  if (!confirmed) return;

  const requestData = { _id: props._id, bindingId: props.binding.id };

  const response: any = await request.delete("deleteBindings", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.deleteBinding(response.data._id, response.data.bindingId);

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const updateMeasure = (field: string, event: Event) => {
  const inputElement = event.target as HTMLInputElement;

  iMadeChanges.value = true;

  productionStore.updateMeasure(
    props._id,
    props.index,
    null,
    inputElement.value,
    field,
  );

  if (field === "cut")
    +inputElement.value !== cut.value
      ? (isSavedCut.value = false)
      : (isSavedCut.value = true);
  else if (field === "name")
    inputElement.value !== name.value
      ? (isSavedName.value = false)
      : (isSavedName.value = true);
  else if (field === "color")
    inputElement.value !== color.value
      ? (isSavedColor.value = false)
      : (isSavedColor.value = true);
  else if (field === "height")
    +inputElement.value !== height.value
      ? (isSavedHeight.value = false)
      : (isSavedHeight.value = true);
  else if (field === "done")
    +inputElement.value !== done.value
      ? (isSavedDone.value = false)
      : (isSavedDone.value = true);
  else if (field === "quantity")
    +inputElement.value !== quantity.value
      ? (isSavedQuantity.value = false)
      : (isSavedQuantity.value = true);
};

const updateMeasureValue = (field: string, value: string) => {
  iMadeChanges.value = true;

  productionStore.updateMeasure(props._id, props.index, null, value, field);
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
      productionStore.updateBindingFiles(
        response.data._id,
        response.data.id,
        response.data.files,
      );
    setSuccess(response.message);
  } else setError(response.message);
  isLoading.value = false;
};

const selectFile = async (file: any) => {
  isLoading.value = true;

  const requestData = {
    _id: props._id,
    id: props.binding.id,
    file,
  };

  const response: any = await request.patch(
    "updateProductionBindingFiles",
    requestData,
  );

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateBindingFiles(
        response.data._id,
        response.data.id,
        response.data.files,
      );
    setSuccess(response.message);
  } else setError(response.message);
  isLoading.value = false;
};

const defectHandler = async () => {
  if (!productionStore.selectedMachine) {
    setError("Pasirinkite stakles");
    return;
  }

  const confirm = window.confirm("Ar tikrai norite pažymėti kaip defektą?");
  if (!confirm) return;

  const requestData = {
    _id: props._id,
    index: props.index,
    field: "defect",
    selectedMachine: productionStore.selectedMachine,
    selectedHolesInfo: productionStore.selectedHolesInfo,
  };

  const response: any = await request.patch("productionDefect", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      productionStore.productionDefect(
        response.data._id,
        response.data.index,
        null,
      );
    }
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

watch(
  () => props.binding,
  (binding) => {
    if (!iMadeChanges.value) {
      if (binding.name !== name.value) {
        name.value = binding.name;
      }
      if (binding.cut !== cut.value) {
        cut.value = +binding.cut;
      }
      if (binding.done !== done.value) {
        done.value = +binding.done;
      }
      if (binding.height !== height.value) {
        height.value = +binding.height;
      }
      if (binding.quantity !== quantity.value) {
        quantity.value = +binding.quantity;
      }
      if (binding.color !== color.value) {
        color.value = binding.color;
      }
    }
  },
  { deep: true },
);
</script>

<template>
  <div
    class="flex items-center even:bg-gray-ultra-light h-8 w-fit divide-x divide-black"
  >
    <p class="w-10 text-center h-full" :class="indexColor">
      {{ props.index + 1 }}
    </p>
    <div class="flex w-[220px] h-full">
      <div class="px-1 flex w-full items-center relative">
        <ProductionBindingSearchField
          :data="settingsStore.selectValues.productionElements"
          :name="props.binding.name"
          :disable="!isAdmin"
          @keydown.enter="saveHandler('name')"
          @OnClick="
            (value: any) => {
              updateMeasureValue('name', value);
            }
          "
          @onChange="(value) => updateMeasure('name', value)"
        />
        <img
          v-if="!isSavedName"
          src="/icons/save.svg"
          alt="save icon"
          @click="saveHandler('name')"
          class="hover:cursor-pointer w-5 h-5"
        />
        <ProductionGalleryButton
          :files="props.binding.files"
          :_id="props._id"
          :id="props.binding.id"
          category="binding"
        />
      </div>
    </div>

    <div class="w-16 px-1 flex h-full items-center">
      <input
        type="number"
        class="w-full"
        :value="props.binding.height"
        :disabled="!isAdmin"
        @input="updateMeasure('height', $event)"
        @keydown.enter="saveHandler('height')"
        @wheel="(e) => e.preventDefault()"
      />
      <img
        v-if="!isSavedHeight"
        src="/icons/save.svg"
        alt="save icon"
        @click="saveHandler('height')"
        class="hover:cursor-pointer w-5 h-5"
      />
    </div>

    <div class="w-16 px-1 flex h-full items-center">
      <input
        type="number"
        class="w-full"
        :value="props.binding.quantity"
        :disabled="!isAdmin"
        @input="updateMeasure('quantity', $event)"
        @keydown.enter="saveHandler('quantity')"
        @wheel="(e) => e.preventDefault()"
      />

      <img
        v-if="!isSavedQuantity"
        src="/icons/save.svg"
        alt="save icon"
        @click="saveHandler('quantity')"
        class="hover:cursor-pointer w-5 h-5"
      />
    </div>

    <div
      class="w-16 px-1 flex h-full items-center"
      :class="[
        `bg-[${RALcolor}]`,
        RALcolor === '#FFFFFF' ? 'text-black' : 'text-white',
      ]"
    >
      <input
        type="text"
        class="w-full text-center"
        :disabled="!isAdmin"
        :value="props.binding.color"
        @input="updateMeasure('color', $event)"
        @keydown.enter="saveHandler('color')"
        @wheel="(e) => e.preventDefault()"
      />

      <img
        v-if="!isSavedColor"
        src="/icons/save.svg"
        alt="save icon"
        @click="saveHandler('color')"
        class="hover:cursor-pointer w-5 h-5"
      />
    </div>

    <div class="w-24 px-1 flex h-full items-center" :class="cutColor">
      <input
        type="number"
        placeholder="Išpjauti"
        class="w-full"
        :disabled="!isAdmin && canEdit !== 'cut'"
        :value="props.binding.cut"
        @input="updateMeasure('cut', $event)"
        @keydown.enter="saveHandler('cut')"
        @wheel="(e) => e.preventDefault()"
      />
      <img
        v-if="!isSavedCut"
        src="/icons/save.svg"
        alt="save icon"
        @click="saveHandler('cut')"
        class="hover:cursor-pointer w-5 h-5"
      />
    </div>
    <div class="w-24 px-1 flex h-full items-center" :class="doneColor">
      <input
        type="number"
        :disabled="!isAdmin && canEdit !== 'done'"
        placeholder="Pagaminti"
        class="w-full"
        :value="props.binding.done"
        @input="updateMeasure('done', $event)"
        @keydown.enter="saveHandler('done')"
        @wheel="(e) => e.preventDefault()"
      />
      <img
        v-if="!isSavedDone"
        src="/icons/save.svg"
        alt="save icon"
        @click="saveHandler('done')"
        class="hover:cursor-pointer w-5 h-5"
      />
    </div>
    <button
      v-if="isAdmin"
      class="w-24 print:hidden lg:hover:bg-red-full lg:hover:text-white h-full items-center"
      :class="{ 'bg-red-full text-white': props.binding.postone }"
      @click="postoneHandler"
    >
      Negaminti
    </button>
    <div v-if="isAdmin" class="flex items-center justify-end h-full">
      <ProductionUploadButton
        @upload="uploadFiles"
        @selected="selectFile"
        :_id="props._id"
        :id="props.binding.id"
        category="binding"
      />
      <div @click="deleteHandler" class="print:hidden h-full px-1">
        <img
          src="/icons/delete.svg"
          alt="delete"
          class="print:hidden hover:scale-125 hover:cursor-pointer transition-transform w-6 h-full"
        />
      </div>
    </div>
    <div
      v-else
      class="w-8 print:hidden h-full flex items-center justify-center"
    >
      <img
        @click="defectHandler"
        src="/icons/sad.svg"
        alt="defect"
        width="25"
        height="25"
        class="hover:cursor-pointer hover:scale-125 transition-transform"
      />
    </div>
  </div>
</template>
<style scoped></style>
