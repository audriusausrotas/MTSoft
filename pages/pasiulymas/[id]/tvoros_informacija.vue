<script setup lang="ts">
definePageMeta({
  layout: "order",
});
const offer = useOfferStore().offer;
</script>

<template>
  <div class="flex gap-8 py-10 justify-evenly flex-wrap">
    <PreviewMeasures
      v-for="(fence, index) in offer?.fenceMeasures"
      :key="fence.id"
      :fence="fence"
      :index="index"
      :showFull="true"
    />
  </div>
</template>
<style scoped></style>
