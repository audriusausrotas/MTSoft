<script setup lang="ts">
const useGates = useGateStore();
const useUser = useUserStore();

const filteredGates = computed(() => {
  if (useUser.user!.accountType === "Administratorius") {
    return useGates.gates;
  } else {
    return useGates.gates.filter((item) => item.manager === useUser.user?.email);
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(gate, index) in filteredGates"
      :key="gate._id"
      class="flex flex-col border-b border-red-600"
    >
      <GatesGateInfo :gate="gate" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
