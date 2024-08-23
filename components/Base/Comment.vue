<script setup lang='ts'>
import { v4 } from 'uuid';
const props = defineProps(["commentsArray", "id"])
const emit = defineEmits(['onSave', 'onDelete']);

const newComment = ref<string>("")

const saveHandler = (): void => {
    if (newComment.value.trim().length === 0) return
    emit('onSave', newComment.value);
    newComment.value = '';
}

const deleteHandler = (comment: string): void => {
    emit("onDelete", props.id, comment)
}

</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-4 items-end flex-wrap print:hidden">
            <BaseInput label="Naujas komentaras" class="flex-1" width="w-full" variant="light" :name="newComment"
                @onChange="(value: string) => newComment = value" />
            <BaseButton name="Issaugoti komentara" @click="saveHandler" class="md:w-60 w-full" />
        </div>
        <BaseCommentElement v-for="comment in props.commentsArray" :key="v4()" :comment="comment" :id="props.id"
            @onDelete="deleteHandler" />
    </div>
</template>
<style scoped></style>