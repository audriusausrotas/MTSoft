<script setup lang="ts">
import type { Result, Works } from "~/data/interfaces";
const route = useRoute();
const offer = reactive<any>({});
const totalPriceParts = ref<number>(0);
const totalPriceWorks = ref<number>(0);

onMounted(async () => {
  const data: any = await $fetch("/api/order", {
    method: "post",
    body: { _id: route.params.id },
  });
  if (data.success) {
    offer.value = { ...data.data };
    offer.value.results.forEach(
      (item: Result) => (totalPriceParts.value += item.totalPrice)
    );
    offer.value.works.forEach(
      (item: Works) => (totalPriceWorks.value += item.totalPrice)
    );
    console.log(offer.value.fenceMeasures);
  }
});
</script>

<template>
  <div>
    <div></div>
    <PreviewClient :data="offer.value?.client" />
    <div class="border rounded-lg p-4">
      <PreviewResults :data="offer.value?.results" />
      <PreviewWorks :data="offer.value?.works" />
    </div>
    <PreviewFences :data="offer.value?.fenceMeasures" />
  </div>
</template>
