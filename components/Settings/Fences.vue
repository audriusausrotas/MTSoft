<script setup lang="ts">
const settingsStore = useSettingsStore();
const { setError, setSuccess } = useCustomError();

const newFenceHandler = async (name: string) => {
  const requestData = {
    name: name,
  };

  const response: any = await request.post("newFence", requestData);
  if (response.success) {
    !useSocketStore().connected && settingsStore.newFence(response.data);
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <BaseButtonWithInput name="Nauja Tvora" placeholder="Pavadinimas" @onConfirm="newFenceHandler" />

  <div class="flex flex-wrap gap-4 justify-around">
    <SettingsFencesElement
      v-for="(fence, index) in settingsStore.fences"
      :fence="fence"
      :index="index"
    />
  </div>
</template>
<style scoped></style>
