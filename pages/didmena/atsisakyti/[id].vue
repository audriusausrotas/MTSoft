<script setup lang="ts">
const router = useRoute();
const showButtons = ref<boolean>(true);
const text = ref<string>("Ar tikrai norite atsisakyti mūsų pasiūlymų");

const cancelHandler = async () => {
  const response: any = await $fetch("/api/potentialClients", {
    method: "delete",
    body: { _id: router.params.id },
  });

  if (response.success) {
    text.value = "Prenumerata nutraukta. Linkime gražios dienos";
    showButtons.value = false;
  } else {
    text.value =
      "Įvyko klaida. Bandykite dar kartą, arba susisiekite su mūsų administratoriumi";
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
