<script setup lang="ts">

const props = defineProps(["fence", "index"]);

</script>

<template>
  <div class="flex flex-col">
    <div class="flex font-bold text-xl">
      <p>{{ props.fence.side }} - {{ props.fence.type }} - {{ props.fence.color }}</p>
    </div>
    <p v-if="fence.comment">Komentarai: {{ fence.comment }}</p>
    <div class="flex w-fit border-y items-center h-8  border-black select-none">
      <p class="hover:cursor-pointer h-full items-center w-10 border-x border-black  flex justify-evenly">
        Nr
      </p>
      <p class=" hover:cursor-pointer w-20 flex gap-1 justify-center border-r border-black h-full items-center">Ilgis
      </p>
      <p class=" w-24 flex items-center justify-center h-full  border-r border-black">Aukštis</p>
      <p class=" w-24 flex items-center justify-center h-full  border-r border-black">Elementai</p>
    </div>

    <div class="flex flex-col flex-1">
      <PreviewMeasure v-for="data, index in fence.measures" :key="data.index" :data="data" :index="index"
        :fenceSide="props.fence.side" :_id="data._id" />
    </div>
  </div>

</template>
<style scoped></style>
