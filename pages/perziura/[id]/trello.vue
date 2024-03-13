<script setup lang="ts">
definePageMeta({
  layout: "preview",
});
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-evenly flex-wrap gap-3">
      <h3 class="text-xl font-semibold">
        Pasiūlymo Nr.: {{ offer?.orderNumber }}
      </h3>
      <div class="flex gap-4 justify-center flex-wrap">
        <BaseInput
          :disable="true"
          :name="offer?.client?.username"
          label="klientas"
        />
        <BaseInput
          :disable="true"
          :name="offer?.client?.address"
          label="adresas"
        />

        <a :href="'tel:' + offer?.client?.phone">
          <BaseInput
            :disable="true"
            :name="offer?.client?.phone"
            label="telefono numeris"
            class="pointer-events-none"
          />
        </a>
        <a :href="'mailto:' + offer?.client?.email">
          <BaseInput
            :disable="true"
            :name="offer?.client?.email"
            label="elektroninis pastas"
            class="pointer-events-none"
          />
        </a>
      </div>
    </div>

    <div class="text-2xl font-semibold text-black text-center">Medžiagos</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-10 px-2 py-2 flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
      </div>
      <div class="border-dark-full">
        <OfferResult
          v-for="(result, index) in offer?.results"
          :key="result.id"
          :result="result"
          :index="index"
          :hidePrices="true"
        />
      </div>
    </div>
    <div class="text-2xl font-semibold text-black text-center">Darbai</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-10 px-2 py-2 flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
      </div>
      <div class="print:border-b border-dark-full">
        <OfferWork
          v-for="(work, index) in offer?.works"
          :key="work.id"
          :work="work"
          :index="index"
          :hidePrices="true"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
