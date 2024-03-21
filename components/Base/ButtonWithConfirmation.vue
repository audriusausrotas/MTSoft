<script setup lang='ts'>
const props = defineProps(["name", "isLoading"]);
const emit = defineEmits(["onConfirm"]);
const open = ref<Boolean>(false);

const buttonHandler = () => {
    emit('onConfirm');
    open.value = false
};
</script>

<template>
    <BaseButton v-if="!open" :name="props.name" width="w-60" @click="open = true" :isLoading="props.isLoading" />
    <div v-else class="w-60 text-white  rounded-lg  flex overflow-hidden  justify-between">
        <button class="bg-dark-full py-2 px-4 flex-1 hover:bg-red-full" @click="buttonHandler">Patvirtinti
        </button>
        <div class="border border-red-full"></div>
        <button class="bg-dark-full py-2 px-4 flex-1  hover:bg-red-full" @click="open = false">Atšaukti</button>
    </div>
</template>
<style scoped></style>