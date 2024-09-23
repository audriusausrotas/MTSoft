<script setup lang="ts">
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore();
const useUser = useUserStore();
const draggedItemIndex = ref<number | null>(null);
const newOpen = ref<boolean>(false);
const orderNr = ref<string>("");
const orderAddress = ref<string>("");
const orderCreator = ref<string>("");
const loading = ref<boolean>(false);
const enableEdit = ref<boolean>(false);

const onDragStart = (event: DragEvent) => {
  if (useUser.user?.accountType !== "Administratorius") return;

  const target = event.target as HTMLElement;
  draggedItemIndex.value = Number(target.dataset.index);
};

const onDrop = async (event: DragEvent) => {
  loading.value = true;
  const target = event.target as HTMLElement;
  //@ts-ignore
  const droppedItemIndex = Number(target.closest("[data-index]")?.dataset.index);

  if (draggedItemIndex.value !== null && droppedItemIndex !== null) {
    const draggedItem = useGamyba.gamybaList[draggedItemIndex.value];
    useGamyba.gamybaList.splice(draggedItemIndex.value, 1);
    useGamyba.gamybaList.splice(droppedItemIndex, 0, draggedItem);
    draggedItemIndex.value = null;

    await updateOrderInDatabase(useGamyba.gamybaList.map((item: any) => item._id));
  }
};

const updateOrderInDatabase = async (list: string[]) => {
  const response: any = await $fetch("/api/gamybaUpdate", {
    method: "post",
    body: { list },
  });

  if (response.success) {
    useGamyba.addAll(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  loading.value = false;
};

const newHandler = async () => {
  loading.value = true;

  const data = { number: orderNr.value, address: orderAddress.value, creator: orderCreator.value };

  const response: any = await $fetch("/api/gamybaNew", {
    method: "post",
    body: data,
  });

  if (response.success) {
    useGamyba.addGamyba(response.data);
    setIsError(false);
    setError(response.message);
    newOpen.value = false;
    orderNr.value = "";
    orderAddress.value = "";
    orderCreator.value = "";
  } else {
    setError(response.message);
  }
  loading.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-4 select-none">
    <div class="pl-8 flex gap-4">
      <BaseButton v-if="!newOpen" name="Sukurti naują" @click="newOpen = true" />
      <div v-else class="flex flex-col gap-4">
        <BaseButton name="Išsaugoti užsakymą" @click="newHandler" />
        <div class="flex gap-4">
          <BaseInput
            placeholder="Nr"
            width="w-24"
            :name="orderNr"
            @onChange="
              (value) => {
                orderNr = value;
              }
            "
          />
          <BaseInput
            placeholder="Adresas"
            width="w-96"
            :name="orderAddress"
            @onChange="
              (value) => {
                orderAddress = value;
              }
            "
          />
          <BaseInput
            placeholder=" Kūrėjas"
            width="w-24"
            :name="orderCreator"
            @onChange="
              (value) => {
                orderCreator = value;
              }
            "
          />
        </div>
      </div>
      <BaseButton
        :name="enableEdit ? 'Išjungti konfiguravimą' : 'Įjungti konfiguravimą'"
        @click="enableEdit = !enableEdit"
        :class="enableEdit ? 'bg-green-600' : ''"
      />
    </div>
    <div
      v-for="(order, index) in useGamyba.gamybaList"
      :key="order._id"
      :data-index="index"
      :draggable="enableEdit"
      @dragstart="onDragStart"
      @dragover.prevent
      @drop="onDrop"
    >
      <GamybaOrder :order="order" :index="index" />
    </div>
    <div
      v-if="loading"
      class="fixed flex bg-black bg-opacity-60 backdrop-blur-sm z-50 scroll select-none top-0 left-0 scroll w-full h-full justify-center items-center"
    >
      <div
        class="w-14 h-14 border-8 border-red-full border-t-green-500 rounded-full animate-spin"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
