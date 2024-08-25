<script setup lang='ts'>
import { verticals } from "~/data/selectFieldData"
const props = defineProps(["fence", "fenceIndex", "_id"])

const isVertical = verticals.includes(props.fence.type)

</script>

<template>
    <div class="flex gap-1 flex-col">
        <div>
            <p v-if="props.fence.aditional" class="w-[312px] text-justify border border-black p-2">
                <span class="font-bold">Komentarai:</span>
                {{ props.fence.aditional }}
            </p>
        </div>
        <div class="flex flex-col divide-y divide-black border border-black font-semibold xl:text-lg bg-gray-light">
            <div class="flex divide-x divide-black text-center">
                <div class="flex-1">{{ props.fence.side }}</div>
                <div class="flex-1">{{ props.fence.color }}</div>
            </div>
            <div class="flex text-center divide-x divide-black">
                <div class="flex-1 min-w-fit">{{ props.fence.type }}</div>
                <div class="flex-1">{{ props.fence.seeThrough }}</div>

            </div>
            <div class="flex text-center divide-x divide-black">
                <div class="flex-1 min-w-fit">{{ props.fence.bindings === "Taip" ? "Su apkaustais" : "Be apkaustų" }}
                </div>
                <div class="flex-1">{{ props.fence.direction }}</div>
            </div>
            <div v-if="isVertical" class="flex text-center divide-x divide-black">
                <div class="flex-1">{{ props.fence.twoSided === "Taip" ? "Dvipusė" : "Vienpusė" }}</div>
                <div class="flex-1">Tarpas {{ props.fence.space }} cm</div>
            </div>


        </div>

        <div>
            <div class="flex w-fit border-y items-center h-8  border-black select-none bg-red-light ">
                <p class="hover:cursor-pointer h-full items-center w-10 border-x border-black  flex justify-evenly">
                    Nr
                </p>
                <p
                    class=" hover:cursor-pointer w-20 flex gap-1 justify-center border-r border-black h-full items-center">
                    Ilgis
                </p>
                <p class=" w-24 flex items-center justify-center h-full  border-r border-black">Elementai</p>
                <p class=" w-24 flex items-center justify-center h-full  border-r border-black">Aukštis</p>
            </div>

            <div class="flex flex-col flex-1">
                <MontavimasFenceInfo v-for="data, index in props.fence.measures" :key="data._id" :data="data"
                    :index="index" :fenceSide="props.fence.side" :total="props.fence.measures.length"
                    :fenceIndex="props.fenceIndex" :_id="props._id" />
            </div>
        </div>
    </div>

</template>
<style scoped></style>