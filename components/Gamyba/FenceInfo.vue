<script setup lang='ts'>
const props = defineProps(["data", "fenceIndex", "index", "fenceSide", "total", "_id"])

const cut = ref<number>(props.data.cut)
const done = ref<number>(props.data.done)

const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const saveHandler = async (action: string) => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: action === 'cut' ? 'put' : 'patch',
            body: { _id: props._id, index: props.fenceIndex, measureIndex: props.index, value: cut.value },
        }
    );
    if (response.success) {
        useGamyba.updateGamyba(props.data._id, response.data)
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
</script>

<template>
    <div v-if="props.data.laiptas.exist"
        class="container border-b container-border border-black odd:bg-gray-ultra-light flex-1">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">Laiptas</p>
        <p class="element">{{ props.data.laiptas.direction }}</p>
        <p class="element">{{ props.data.laiptas.value }} cm</p>
    </div>
    <div v-else-if="props.data.kampas.exist"
        class="container border-b container-border border-black odd:bg-gray-ultra-light flex-1">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">Kampas</p>
        <p class="element">{{ props.data.kampas.value }}</p>
        <p class="element">laipsnių</p>
    </div>
    <div v-else class="container odd:bg-gray-ultra-light container-border flex-1">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">{{ props.data.length }}</p>
        <p class="element">{{ props.data.elements }}</p>
        <div class="element flex"
            :class="+cut === +props.data.elements ? 'bg-green-400' : +cut === 0 ? 'bg-white' : +cut > +props.data.elements ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="cut" type="number" placeholder="Išpjauti" />
            <NuxtImg src="/icons/checked.svg" width="20" height="20" decoding="auto" loading="lazy" :ismap="true"
                @click="saveHandler('cut')" class="hover:cursor-pointer hover:bg-green-100 rounded-md print:hidden" />
        </div>
        <div class="element flex"
            :class="+done === +props.data.elements ? 'bg-green-400' : +done === 0 ? 'bg-white' : +done > +props.data.elements ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="done" type="number" placeholder="Pagaminti" />
            <NuxtImg src="/icons/checked.svg" width="20" height="20" decoding="auto" loading="lazy" :ismap="true"
                @click="saveHandler('done')" class="hover:cursor-pointer hover:bg-green-100 rounded-md print:hidden" />
        </div>
        <button class=" element print:hidden hover:bg-red-full hover:text-white"
            @click="printHandler">Spausdinti</button>
    </div>

</template>
<style scoped>
.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center
}
</style>