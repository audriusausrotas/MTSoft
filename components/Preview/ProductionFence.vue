<script setup lang="ts">
const props = defineProps(["fence"]);
</script>

<template>
  <div class="flex flex-col w-fit">
    <div class="flex gap-4 items-center font-bold text-xl">
      <p>
        {{ props.fence.side }} - {{ props.fence.type }} -
        {{ props.fence.color }}
      </p>
    </div>

    <div class="flex w-fit border-y items-center h-8 border-black select-none">
      <p
        class="hover:cursor-pointer h-full items-center w-10 border-x border-black flex justify-evenly"
      >
        Nr
      </p>
      <p
        class="hover:cursor-pointer w-20 flex gap-1 justify-center border-r border-black h-full items-center"
      >
        Ilgis
      </p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Elementai</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Aukštis</p>
    </div>

    <div class="flex flex-col flex-1">
      <PreviewProductionFenceInfo
        v-for="(data, index) in fence.measures"
        :key="data._id"
        :data="data"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped></style>
