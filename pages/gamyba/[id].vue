<script setup lang='ts'>
const { setError, setIsError } = useError();
const useGamyba = useGamybaStore()
const useUser = useUserStore()
const route = useRoute();
const order: any = computed(() => {
    return useGamyba.gamybaList.find((item) => item._id === route.params.id)
});

const type = ref<string>("")
const height = ref<string>("")
const quantity = ref<string>("")
const color = ref<string>("")

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

const commentHandler = async (value: string) => {
    const response: any = await $fetch(
        "/api/gamybaComment",
        {
            method: "post",
            body: { _id: order?.value._id, comment: value, username: useUser.user?.username },
        }
    );
    if (response.success) {
        useGamyba.addComment(order!.value._id, response.data);
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

const deleteHandler = async (value: string, comment: string) => {
    const response: any = await $fetch(
        "/api/gamybaComment",
        {
            method: "delete",
            body: { _id: value, comment: comment },
        }
    );

    if (response.success) {
        useGamyba.addComment(value, response.data);
        setIsError(false);
        setError(response.message);
    } else {
        setError(response.message);
    }
}

const newBindingHandler = async () => {
    const response: any = await $fetch(
        "/api/bindings",
        {
            method: 'post',
            body: { _id: order.value._id },
        }
    );

    if (response.success) {
        useGamyba.addComment(order!.value._id, response.data);
        setIsError(false);
        setError(response.message);
        type.value = ""
        height.value = ""
        quantity.value = ""
        color.value = ""

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
            <BaseButtonWithConfirmation name="užsakymas pagamintas" @onConfirm="confirmHandler" class="print:hidden" />
        </div>
        <BaseComment :commentsArray="order?.aditional" :id="order._id" @onSave="commentHandler"
            @onDelete="deleteHandler" />

        <div class="flex gap-8 flex-col">
            <GamybaFence v-for="fence, index in order?.fences" :key="fence._id" :fence="fence" :fenceIndex="index"
                :_id="order._id" />
        </div>
        <div class="flex flex-col select-none">
            <div class="text-2xl font-bold">Apkaustai

            </div>

            <div class="container container-border border-t border-black flex-1">
                <p class="element">Nr</p>
                <p class="element">tipas</p>
                <p class="element">Ilgis</p>
                <p class="element">Kiekis</p>
                <p class="element">spalva</p>
                <p class="element">Išpjauta</p>
                <p class="element">Pagaminta</p>
                <p class="element print:hidden">Veiksmai</p>
                <p class="element flex justify-center items-center print:hidden">
                </p>
            </div>
            <GamybaBindings v-for="binding, index in order.bindings" :key="binding.id" :binding="binding" :index="index"
                :_id="order._id" />
            <BaseButton name="Pridėti naują" class="mt-4" @click="newBindingHandler" />
            <!-- <div class="mt-4 text-xl font-semibold"> Pridėti naują apkaustą</div>
            <div class="border flex border-black border-r-0  w-fit print:hidden">
                <input type="text" class="element w-[387px]" v-model="type" placeholder="tipas" />
                <input type="number" class="element w-24" v-model="height" placeholder="ilgis" />
                <input type="number" class="element w-24" v-model="quantity" placeholder="kiekis" />
                <input type="text" class="element w-24" v-model="color" placeholder="spalva" />
                <button class=" element hover:bg-red-full hover:text-white w-20"
                    @click="newBindingHandler">Išsaugoti</button>
            </div> -->
        </div>
    </div>
</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 40px 200px 65px 65px 65px 90px 90px 100px 40px;
    width: fit-content
}

.container-border {
    border-left: 1px solid black;
    border-bottom: 1px solid black;

}

.element {
    border-right: 1px solid black;
    padding: 4px;
    text-align: center;
}
</style>