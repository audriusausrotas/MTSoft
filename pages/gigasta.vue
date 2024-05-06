<script setup lang="ts">
const gates = useGateStore();

</script>

<template>
  <GatesMain provider="Gigasta" :gates="gates.gates.gigasta" />
</template>
<style scoped></style>