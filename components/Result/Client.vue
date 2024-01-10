<script setup lang="ts">
const props = defineProps(['name', 'value']);
</script>
 
<template>
    <div class="flex items-center">
        <div class="w-40 p-3 capitalize border-r bg-gray-ultra-light">{{ props.name }}</div>
        <div class="flex-1 px-4 min-w-fit">{{ props.value }}</div>
    </div>
</template>
