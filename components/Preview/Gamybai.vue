<script setup lang="ts">
import { verticals } from "~/data/selectFieldData";
const props = defineProps(["fence", "index"]);

const isFenceboards = ref<boolean>(verticals.includes(props.fence.type));
</script>

<template>
  <div
    class="flex flex-col gap-8 py-4 border rounded-lg items-center border-dark-light"
  >
    <div class="flex gap-4 flex-wrap justify-center items-center">
      <p class="font-semibold text-xl">{{ index + 1 }}</p>
      <BaseInput :name="fence.side" label="Tvoros pusė" width="w-24" />
      <BaseInput :name="fence.type" label="Tvoros tipas" />
      <BaseInput
        v-if="!isFenceboards"
        :name="fence.seeThrough"
        label="pramatomumas"
        width="w-36"
      />
      <BaseInput
        v-if="isFenceboards"
        :name="fence.space"
        label="tarpas"
        width="w-24"
      />
      <BaseInput
        v-if="isFenceboards"
        :name="fence.twoSided"
        label="dvipuse"
        width="w-24"
      />
      <BaseInput :name="fence.color" label="Spalva" width="w-24" />
      <BaseInput :name="fence.direction" label="Tvoros kryptis" width="w-32" />
      <BaseInput
        v-if="!isFenceboards"
        :name="fence.bindings"
        label="Apkaustai"
        width="w-24"
      />
      <BaseInput
        v-if="!isFenceboards"
        :name="fence.material"
        label="Skarda"
        width="w-24"
      />
      <p v-if="fence.aditional">papildoma info: {{ fence.aditional }}</p>
    </div>
    <div class="flex gap-2 flex-wrap justify-center">
      <PreviewMeasures
        v-for="(measure, index) in props.fence.measures"
        :key="index"
        :index="index"
        :measure="measure"
        :isFenceboards="isFenceboards"
      />
    </div>
  </div>
</template>
<style scoped></style>
