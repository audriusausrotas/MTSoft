<script setup lang="ts">
const useGates = useGateStore();
const useUser = useUserStore()

const filteredGates = computed(() => {
  if (useUser.user!.accountType === "Administratorius") {
    return useGates.gates.vartonas;
  } else {
    return useGates.gates.vartonas.filter(item => item.manager === useUser.user?.email);
  }
});
</script>

<template>
  <GatesMain provider="Vartonas" :gates="filteredGates" />
</template>
<style scoped></style>
