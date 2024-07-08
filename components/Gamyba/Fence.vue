<script setup lang='ts'>
import type { Measure } from "~/data/interfaces"
import { verticals } from '~/data/selectFieldData';
const props = defineProps(["fence", "fenceIndex", "_id"])

// const filteredMeasures = reactive({ ...addIndex() })

const isFenceboards = verticals.includes(props.fence.type) || props.fence.type.includes("Segmentas")

// function addIndex() {
//     return props.fence.measures.map((item: Measure, index: number) => { return { ...item, index } })
// }

// const filterByLength = () => {
//     const temp = addIndex()
//     temp.sort((a: any, b: any) => b.length - a.length)

//     filteredMeasures.value = { ...temp }
// }

// const filterByIndex = () => {
//     const temp = addIndex()
//     temp.sort((a: any, b: any) => a.index - b.index)

//     filteredMeasures.value = { ...temp }
// }





</script>

<template>
    <div class="flex flex-col">
        <div v-if="!isFenceboards" class="flex font-bold text-2xl">
            <p>{{ props.fence.side }} - {{ props.fence.type }} - {{ props.fence.color }}</p>
        </div>
        <div>
            <p v-if="props.fence.aditional">{{ props.fence.aditional }} </p>
        </div>

        <div class="container container-border border-t border-black flex-1 select-none">
            <p class="element hover:cursor-pointer" @click="filterByIndex">Nr</p>
            <p class="element hover:cursor-pointer" @click="filterByLength">Ilgis</p>
            <p class="element">Elementai</p>
            <p class="element">Aukštis</p>
            <p class="element">Išpjauti</p>
            <p class="element">Pagaminti</p>
            <p class="element print:hidden">Veiksmai</p>
            <p class="element print:hidden">Veiksmai</p>
        </div>

        <div class="flex flex-col flex-1">
            <GamybaFenceInfo v-for="data, index in props.fence.measures" :key="index" :data="data"
                :index="data.index | index" :fenceSide="props.fence.side" :total="props.fence.measures.length"
                :fenceIndex="props.fenceIndex" :_id="props._id" />
        </div>

    </div>

</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 40px 80px 100px 100px 100px 100px 100px 100px;
    row-gap: 10px;
    width: fit-content
}

.container-border {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
}

.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center;
}
</style>