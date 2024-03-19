<script setup lang="ts">

definePageMeta({
  layout: "order",
});
const offer = useOfferStore().offer;
</script>

<template>
  <div>
    <PreviewGamybai v-for="(fence, index) in offer?.fenceMeasures" :key="fence.id" :fence="fence" :index="index"
      :offer="offer" :showFull="true" />
  </div>
</template>
<style scoped></style>
