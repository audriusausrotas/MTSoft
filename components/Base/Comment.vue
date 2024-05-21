<script setup lang='ts'>
import { v4 } from 'uuid';
const props = defineProps(["commentsArray", "id"])
const emit = defineEmits(['onSave', 'onDelete']);

const newComment = ref<string>("")

const saveHandler = (): void => {
    emit('onSave', newComment.value);
    newComment.value = '';
}

const deleteHandler = (comment: string): void => {
    emit("onDelete", props.id, comment)
}


</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="flex gap-4 items-end flex-wrap">
            <BaseInput label="Naujas komentaras" class="flex-1" width="w-full" variant="light" :name="newComment"
                @onChange="(value: string) => newComment = value" />
            <BaseButton name="Issaugoti komentara" @click="saveHandler" />
        </div>
        <BaseCommentElement v-for="comment in props.commentsArray" :key="v4()" :comment="comment" :id="props.id"
            @onDelete="deleteHandler" />
    </div>
</template>
<style scoped></style>