<script setup lang='ts'>
import { verticals } from '~/data/selectFieldData';
const props = defineProps(["fence"])

const isFenceboards = verticals.includes(props.fence.type) || props.fence.type.includes("Segmentas")

</script>

<template>
    <div class="flex flex-col gap-1">
        <div v-if="!isFenceboards" class="flex gap-4">
            <BaseInput :name="props.fence.side" label="Tvoros pusė" width="w-24" />
            <BaseInput :name="props.fence.type" label="Tvoros tipas" />
            <BaseInput :name="props.fence.color" label="Spalva" width="w-24" />
        </div>
        <div>
            <p v-if="props.fence.aditional">{{ props.fence.aditional }} </p>
        </div>
        <div class="container">
            <p>Nr</p>
            <p>Ilgis</p>
            <p>Elementai</p>
            <p>Išpjauti</p>
            <p>Pagaminti</p>
        </div>
        <div class="flex flex-col">
            <GamybaFenceInfo v-for="info, index in props.fence.measures" :key="index" :data="info" :index="index" />
        </div>
    </div>
</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 40px 80px 80px 80px 80px 100px;
    row-gap: 10px;
}
</style>