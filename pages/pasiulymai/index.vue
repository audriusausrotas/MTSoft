<script setup lang="ts">
const selected = ref<string>("siusti");
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div
      class="flex text-center border border-dark-light rounded-lg overflow-hidden divide-x divide-dark-light"
    >
      <div
        @click="selected = 'siusti'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-600 hover:text-white"
        :class="selected === 'siusti' ? 'bg-red-full text-white' : ''"
      >
        Siūsti
      </div>
      <!-- <div
        @click="selected = 'pasiulymas'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        :class="selected === 'pasiulymas' ? 'bg-red-full text-white' : ''"
      >
        Pasiūlymas
      </div> -->
      <div
        @click="selected = 'vartotojai'"
        class="flex-1 p-2 border-dark-light hover:cursor-pointer hover:bg-red-full hover:text-white"
        :class="selected === 'vartotojai' ? 'bg-red-full text-white' : ''"
      >
        Vartotojai
      </div>
    </div>
    <OffersSend v-if="selected === 'siusti'" />
    <!-- <OffersOffer v-else-if="selected === 'pasiulymas'" /> -->
    <OffersUsers v-else-if="selected === 'vartotojai'" />
  </div>
</template>
<style scoped></style>
