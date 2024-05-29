<script setup lang="ts">
import { verticals } from "~/data/selectFieldData";
const props = defineProps(["fence", "index", "showFull"]);

const isFenceboards = verticals.includes(props.fence.type);
const isSegmentas = props.fence.type === "Segmentas";
</script>

<template>
  <div v-if="showFull || !isSegmentas" class="flex flex-col gap-8 p-4 items-center border-b  border-dark-full">
    <div class="flex flex-col gap-4 w-full">
      <div class="flex gap-4 font-semibold text-3xl self-center flex-wrap">
        <p class="">{{ index + 1 }}</p>
        <p>{{ fence.side }}</p>
      </div>
      <div class="flex gap-4 pb-4">
        <BaseInput :name="fence.type" label="Tvoros tipas" width="w-40" />
        <BaseInput :name="fence.color" label="Spalva" width="w-20" />
        <BaseInput v-if="!isFenceboards && !isSegmentas" :name="fence.bindings" label="Apkaustai" width="w-20" />
        <BaseInput v-if="!isFenceboards && !isSegmentas" :name="fence.material" label="Skarda" width="w-24" />
      </div>
      <p v-if="fence.aditional">papildoma info: {{ fence.aditional }}</p>
      <div class="flex gap-2 flex-wrap">
        <PreviewMeasures v-for="(measure, index) in props.fence.measures" :key="index" :index="index" :measure="measure"
          :isFenceboards="isFenceboards" :isSegmentas="isSegmentas" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
