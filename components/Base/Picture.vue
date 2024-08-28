<script setup lang='ts'>
const props = defineProps(["_id", "file", "category"])
const { setError, setIsError } = useError();

const deleteHandler = async () => {
    const response: any = await $fetch("/api/uploadPhotos", {
        method: "delete",
        body: { _id: props._id, id: props.file.id, category: props.category },
    });
    if (response.success) {
        if (props.category === "projects") {
            const useProjects = useProjectsStore();
            useProjects.deletePhoto(props._id, props.file.id);
        }
        else if ((props.category === "production")) {
            const useGamyba = useGamybaStore();
            useGamyba.deletePhoto(props._id, props.file.id);
        }
        else if ((props.category === "installation")) {
            const useMontavimas = useMontavimasStore();
            useMontavimas.deletePhoto(props._id, props.file.id);
        }

        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}
</script>

<template>
    <div class="rounded-lg overflow-hidden w-56 h-40 shadow-lg shadow-gray-full relative ">
        <NuxtImg :src="props.file.url" width="200" height="200" decoding="auto" loading="lazy" :ismap="true"
            class="w-full h-full object-center object-cover" />
        <div class="text-red-500 absolute top-0 right-0 font-bold rounded-sm p-[2px] bg-gray-light text-2xl">
            <NuxtImg src="/icons/delete.svg" width="18" height="18" decoding="auto" :ismap="true" loading="lazy"
                class="hover:cursor-pointer" @click="deleteHandler" />
        </div>
    </div>
</template>
<style scoped></style>