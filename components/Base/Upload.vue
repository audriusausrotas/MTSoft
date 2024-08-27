<script setup lang='ts'>
const emit = defineEmits(["onSuccess"]);
const cloudConfig = useRuntimeConfig();
const config = {
    cloud: {
        apiKey: cloudConfig.public.cloudApiKey,
        cloudName: cloudConfig.public.cloudName
    },
}

const photosHandler = async (result: any) => {
    const url = result.info.secure_url
    const id = result.info.public_id

    emit("onSuccess", { url, id });
}

</script>

<template>
    <CldUploadWidget v-slot="{ open }" signatureEndpoint="/api/cloudinarySignature" :config="config"
        uploadPreset="defaultSigned" @success="photosHandler">
        <BaseButton @click="open">Įkelti
            nuotrauką</BaseButton>
    </CldUploadWidget>
</template>
<style scoped></style>