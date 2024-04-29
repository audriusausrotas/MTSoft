<script setup lang='ts'>
import { v4 } from 'uuid';
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()
const useUser = useUserStore()
const route = useRoute();
const order: any = computed(() => {
    return useGamyba.gamybaList.find((item) => item._id === route.params.id)
});
const newComment = ref<string>("")


console.log(order)

const confirmHandler = async () => {
    const response: any = await $fetch(
        "/api/gamyba",
        {
            method: "DELETE",
            body: { _id: order!.value._id, completed: true },
        }
    );
    if (response.success) {
        useGamyba.deleteGamybaOrder(order!.value._id);
        setIsError(false);
        setError(response.message);
        navigateTo("/gamyba")
    } else {
        setError(response.message);
    }
}

const commentHandler = async () => {
    const response: any = await $fetch(
        "/api/gamybaComment",
        {
            method: "post",
            body: { _id: order?.value._id, comment: newComment.value, username: useUser.user?.username },
        }
    );
    if (response.success) {
        useGamyba.addComment(order!.value._id, response.data);
        setIsError(false);
        setError(response.message);
        newComment.value = ""
    } else {
        setError(response.message);
    }
}

</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex gap-4 items-center">
            <BaseInfoField :name="order?.orderNumber" width="w-24" />
            <BaseInfoField :name="order?.client.address" width="w-96" />
            <BaseInfoField :name="order?.creator.username" width="w-24" />
            <BaseButtonWithConfirmation name="užsakymas pagamintas" @onConfirm="confirmHandler" />
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">

                <div class="flex gap-4 items-end">
                    <BaseInput label="Naujas komentaras" class="flex-1" width="w-full" variant="light"
                        :name="newComment" @onChange="(value: string) => newComment = value" />
                    <BaseButton name="Issaugoti komentara" @click="commentHandler" />
                </div>
                <GamybaComments v-for="comment, index in order?.aditional" :key="v4()" :comment="comment"
                    :id="order?._id" />
            </div>
        </div>
        <GamybaFence v-for="fence, index in order?.fences" :key="fence.id" :fence="fence" :index="index" />
        <GamybaBindings v-for="binding, index in order?.bindings" :key="binding.id" />
    </div>
</template>
<style scoped></style>