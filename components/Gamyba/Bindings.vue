<script setup lang='ts'>
const props = defineProps(["binding", "index", "_id"])
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const cut = ref<number>(props.binding.cut)
const done = ref<number>(props.binding.done)
const postone = ref<boolean>(props.binding.postone)
const isSavedCut = ref<boolean>(true)
const isSavedDone = ref<boolean>(true)
const isSavedType = ref<boolean>(true)
const isSavedHeight = ref<boolean>(true)
const isSavedQuantity = ref<boolean>(true)
const isSavedColor = ref<boolean>(true)
const type = ref<string>(props.binding.type)
const height = ref<number>(props.binding.height)
const quantity = ref<number>(props.binding.quantity)
const color = ref<string>(props.binding.color)

const saveHandler = async (field: string) => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: 'put',
            body: { _id: props._id, index: props.index, value: field === 'cut' ? +cut.value : field === 'done' ? +done.value : field === 'type' ? type.value : field === 'height' ? +height.value : field === 'quantity' ? +quantity.value : color.value, field, option: 'bindings' },
        }
    );
    if (response.success) {
        useGamyba.updateOrder(props._id, response.data)
        setIsError(false);
        setError(response.message);

        if (field === 'cut')
            isSavedCut.value = true
        else if (field === 'done')
            isSavedDone.value = true
        else if (field === 'type')
            isSavedType.value = true
        else if (field === 'height')
            isSavedHeight.value = true
        else if (field === 'quantity')
            isSavedQuantity.value = true
        else if (field === 'color')
            isSavedColor.value = true

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
        "/api/bindings",
        {
            method: 'delete',
            body: { _id: props._id, bindingId: props.binding.id, },
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

watch(type, (newType) => {
    if (newType !== props.binding.type)
        isSavedType.value = false
    else
        isSavedType.value = true
});

watch(height, (newHeight) => {
    if (+newHeight !== +props.binding.height)
        isSavedHeight.value = false
    else
        isSavedHeight.value = true
});

watch(quantity, (newQuantity) => {
    if (+newQuantity !== +props.binding.quantity)
        isSavedQuantity.value = false
    else
        isSavedQuantity.value = true
});

watch(color, (newColor) => {
    if (newColor !== props.binding.color)
        isSavedColor.value = false
    else
        isSavedColor.value = true
});

</script>

<template>
    <div class="container container-border even:bg-gray-ultra-light">
        <div class="element" :class="{ 'bg-red-full text-white': postone }">{{ props.index + 1 }}</div>

        <div class="element  flex">
            <input type="text" v-model="type">
            <NuxtImg width="20" height="20" v-if="!isSavedType" src="/icons/checked.svg" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('type')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " /></input>
        </div>

        <div class="element  flex">
            <input type="number" v-model="height">
            <NuxtImg width="20" height="20" v-if="!isSavedHeight" src="/icons/checked.svg" decoding="auto"
                loading="lazy" :ismap="true" @click="saveHandler('height')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " /></input>
        </div>

        <div class="element  flex">
            <input type="number" v-model="quantity">
            <NuxtImg width="20" height="20" v-if="!isSavedQuantity" src="/icons/checked.svg" decoding="auto"
                loading="lazy" :ismap="true" @click="saveHandler('quantity')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " /></input>
        </div>

        <div class="element  flex">
            <input type="text" v-model="color">
            <NuxtImg width="20" height="20" v-if="!isSavedColor" src="/icons/checked.svg" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('color')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " /></input>
        </div>


        <div class="element flex"
            :class="+cut === +props.binding.quantity ? 'bg-green-400' : +cut === 0 ? 'bg-transparent' : cut === undefined ? 'bg-transparent' : +cut > +props.binding.quantity ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="cut" type="number" placeholder="Išpjauti" />

            <NuxtImg width="20" height="20" v-if="!isSavedCut" src="/icons/checked.svg" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('cut')"
                class="hover:cursor-pointer  hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6 " />

        </div>
        <div class="element flex"
            :class="+done === +props.binding.quantity ? 'bg-green-400' : +done === 0 ? 'bg-transparent' : done === undefined ? 'bg-transparent' : +done > +props.binding.quantity ? 'bg-red-full' : 'bg-orange-500'">
            <input v-model="done" type="number" placeholder="Pagaminti" />
            <NuxtImg width="20" height="20" v-if="!isSavedDone" src="/icons/checked.svg" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('done')"
                class="hover:cursor-pointer hover:bg-pink-500 rounded-md w-full max-w-6 max-h-6" />
        </div>
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
    text-align: center;
}
</style>