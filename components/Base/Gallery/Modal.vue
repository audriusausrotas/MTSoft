<script setup lang='ts'>
const props = defineProps(["pictures", "selectedPhoto"])
const emit = defineEmits(["close"])
const selectedPicture = ref<string>(props.selectedPhoto)

const closeHandler = () => {
    emit("close")
}

const changeHandler = (url: string) => {
    selectedPicture.value = url
}

</script>

<template>
    <Teleport to="body">
        <div
            class="fixed flex flex-col bg-black bg-opacity-60 backdrop-blur-sm gap-2 z-50 scroll select-none top-0 left-0 scroll w-full h-full p-4 ">
            <div class="absolute top-2 right-4 font-bold text-2xl hover:cursor-pointer px-1 py-1" @click="closeHandler">
                X
            </div>
            <div class="m-auto flex justify-center w-[90%] h-[90%] ">
                <div class="rounded-xl overflow-hidden">
                    <NuxtImg :src="selectedPicture" width="800" height="800" decoding="auto" loading="lazy"
                        :ismap="true" class="w-full h-full object-contain " />
                </div>
            </div>
            <div class="w-[90%] m-auto flex justify-center gap-2">
                <div v-for="picture in props.pictures" key="picture.id"
                    class="hover:cursor-pointer rounded-md overflow-hidden"
                    :class="selectedPicture === picture.url ? 'border-2 border-green-500' : ''"
                    @click="selectedPicture = picture.url">
                    <NuxtImg :src="picture?.url" width="100" height="100" decoding="auto" loading="lazy" :ismap="true"
                        class=" object-contain " />
                </div>
            </div>
        </div>
    </Teleport>
</template>
<style scoped></style>
