<script setup lang='ts'>
const props = defineProps(["_id", "files", "category"])

</script>

<template>
    <div class="flex flex-wrap gap-4 justify-center ">
        <BasePicture v-for="file in props.files" :key="file.id" :file="file" :_id="props._id"
            :category="props.category" />
    </div>
</template>
<style scoped></style>