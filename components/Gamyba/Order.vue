<script setup lang='ts'>

const props = defineProps(["order", "index"])
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()

const deleteHandler = async (): Promise<void> => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: "DELETE",
            body: { _id: props.order._id, completed: false },
        }
    );
    if (response.success) {
        useGamyba.deleteGamybaOrder(props.order._id);
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
};

const clickHandler = () => {
    navigateTo(`/gamyba/${props.order._id}`)
}

</script>

<template>
    <div class="flex gap-4 hover:border-b-red-full border-b  pb-2 w-fit ">
        <div class="flex gap-4 hover:cursor-pointer  items-center " @click="clickHandler">
            <div class="pointer-events-none">{{ index + 1 }}</div>
            <BaseInfoField class="pointer-events-none" :name="props.order.orderNumber" width="w-24" />
            <BaseInfoField class="pointer-events-none" :name="order.client.address" width="w-96" />
            <BaseInfoField class="pointer-events-none" :name="order.creator.username" width="w-24" />
        </div>
        <div @click="deleteHandler" class=" hover:cursor-pointer hover:bg-red-200 rounded-md p-1">
            <NuxtImg src="/icons/delete.svg" width="24" height="24" decoding="auto" :ismap="true" loading="lazy" />
        </div>
    </div>
</template>
<style scoped></style>