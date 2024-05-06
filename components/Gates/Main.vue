<script setup lang='ts'>
const props = defineProps(["provider", "gates"])
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="(gate, index) in props.gates" :key="gate._id" class="flex flex-col border-b border-red-full">
            <GatesGateInfo :gate="gate" :index="index" :provider="props.provider" />
        </div>
    </div>
</template>
<style scoped></style>