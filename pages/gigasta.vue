<script setup lang="ts">
const useGates = useGateStore();
// const useUser = useUserStore()

// const filteredGates = computed(() => {
//   if (useUser.user!.accountType === "Administratorius") {
//     return useGates.gates.gigasta;
//   } else {
//     return useGates.gates.gigasta.filter(item => item.manager === useUser.user?.email);
//   }
// });
</script>

<template>
  <GatesMain provider="Gigasta" :gates="useGates.gates.gigasta" />
</template>
<style scoped></style>