<script setup lang='ts'>
import { verticals } from '~/data/selectFieldData';
const props = defineProps(["fence"])

const isFenceboards = verticals.includes(props.fence.type) || props.fence.type.includes("Segmentas")

</script>

<template>
    <div v-if="!isFenceboards" class="flex gap-4">
        <BaseInput :name="props.fence.side" label="Tvoros pusė" width="w-24" />
        <BaseInput :name="props.fence.type" label="Tvoros tipas" />
        <BaseInput :name="props.fence.color" label="Spalva" width="w-24" />
        <p v-if="props.fence.aditional">papildoma info: {{ props.fence.aditional }}</p>
    </div>
    <div class="flex flex-col gap-4">
        <GamybaFenceInfo v-for="info, index in props.fence.measures" :key="index" :data="info" :index="index" />
    </div>
</template>
<style scoped></style>