<script setup lang="ts">
import { verticals } from "~/data/selectFieldData";
const props = defineProps(["data"]);
const isFenceboards = ref<boolean>(verticals.includes(props.data?.type));
</script>

<template>
  <div class="flex flex-col gap-12">
    <div
      v-for="(fence, index) in props.data"
      :key="fence.id"
      class="flex gap-4 flex-wrap items-center"
    >
      <p>{{ index + 1 }}</p>
      <BaseInput :name="fence.side" label="Tvoros pusė" width="w-24" />
      <BaseInput :name="fence.type" label="Tvoros tipas" />
      <BaseInput
        v-if="!isFenceboards"
        :name="fence.totalQuantity"
        label="Kvadratai"
        width="w-24"
      />
      <BaseInput :name="fence.seeThrough" label="pramatomumas" width="w-36" />
      <BaseInput :name="fence.space" label="tarpas" width="w-24" />
      <BaseInput :name="fence.twoSided" label="dvipuse" width="w-24" />
      <BaseInput :name="fence.color" label="Spalva" width="w-24" />
      <BaseInput :name="fence.direction" label="Tvoros kryptis" width="w-32" />
      <BaseInput :name="fence.bindings" label="Apkaustai" width="w-24" />
      <BaseInput :name="fence.material" label="Skarda" width="w-24" />
      <BaseInput :name="fence.parts" label="medziagos" width="w-40" />
      <BaseInput :name="fence.services" label="paslaugos" width="w-52" />
      <BaseInput
        :name="fence.anchoredPoles"
        label="ankeriuojami stulpai"
        width="w-36"
      />

      <BaseInput :name="fence.totalLength" label="tvoros ilgis" width="w-24" />
      <BaseInput :name="fence.totalQuantity" label="Kvadratai" width="w-24" />
      <BaseInput :name="fence.totalQuantity" label="Kvadratai" width="w-24" />
      <p v-if="fence.aditional">papildoma info: {{ fence.aditional }}</p>
    </div>
  </div>
</template>
<style scoped></style>
