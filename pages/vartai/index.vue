<script setup lang="ts">
const gateStore = useGateStore();
const searchQuery = ref<string>("");
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-[910px]">
    <BaseInput
      placeholder="Paieška"
      width="flex-1"
      variant="light"
      @onChange="(value: string) => searchQuery = value"
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
      v-for="(gate, index) in gateStore.searchGates(searchQuery)"
      :key="gate._id"
      class="flex flex-col border-b border-red-600"
    >
      <GatesGateInfo :gate="gate" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
