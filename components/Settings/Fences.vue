<script setup lang="ts">
const settingsStore = useSettingsStore();
const { setError, setSuccess } = useError();

const fences = settingsStore.fences;

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
  <BaseButtonWithInput
    name="Nauja Tvora"
    placeholder="Pavadinimas"
    @onConfirm="newFenceHandler"
  />

  <div class="flex flex-wrap gap-20 justify-around">
    <SettingsFencesElement v-for="fence in fences" :fence="fence" />
  </div>
</template>
<style scoped></style>
