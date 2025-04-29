<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();

const offer: any = await request.get(`getArchive/${route.params.id}`);

const open = ref<boolean>(true);
</script>

<template>
  <div class="m-auto my-10 w-full max-w-[1470px]">
    <div
      class="flex border flex-wrap rounded-lg text-center divide-x overflow-hidden font-medium text-lg"
    >
      <div
        class="flex-1 flex items-center justify-center hover:bg-red-600 h-10 hover:cursor-pointer hover:text-white"
        :class="open ? 'bg-red-600 text-white' : ''"
        @click="open = true"
      >
        Pasiulymas
      </div>
      <div
        class="flex-1 flex items-center justify-center hover:bg-red-600 h-10 hover:cursor-pointer hover:text-white"
        :class="open ? '' : 'bg-red-600 text-white'"
        @click="open = false"
      >
        Tvoros informacija
      </div>
    </div>

    <div>
      <OfferMain v-if="open" :offer="offer.data" />
      <div v-else class="flex gap-8 py-10 justify-evenly flex-wrap">
        <PreviewMeasures
          v-for="(fence, index) in offer.data?.fenceMeasures"
          :key="fence.id"
          :fence="fence"
          :index="index"
          :showFull="true"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
