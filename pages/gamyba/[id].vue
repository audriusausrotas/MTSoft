<script setup lang='ts'>
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()
const route = useRoute();

const order = useGamyba.gamybaList.find((item) => item._id === route.params.id);
console.log(order)

const confirmHandler = async () => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: "DELETE",
            body: { _id: order?._id, completed: true },
        }
    );
    if (response.success) {
        useGamyba.deleteGamybaOrder(order!._id);
        setIsError(false);
        setError(response.message);
        navigateTo("/gamyba")
    } else {
        setError(response.message);
    }
}

</script>

<template>
    <div class="flex flex-fol gap-8">
        <div class="flex gap-4 items-center">
            <BaseInfoField :name="order?.orderNumber" width="w-24" />
            <BaseInfoField :name="order?.client.address" width="w-96" />
            <BaseInfoField :name="order?.creator.username" width="w-24" />
            <BaseButtonWithConfirmation name="užsakymas pagamintas" @onConfirm="confirmHandler" />
        </div>
        <GamybaFence v-for="fence, index in order?.fences" :key="fence.id" :fence="fence" :index="index" />
        <GamybaBindings v-for="binding, index in order?.bindings" :key="binding.id" />
    </div>
</template>
<style scoped></style>