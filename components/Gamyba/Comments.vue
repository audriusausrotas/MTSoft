<script setup lang='ts'>
const props = defineProps(["id", "comment"])
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const date = new Date(props.comment.date);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");

const deleteHandler = async () => {

    const response: any = await $fetch(
        "/api/gamybaComment",
        {
            method: "delete",
            body: { _id: props.id, comment: props.comment },
        }
    );
    if (response.success) {
        useGamyba.addComment(props.id, response.data);
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

</script>

<template>
    <div class="flex gap-2 border-b items-center">
        <div class="text-sm ">
            {{ `${year}-${month}-${day} ${hours}:${minutes}` }}

        </div>
        <div class="font-semibold text-red-500">
            {{ props.comment.creator }}
        </div>
        <div class="flex-1">
            {{ props.comment.comment }}
        </div>
        <div @click="deleteHandler" class=" hover:cursor-pointer hover:bg-red-200 rounded-md p-1">
            <NuxtImg src="/icons/delete.svg" width="18" height="18" decoding="auto" :ismap="true" loading="lazy" />
        </div>
    </div>
</template>
<style scoped></style>