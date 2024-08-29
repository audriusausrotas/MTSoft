<script setup lang="ts">
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore();
const draggedItemIndex = ref<number | null>(null);
const newOpen = ref<boolean>(false);
const orderNr = ref<string>("")
const orderAddress = ref<string>("")
const orderCreator = ref<string>("")

const onDragStart = (event: DragEvent) => {
  const target = event.target as HTMLElement;
  draggedItemIndex.value = Number(target.dataset.index);
};

const onDrop = async (event: DragEvent) => {
  const target = event.target as HTMLElement;
  //@ts-ignore
  const droppedItemIndex = Number(target.closest('[data-index]')?.dataset.index);

  if (draggedItemIndex.value !== null && droppedItemIndex !== null) {
    const draggedItem = useGamyba.gamybaList[draggedItemIndex.value];
    useGamyba.gamybaList.splice(draggedItemIndex.value, 1);
    useGamyba.gamybaList.splice(droppedItemIndex, 0, draggedItem);
    draggedItemIndex.value = null;

    await updateOrderInDatabase(useGamyba.gamybaList.map((item: any) => item._id));
  }
};

const updateOrderInDatabase = async (list: string[]) => {
  const response: any = await $fetch(
    "/api/gamybaUpdate",
    {
      method: 'post',
      body: { list },
    }
  );

  if (response.success) {

    setIsError(false);
    setError(response.message);

  } else {
    setError(response.message);
  }
};

const newHandler = async () => {

  const data = { number: orderNr.value, address: orderAddress.value, creator: orderCreator.value }

  const response: any = await $fetch(
    "/api/gamybaNew",
    {
      method: 'post',
      body: data,
    }
  );

  if (response.success) {
    useGamyba.addGamyba(response.data)
    setIsError(false);
    setError(response.message);
    newOpen.value = false
    orderNr.value = ""
    orderAddress.value = ""
    orderCreator.value = ""
  } else {
    setError(response.message);
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="pl-8">
      <BaseButton v-if="!newOpen" name="Sukurti naują" @click="newOpen = true" />
      <div v-else class="flex flex-col gap-4">
        <BaseButton name="Išsaugoti užsakymą" @click="newHandler" />
        <div class="flex gap-4">
          <BaseInput placeholder="Nr" width="w-24" :name="orderNr" @onChange="(value) => { orderNr = value }" />
          <BaseInput placeholder="Adresas" width="w-96" :name="orderAddress"
            @onChange="(value) => { orderAddress = value }" />
          <BaseInput placeholder=" Kūrėjas" width="w-24" :name="orderCreator"
            @onChange="(value) => { orderCreator = value }" />
        </div>
      </div>
    </div>
    <div v-for=" (order, index) in useGamyba.gamybaList" :key="order._id" :data-index="index" draggable="true"
      @dragstart="onDragStart" @dragover.prevent @drop="onDrop">
      <GamybaOrder :order="order" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
