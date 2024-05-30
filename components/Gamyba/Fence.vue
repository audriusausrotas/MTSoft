<script setup lang='ts'>
import { verticals } from '~/data/selectFieldData';
const props = defineProps(["fence",])

const isFenceboards = verticals.includes(props.fence.type) || props.fence.type.includes("Segmentas")

</script>

<template>
    <div class="flex flex-col gap-1  border-black">
        <div v-if="!isFenceboards" class="flex gap-4">
            <BaseInput :name="props.fence.side" label="Tvoros pusė" width="w-24" />
            <BaseInput :name="props.fence.type" label="Tvoros tipas" />
            <BaseInput :name="props.fence.color" label="Spalva" width="w-24" />
        </div>
        <div>
            <p v-if="props.fence.aditional">{{ props.fence.aditional }} </p>
        </div>
        <div class="flex flex-col  border-black">
            <div class="container border  border-black ">
                <p class="element">Nr</p>
                <p class="element">Ilgis</p>
                <p class="element">Elementai</p>
                <p class="element">Išpjauti</p>
                <p class="element">Pagaminti</p>
                <p class="element print:hidden">Veiksmai</p>
            </div>
            <GamybaFenceInfo v-for="info, index in props.fence.measures" :key="index" :data="info" :index="index"
                :fenceSide="props.fence.side" :total="props.fence.measures.length" />
        </div>
    </div>
</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 40px 80px 100px 80px 100px 100px;
    row-gap: 10px;
}

.container-border {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    border-right: 1px solid black
}

.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center;
}
</style>