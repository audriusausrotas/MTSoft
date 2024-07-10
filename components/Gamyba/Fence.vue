<script setup lang='ts'>
import type { Measure } from "~/data/interfaces"
import { verticals } from '~/data/selectFieldData';
const props = defineProps(["fence", "fenceIndex", "_id"])

const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const filterIndex = ref<boolean>(false)
const filterLength = ref<boolean>(false)

const filteredMeasures = ref([...props.fence.measures])

const isFenceboards = verticals.includes(props.fence.type) || props.fence.type.includes("Segmentas")

const newMeasureHandler = async () => {
    const response: any = await $fetch(
        "/api/gamybaMeasure",
        {
            method: 'post',
            body: { _id: props._id, index: props.fenceIndex },
        }
    );

    if (response.success) {
        useGamyba.updateOrder(props._id, response.data);
        setIsError(false);
        setError(response.message);

    } else {
        setError(response.message);
    }
}

function addIndex() {
    return props.fence.measures.map((item: Measure, index: number) => { return { ...item, index } })
}

const filterByLength = () => {
    const temp = addIndex()
    temp.sort((a: any, b: any) => b.length - a.length)

    filteredMeasures.value = [...temp]
    filterLength.value = true
    filterIndex.value = false

}

const filterByIndex = () => {
    const temp = addIndex()
    temp.sort((a: any, b: any) => a.index - b.index)

    filteredMeasures.value = [...temp]
    filterLength.value = false
    filterIndex.value = true
}

filterByIndex()

watch(() => props.fence.measures, (newMeasures) => {
    filteredMeasures.value = [...newMeasures];
    if (filterIndex.value)
        filterByIndex();
    else if (filterLength.value)
        filterByLength()
}, { deep: true })


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
            <p class="element hover:cursor-pointer flex gap-1 justify-center" @click="filterByIndex">Nr
                <NuxtImg src="/icons/arrowDown.svg" width="8" height="8" decoding="auto" :ismap="true" loading="lazy"
                    :class="filterIndex ? 'rotate-180' : ''" class="transition-all" />
            </p>
            <p class="element hover:cursor-pointer flex gap-1 justify-center" @click="filterByLength">Ilgis
                <NuxtImg src="/icons/arrowDown.svg" width="8" height="8" decoding="auto" :ismap="true" loading="lazy"
                    :class="filterLength ? 'rotate-180' : ''" class="transition-all" />
            </p>
            <p class="element">Elementai</p>
            <p class="element">Aukštis</p>
            <p class="element">Išpjauti</p>
            <p class="element">Pagaminti</p>
            <p class="element print:hidden">Veiksmai</p>
            <p class="element print:hidden">Veiksmai</p>
            <p class="element print:hidden"></p>



        </div>

        <div class="flex flex-col flex-1">
            <GamybaFenceInfo v-for="data in filteredMeasures" :key="data.index" :data="data" :index="data.index"
                :fenceSide="props.fence.side" :total="filteredMeasures.length" :fenceIndex="props.fenceIndex"
                :_id="props._id" />
            <BaseButton name="Pridėti naują" class="mt-2" @click="newMeasureHandler" />
        </div>
    </div>

</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 40px 80px 100px 100px 100px 100px 100px 100px 40px;
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