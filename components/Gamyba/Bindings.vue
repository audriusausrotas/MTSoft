<script setup lang='ts'>
const props = defineProps(["binding", "index", "_id"])
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const cut = ref<number>(props.binding.cut)
const done = ref<number>(props.binding.done)
const postone = ref<boolean>(props.binding.postone)
const isSavedCut = ref<boolean>(true)
const isSavedDone = ref<boolean>(true)

const saveHandler = async (field: string) => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: 'put',
            body: { _id: props._id, index: props.index, value: field === 'cut' ? cut.value : done.value, field, option: 'bindings' },
        }
    );
    if (response.success) {
        useGamyba.updateGamyba(props._id, response.data)
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
            body: { _id: props._id, index: props.index, value: !postone.value, option: 'bindings' },
        }
    );

    if (response.success) {
        useGamyba.updateGamyba(props._id, response.data)
        postone.value = !postone.value;
        setIsError(false);
        setError(response.message);

    } else {
        setError(response.message);
    }
}

watch(cut, (newCut) => {
    if (newCut !== props.binding.cut)
        isSavedCut.value = false
    else
        isSavedCut.value = true
});

watch(done, (newDone) => {
    if (newDone !== props.binding.done)
        isSavedDone.value = false
    else
        isSavedDone.value = true
});
</script>

<template>
    <div class="container container-border even:bg-gray-ultra-light">
        <div class="element" :class="{ 'bg-red-full text-white': postone }">{{ props.index + 1 }}</div>
        <div class="element">{{ binding.height }}</div>
        <div class="element">{{ binding.quantity }}</div>
        <div class="element">{{ binding.type }}</div>
        <div class="element">{{ binding.color }}</div>
        <div class="element flex"
            :class="+cut === +props.binding.quantity ? 'bg-green-400' : +cut === 0 ? 'bg-transparent' : cut === undefined ? 'bg-transparent' : +cut > +props.binding.quantity ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="cut" type="number" placeholder="Išpjauti" />
            <NuxtImg v-if="!isSavedCut" src="/icons/checked.svg" width="20" height="20" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('cut')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md print:hidden" />
        </div>
        <div class="element flex"
            :class="+done === +props.binding.quantity ? 'bg-green-400' : +done === 0 ? 'bg-transparent' : done === undefined ? 'bg-transparent' : +done > +props.binding.quantity ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="done" type="number" placeholder="Pagaminti" />
            <NuxtImg v-if="!isSavedDone" src="/icons/checked.svg" width="20" height="20" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('done')"
                class="hover:cursor-pointer hover:bg-pink-500 rounded-md print:hidden" />
        </div>
        <button class=" element print:hidden hover:bg-red-full hover:text-white"
            :class="{ 'bg-red-full text-white': postone }" @click="postoneHandler">Negaminti</button>
    </div>

</template>
<style scoped>
.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center;
}
</style>