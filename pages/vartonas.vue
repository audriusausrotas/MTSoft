<script setup lang="ts">
const gates = useGateStore();

</script>

<template>
  <GatesMain provider="Vartonas" :gates="gates.gates.vartonas" />
</template>
<style scoped></style>
