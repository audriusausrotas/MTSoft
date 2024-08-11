<script setup lang="ts">
const props = defineProps(["offer",])
</script>

<template>

  <div class="flex flex-col gap-8">
    <div class="text-2xl font-semibold text-black text-center">Medžiagos</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-10 px-2 py-2 flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
      </div>
      <div class="border-dark-full">
        <OfferResult v-for="(result, index) in props.offer?.results" :key="result.id" :result="result" :index="index" />
      </div>
    </div>
    <div class="text-2xl font-semibold text-black text-center ">Darbai</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-10 px-2 py-2 flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
        <div class="w-20">Kaina</div>
        <div class="w-20">Viso</div>
      </div>
      <div class="print:border-b border-dark-full">
        <OfferWork v-for="(work, index) in props.offer?.works" :key="work.id" :work="work" :index="index" />
      </div>
    </div>
    <div class="flex gap-8 justify-between flex-wrap ">
      <PreviewMeasures v-for=" (fence, index ) in props.offer?.fenceMeasures" :key="fence.id" :fence="fence"
        :index="index" :showFull="true" />
    </div>
  </div>
</template>
<style scoped></style>
