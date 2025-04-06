<script setup lang="ts">
const route = useRoute();
const showButtons = ref<boolean>(true);
const text = ref<string>("Ar tikrai norite atsisakyti mūsų pasiūlymų");
const usePotentialClients = usePotentialClientsStore();

const cancelHandler = async () => {
  const response: any = await request.delete(`deleteClient/${route.params.id}`);

  if (response.success) {
    !useSocketStore().connected &&
      usePotentialClients.deletePotentialClient(route.params.id.toString());
    text.value = "Prenumerata nutraukta. Linkime gražios dienos";
    showButtons.value = false;
  } else {
    text.value = "Įvyko klaida. Bandykite dar kartą, arba susisiekite su mūsų administratoriumi";
  }
};

const quitHandler = () => {
  text.value = "Nuostabu! 😄 Lauksime jūsų užsakymų";
  showButtons.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="text-3xl font-semibold">
      <p>{{ text }}</p>
    </div>
    <div v-if="showButtons" class="flex gap-4">
      <BaseButton @click="cancelHandler">Taip</BaseButton>
      <BaseButton @click="quitHandler">Ne</BaseButton>
    </div>
  </div>
</template>
<style scoped></style>
