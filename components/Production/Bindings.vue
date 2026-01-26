<script setup lang="ts">
const props = defineProps(["binding", "index", "_id"]);
const { setError, setSuccess } = useError();
const productionStore = useProductionStore();
const userStore = useUserStore();

const isAdmin =
  userStore.user?.accountType === "Administratorius" ||
  userStore.user?.accountType === "Vadybininkas";

const cut = ref<number>(props.binding.cut);
const done = ref<number>(props.binding.done);
const name = ref<string>(props.binding.name);
const height = ref<number>(props.binding.height);
const quantity = ref<number>(props.binding.quantity);
const color = ref<string>(props.binding.color);

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
      : +props.binding.cut === +props.binding.quantity && +done === +props.binding.quantity
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
    option: "bindings",
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
        response.data.option,
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

  const response: any = await request.patch("updateProductionPostone", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      productionStore.updateMeasure(
        response.data._id,
        response.data.index,
        null,
        response.data.value,
        "postone",
        response.data.option,
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
    "bindings",
  );

  if (field === "cut")
    +inputElement.value !== cut.value ? (isSavedCut.value = false) : (isSavedCut.value = true);
  else if (field === "name")
    inputElement.value !== name.value ? (isSavedName.value = false) : (isSavedName.value = true);
  else if (field === "color")
    inputElement.value !== color.value ? (isSavedColor.value = false) : (isSavedColor.value = true);
  else if (field === "height")
    +inputElement.value !== height.value
      ? (isSavedHeight.value = false)
      : (isSavedHeight.value = true);
  else if (field === "done")
    +inputElement.value !== done.value ? (isSavedDone.value = false) : (isSavedDone.value = true);
  else if (field === "quantity")
    +inputElement.value !== quantity.value
      ? (isSavedQuantity.value = false)
      : (isSavedQuantity.value = true);
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
  <div class="flex even:bg-gray-ultra-light border-b h-8 border-black w-fit">
    <p class="w-10 border-x border-black text-center" :class="indexColor">
      {{ props.index + 1 }}
    </p>

    <div class="w-48 border-r border-black px-1 flex">
      <input
        type="text"
        class="w-full"
        :value="props.binding.name"
        @input="updateMeasure('name', $event)"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedName"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('name')"
        class="hover:cursor-pointer"
      />
    </div>

    <div class="w-16 border-r border-black px-1 flex">
      <input
        type="number"
        class="w-full"
        :value="props.binding.height"
        @input="updateMeasure('height', $event)"
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

    <div class="w-16 border-r border-black px-1 flex">
      <input
        type="number"
        class="w-full"
        :value="props.binding.quantity"
        @input="updateMeasure('quantity', $event)"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedQuantity"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('quantity')"
        class="hover:cursor-pointer"
      />
    </div>

    <div class="w-16 border-r border-black px-1 flex">
      <input
        type="text"
        class="w-full"
        :value="props.binding.color"
        @input="updateMeasure('color', $event)"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedColor"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('color')"
        class="hover:cursor-pointer"
      />
    </div>

    <div class="w-24 border-r border-black px-1 flex" :class="cutColor">
      <input
        type="number"
        placeholder="Išpjauti"
        class="w-full"
        :value="props.binding.cut"
        @input="updateMeasure('cut', $event)"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedCut"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('cut')"
        class="hover:cursor-pointer"
      />
    </div>
    <div class="w-24 border-r border-black px-1 flex" :class="doneColor">
      <input
        type="number"
        placeholder="Pagaminti"
        class="w-full"
        :value="props.binding.done"
        @input="updateMeasure('done', $event)"
      />
      <NuxtImg
        width="20"
        height="20"
        v-if="!isSavedDone"
        src="/icons/save.svg"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        @click="saveHandler('done')"
        class="hover:cursor-pointer"
      />
    </div>
    <button
      v-if="isAdmin"
      class="w-24 border-r border-black print:hidden lg:hover:bg-red-full lg:hover:text-white"
      :class="{ 'bg-red-full text-white': props.binding.postone }"
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
