<script setup lang="ts">
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore();
const draggedItemIndex = ref<number | null>(null);

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
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(order, index) in useGamyba.gamybaList" :key="order._id" :data-index="index" draggable="true"
      @dragstart="onDragStart" @dragover.prevent @drop="onDrop">
      <GamybaOrder :order="order" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
