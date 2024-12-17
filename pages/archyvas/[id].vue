<script setup lang="ts">
definePageMeta({
  layout: false,
});
const useArchive = useArchivesStore();
const offer = useArchive.projectToOpen;

const open = ref<boolean>(true);
</script>

<template>
  <div class="max-w-[1200px] m-auto my-10 w-full">
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
      <OfferMain v-if="open" :offer="offer" />
      <div v-else class="flex gap-8 py-10 justify-evenly flex-wrap">
        <PreviewMeasures
          v-for="(fence, index) in offer?.fenceMeasures"
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
