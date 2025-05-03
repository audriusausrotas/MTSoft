<script setup lang="ts">
const props = defineProps(["order"]);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex gap-4 flex-wrap justify-around">
      <PreviewProductionFence
        v-for="fence in props.order?.fences"
        :key="fence._id"
        :fence="fence"
      />
    </div>

    <div class="flex flex-col select-none w-full items-center">
      <p class="text-xl font-bold">Apkaustai</p>
      <div
        class="flex max-w-96 sm:max-w-[500px] w-full border-y items-center h-8 border-black select-none"
      >
        <p class="w-6 sm:w-8 border-x border-black h-full flex justify-center items-center">Nr</p>
        <p class="flex-1 border-r border-black h-full flex justify-center items-center">tipas</p>
        <p class="w-12 sm:w-16 border-r border-black h-full flex justify-center items-center">
          Ilgis
        </p>
        <p class="w-12 sm:w-16 border-r border-black h-full flex justify-center items-center">
          Kiekis
        </p>
        <p class="w-12 sm:w-16 border-r border-black h-full flex justify-center items-center">
          spalva
        </p>
      </div>

      <PreviewProductionBindings
        v-for="(binding, index) in props.order?.bindings"
        :key="binding.id"
        :binding="binding"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped></style>
