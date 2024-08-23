<script setup lang='ts'>
const props = defineProps(["data", "fenceIndex", "index", "_id"])

const useMontavimas = useMontavimasStore()

const postone = ref<boolean>(props.data.postone)
const done = ref<boolean>(props.data.done)

const { setError, setIsError } = useError();

const postoneHandler = async () => {
    const response: any = await $fetch(
        "/api/montavimas",
        {
            method: 'patch',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index, value: !postone.value },
        }
    );

    if (response.success) {
        useMontavimas.updateOrder(props._id, response.data)
        postone.value = !postone.value;
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}


const doneHandler = async () => {
    const response: any = await $fetch(
        "/api/montavimas",
        {
            method: 'put',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index, value: !done.value },
        }
    );

    if (response.success) {
        useMontavimas.updateOrder(props._id, response.data)
        done.value = !done.value;
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

</script>

<template>
    <div v-if="props.data.laiptas.exist"
        class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex  select-none h-8">
        <p class="w-10 flex items-center justify-center h-full  border-x border-black">{{ props.index + 1 }}</p>
        <p class="w-20 flex items-center justify-center h-full  border-r border-black">Laiptas</p>
        <p class="w-24 flex items-center justify-center h-full  border-r border-black">{{ props.data.laiptas.direction
            }}</p>
        <p class="w-24 flex items-center justify-center h-full  border-r border-black">{{ props.data.laiptas.value }} cm
        </p>
        <p class="flex-1  h-full  border-r border-black"></p>

    </div>
    <div v-else-if="props.data.kampas.exist"
        class="border-b border-black w-[736px] odd:bg-gray-ultra-light flex  select-none h-8">
        <p class="w-10 flex items-center justify-center h-full  border-x border-black">
            {{ props.index + 1 }}</p>
        <p class="w-20 flex items-center justify-center h-full  border-r border-black">Kampas</p>
        <p class="w-24 flex items-center justify-center h-full  border-r border-black">{{ props.data.kampas.value }}</p>
        <p class="w-24 flex items-center justify-center h-full  border-r border-black">laipsnių</p>
        <p class="flex-1  border-r border-black"></p>

    </div>
    <div v-else class="w-fit flex select-none  border-b-2 border-black">
        <p class=" w-10 flex items-center justify-center border-x  border-black"
            :class="postone ? 'bg-red-full text-white' : done ? 'bg-green-500' : 'bg-white'">
            {{ props.index + 1 }}</p>
        <div class="flex flex-col">
            <div class="flex h-8 border-b border-black">
                <div class=" w-20 flex items-center justify-center h-full border-r border-black px-1"
                    :class="postone ? 'bg-red-full text-white' : done ? 'bg-green-500' : 'bg-white'">
                    {{ props.data.length }}

                </div>
                <div class=" w-24 flex items-center justify-center h-full  border-r border-black px-1"
                    :class="postone ? 'bg-red-full text-white' : done ? 'bg-green-500' : 'bg-white'">
                    {{ props.data.elements }}

                </div>
                <div class=" w-24 flex items-center justify-center h-full border-r border-black px-1"
                    :class="postone ? 'bg-red-full text-white' : done ? 'bg-green-500' : 'bg-white'">
                    {{ props.data.height }}
                </div>
            </div>
            <div class="flex h-8">
                <button class=" flex flex-1 items-center justify-center h-full border-r border-black w-24 print:hidden hover:bg-green-500
                     " :class="done ? 'bg-green-500 ' : postone ? 'bg-red-full text-white' : 'bg-green-50'"
                    @click="doneHandler">Sumontuota</button>
                <button
                    class=" flex flex-1 items-center justify-center h-full border-r border-black  w-24 print:hidden hover:bg-red-full hover:text-white "
                    :class="postone ? 'bg-red-full text-white' : done ? 'bg-green-500' : 'bg-red-50 text-black'"
                    @click="postoneHandler">Nemontuoti</button>
            </div>
        </div>
    </div>

</template>
<style scoped></style>
