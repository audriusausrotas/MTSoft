<script setup lang='ts'>
const props = defineProps(["data", "index"])

const length = ref(0)
const done = ref<number>(0)
</script>

<template>
    <div v-if="props.data.laiptas.exist" class="container border-b  border-black odd:bg-gray-ultra-light">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">Laiptas</p>
        <p class="element">{{ props.data.laiptas.direction }}</p>
        <p class="element">{{ props.data.laiptas.value }} cm</p>
    </div>
    <div v-else-if="props.data.kampas.exist" class="container border-b  border-black odd:bg-gray-ultra-light">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">Kampas</p>
        <p class="element">{{ props.data.kampas.value }}</p>
        <p class="element">laipsnių</p>
    </div>
    <div v-else class="container border-b border-black  odd:bg-gray-ultra-light">
        <p class="element">{{ props.index + 1 }}</p>
        <p class="element">{{ props.data.length }}</p>
        <p class="element">{{ props.data.elements }}</p>
        <input v-model="length" type="text" placeholder="Išpjauti" class="element ">
        <input v-model="done" type="text" placeholder="Pagaminti" class="element">
        <button class="element print:hidden hover:bg-red-full hover:text-white">Spausdinti</button>
    </div>
</template>
<style scoped>
.element {
    border-right: 1px solid black;
    padding: 4px 10px;
}
</style>