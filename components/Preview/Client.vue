<script setup lang="ts">
const props = defineProps(["client"]);
</script>
<template>
  <div class="flex flex-wrap overflow-hidden border rounded-lg">
    <div class="flex-1">
      <ResultClient
        name="klientas"
        :value="props.client.username"
        class="capitalize border-b"
      />
      <ResultClient name="telefono numeris" :value="props.client.phone" />
    </div>
    <div class="flex-1">
      <ResultClient
        name="adresas"
        :value="props.client.address"
        class="capitalize border-b"
      />
      <ResultClient name="elektroninis paštas" :value="props.client.email" />
    </div>
  </div>
</template>
<style scoped></style>
