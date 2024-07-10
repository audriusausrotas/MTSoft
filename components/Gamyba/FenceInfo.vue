<script setup lang='ts'>
const props = defineProps(["data", "fenceIndex", "index", "fenceSide", "total", "_id"])

const cut = ref<string>(props.data.cut)
const done = ref<string>(props.data.done)
const elements = ref<string>(props.data.elements)
const height = ref<string>(props.data.height)
const length = ref<string>(props.data.length)
const postone = ref<boolean>(props.data.postone)
const isSavedElements = ref<boolean>(true)
const isSavedHeight = ref<boolean>(true)
const isSavedLength = ref<boolean>(true)
const isSavedCut = ref<boolean>(true)
const isSavedDone = ref<boolean>(true)


const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const saveHandler = async (field: string) => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: 'put',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index, value: field === 'cut' ? +cut.value : field === 'done' ? +done.value : field === 'elements' ? +elements.value : field === 'length' ? +length.value : +height.value, field, option: 'fences' },
        }
    );
    if (response.success) {
        useGamyba.updateOrder(props.data._id, response.data)
        setIsError(false);
        setError(response.message);

        if (field === 'cut')
            isSavedCut.value = true
        else if (field === 'elements')
            isSavedElements.value = true
        else if (field === 'height')
            isSavedHeight.value = true
        else if (field === 'done')
            isSavedDone.value = true
        else if (field === 'length')
            isSavedLength.value = true

    } else {
        setError(response.message);
    }
}

const postoneHandler = async () => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: 'patch',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index, value: !postone.value, option: 'fences' },
        }
    );

    if (response.success) {
        useGamyba.updateOrder(props._id, response.data)
        postone.value = !postone.value;
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

const deleteHandler = async () => {
    const response: any = await $fetch(
        "/api/gamybaMeasure",
        {
            method: 'delete',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index },
        }
    );

    if (response.success) {
        useGamyba.updateOrder(props._id, response.data)
        setIsError(false);
        setError(response.message);

    } else {
        setError(response.message);
    }
}

const printHandler = () => {
    const printContent = `
        <html>
            <head>
                <title>Print</title>
                <style>
                    .print-content {
                        display: flex;
                        justify-content: center;
                        font-size: 100px;
                    }
                </style>
            </head>
            <body>
                <div class="print-content">
                    <p>${props.fenceSide} ${props.index + 1} / ${props.total}</p>
                </div>
            </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
}

watch(cut, (newCut) => {
    console.log(newCut)
    if (newCut !== props.data.cut)
        isSavedCut.value = false
    else
        isSavedCut.value = true
});

watch(done, (newDone) => {
    if (newDone !== props.data.done)
        isSavedDone.value = false
    else
        isSavedDone.value = true
});

watch(elements, (newElements) => {
    if (+newElements !== +props.data.elements)
        isSavedElements.value = false
    else
        isSavedElements.value = true
});

watch(height, (newHeight) => {
    if (+newHeight !== +props.data.height)
        isSavedHeight.value = false
    else
        isSavedHeight.value = true
});

watch(length, (newLength) => {
    if (+newLength !== +props.data.length)
        isSavedLength.value = false
    else
        isSavedLength.value = true
});

</script>

<template>
    <div v-if="props.data.laiptas.exist"
        class="container border-b container-border border-black odd:bg-gray-ultra-light flex-1 select-none">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">Laiptas</p>
        <p class="element">{{ props.data.laiptas.direction }}</p>
        <p class="element">{{ props.data.laiptas.value }} cm</p>
    </div>
    <div v-else-if="props.data.kampas.exist"
        class="container border-b container-border border-black odd:bg-gray-ultra-light flex-1 select-none">
        <p class="element">
            {{ props.index + 1 }}</p>
        <p class="element">Kampas</p>
        <p class="element">{{ props.data.kampas.value }}</p>
        <p class="element">laipsnių</p>
    </div>
    <div v-else class="container odd:bg-gray-ultra-light container-border flex-1 select-none">
        <p class="element"
            :class="postone ? 'bg-red-full text-white' : +cut === 0 ? 'bg-transparent' : +cut === +props.data.elements && +done === +props.data.elements ? 'bg-green-500' : cut === undefined ? 'bg-transparent' : +cut > +props.data.elements ? 'bg-red-full' : +cut === +props.data.elements ? 'bg-green-300' : 'bg-orange-400'">
            {{ props.index + 1 }}</p>

        <div class="element  flex">
            <input type="number" v-model="length">
            <NuxtImg width="20" height="20" v-if="!isSavedLength" src="/icons/checked.svg" decoding="auto"
                loading="lazy" :ismap="true" @click="saveHandler('length')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " /></input>
        </div>
        <div class="element  flex">
            <input type="number" v-model="elements">
            <NuxtImg width="20" height="20" v-if="!isSavedElements" src="/icons/checked.svg" decoding="auto"
                loading="lazy" :ismap="true" @click="saveHandler('elements')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " /></input>
        </div>
        <div class="element  flex">
            <input type="number" v-model="height">
            <NuxtImg width="20" height="20" v-if="!isSavedHeight" src="/icons/checked.svg" decoding="auto"
                loading="lazy" :ismap="true" @click="saveHandler('height')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " />
        </div>
        <div class="element flex"
            :class="+cut === 0 ? 'bg-transparent' : cut === undefined ? 'bg-transparent' : +cut === +props.data.elements ? 'bg-green-500' : +cut > +props.data.elements ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="cut" type="number" placeholder="Išpjauti" />
            <NuxtImg v-if="!isSavedCut" src="/icons/checked.svg" decoding="auto" loading="lazy" :ismap="true"
                @click="saveHandler('cut')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " />
        </div>
        <div class="element flex"
            :class="+cut === 0 ? 'bg-transparent' : cut === undefined ? 'bg-transparent' : +cut === +props.data.elements ? 'bg-green-500' : +cut > +props.data.elements ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="done" type="number" placeholder="Pagaminti" />
            <NuxtImg v-if="!isSavedDone" src="/icons/checked.svg" decoding="auto" loading="lazy" :ismap="true"
                @click="saveHandler('done')"
                class="hover:cursor-pointer hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6" />
        </div>
        <button class=" element print:hidden lg:hover:bg-red-full lg:hover:text-white"
            @click="printHandler">Spausdinti</button>
        <button class=" element print:hidden lg:hover:bg-red-full lg:hover:text-white"
            :class="{ 'bg-red-full text-white': postone }" @click="postoneHandler">Negaminti</button>
        <div class="element print:hidden flex justify-center items-center hover:bg-red-ulta-light hover:cursor-pointer"
            @click="deleteHandler">
            <NuxtImg width="20" height="20" src="/icons/delete.svg" decoding="auto" loading="lazy" :ismap="true"
                class="w-full max-w-6 max-h-6" />
        </div>
    </div>

</template>
<style scoped>
.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center
}
</style>