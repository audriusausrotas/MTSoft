<script setup lang='ts'>
const props = defineProps(["data", "fenceIndex", "index", "fenceSide", "total", "_id"])

const cut = ref<string>(props.data.cut)
const done = ref<string>(props.data.done)
const postone = ref<boolean>(props.data.postone)
const isSavedCut = ref<boolean>(true)
const isSavedDone = ref<boolean>(true)

const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const saveHandler = async (field: string) => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: 'put',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index, value: field === 'cut' ? +cut.value : +done.value, field, option: 'fences' },
        }
    );
    if (response.success) {
        useGamyba.updateGamyba(props.data._id, response.data)
        setIsError(false);
        setError(response.message);

        if (field === 'cut') {
            isSavedCut.value = true
        } else {
            isSavedDone.value = true
        }
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
        useGamyba.updateGamyba(props.data._id, response.data)
        postone.value = !postone.value;
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
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">Kampas</p>
        <p class="element">{{ props.data.kampas.value }}</p>
        <p class="element">laipsnių</p>
    </div>
    <div v-else class="container odd:bg-gray-ultra-light container-border flex-1 select-none">
        <p class="element" :class="{ 'bg-red-full text-white': postone }">{{ props.index + 1 }}</p>
        <p class="element">{{ props.data.length }}</p>
        <p class="element">{{ props.data.elements }}</p>
        <p class="element">{{ props.data.height }}</p>
        <div class="element flex"
            :class="+cut === +props.data.elements ? 'bg-green-400' : +cut === 0 ? 'bg-transparent' : cut === undefined ? 'bg-transparent' : +cut > +props.data.elements ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="cut" type="number" placeholder="Išpjauti" />
            <NuxtImg v-if="!isSavedCut" src="/icons/checked.svg" decoding="auto" loading="lazy" :ismap="true"
                @click="saveHandler('cut')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " />
        </div>
        <div class="element flex"
            :class="+done === +props.data.elements ? 'bg-green-400' : +done === 0 ? 'bg-transparent' : done === undefined ? 'bg-transparent' : +done > +props.data.elements ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="done" type="number" placeholder="Pagaminti" />
            <NuxtImg v-if="!isSavedDone" src="/icons/checked.svg" decoding="auto" loading="lazy" :ismap="true"
                @click="saveHandler('done')"
                class="hover:cursor-pointer hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6" />
        </div>
        <button class=" element print:hidden lg:hover:bg-red-full lg:hover:text-white"
            @click="printHandler">Spausdinti</button>
        <button class=" element print:hidden lg:hover:bg-red-full lg:hover:text-white"
            :class="{ 'bg-red-full text-white': postone }" @click="postoneHandler">Negaminti</button>
    </div>

</template>
<style scoped>
.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center
}
</style>