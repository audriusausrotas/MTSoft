<script setup lang="ts">
import type { ProductionFence } from "~/data/interfaces";

const props = defineProps({
  fence: Object as () => ProductionFence,
});
</script>

<template>
  <div class="flex flex-col max-w-[504px]">
    <div v-if="fence?.comment">{{ fence.comment }}</div>
    <div class="flex items-center font-bold text-lg border-black border-t border-l">
      <div class="w-40 flex items-center justify-center h-full border-r border-black px-2">
        {{ fence?.side }}
      </div>

      <div
        class="flex-1 min-w-fit flex items-center justify-center h-full border-r border-black px-2"
      >
        {{ fence?.name }}
      </div>
    </div>

    <div class="flex items-center font-bold text-lg border-black border-t border-r border-l">
      <div class="w-40 flex items-center justify-center h-full border-r border-black px-2">
        {{ fence?.color }}
      </div>
      <div class="w-40 flex items-center justify-center h-full border-r border-black px-2">
        {{ fence?.manufacturer }}
      </div>

      <div class="w-40 flex items-center justify-center h-full px-2">
        {{ fence?.material }}
      </div>
    </div>

    <div class="flex items-center font-bold text-lg border border-black border-b-0 px-2">
      <div class="flex items-center w-full justify-evenly">
        <div class="flex gap-2">
          Skylutės:
          <div class="select-none">
            {{ fence?.holes }}
          </div>
        </div>

        <div v-if="fence?.holes === 'Taip'">Žingsnis: {{ fence.step }}</div>
      </div>
      <div class="flex-1 min-w-fit flex justify-center gap-2 border-black px-2"></div>
      <div class="w-[39px] flex items-center justify-center"></div>
    </div>

    <div class="flex w-fit border-y items-center h-8 border-black select-none">
      <p class="h-full items-center w-10 border-x border-black flex justify-evenly">Nr</p>
      <p class="w-20 flex gap-1 justify-center border-r border-black h-full items-center">Ilgis</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Elementai</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Aukštis</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Išpjauti</p>
      <p class="w-24 flex items-center justify-center h-full border-r border-black">Pagaminti</p>
    </div>

    <div class="flex flex-col flex-1">
      <ArchiveProductionFenceInfo
        v-for="(data, index) in fence?.measures"
        :key="index"
        :data="data"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped></style>
