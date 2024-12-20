<script setup lang="ts">
const useGates = useGateStore();
const useUser = useUserStore();

const filteredGates = computed(() => {
  if (useUser.user!.accountType === "Administratorius") {
    return useGates.filteredGates;
  } else {
    return useGates.filteredGates.filter(
      (item) => item.manager === useUser.user?.email
    );
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseInput
      placeholder="Paieška"
      width="flex-1"
      variant="light"
      @onChange="(value: string): void => useGates.searchGates(value)"
    >
      <NuxtImg
        src="/icons/search.svg"
        width="14"
        height="14"
        alt="search icon"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
    </BaseInput>
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
