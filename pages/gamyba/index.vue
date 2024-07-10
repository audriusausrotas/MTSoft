<script setup lang="ts">

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

const updateOrderInDatabase = async (newOrder: string[]) => {

  // try {
  //   await fetch('/api/update-order', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ order: newOrder })
  //   });
  // } catch (error) {
  //   console.error('Failed to update order in the database', error);
  // }
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
