<script setup lang='ts'>
const props = defineProps(["data", "index"])
</script>

<template>
    <div v-if="props.data.laiptas.exist" class="flex gap-4">
        <BaseInput :name="props.index + 1" label="nr" width="w-20" :disable="true" />
        <BaseInput :name="props.data.laiptas.value" label="laiptas" width="w-20" :disable="true" />
        <BaseInput label="komentarai" width="w-full" variant="light" />
    </div>
    <div v-else-if="props.data.kampas.exist" class="flex gap-4">
        <BaseInput :name="props.index + 1" label="nr" width="w-20" :disable="true" />
        <BaseInput :name="props.data.kampas.value" label="kampas" width="w-20" :disable="true" />
        <BaseInput label="komentarai" width="w-full" variant="light" />
    </div>
    <div v-else class="flex gap-4">
        <BaseInput :name="props.index + 1" label="nr" width="w-20" :disable="true" />
        <BaseInput :name="props.data.length" label="Ilgis" width="w-20" :disable="true" />
        <BaseInput :name="props.data.elements" label="elementai" width="w-20" :disable="true" />
        <BaseInput :name="0" label="išpjauti" width="w-20" variant="light" />
        <BaseInput :name="0" label="pagaminti" width="w-20" variant="light" />
        <BaseInput label="komentarai" width="w-full" variant="light" />
    </div>
</template>
<style scoped></style>