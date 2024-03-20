<script setup lang="ts">
const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);
const isLoading = ref<boolean>(false);
const pdfSection = ref<HTMLElement | null>(null);

const downloadAsPDF = async () => {
  isLoading.value = true;
  const content = pdfSection.value;
  const address = offer!.client.address;
  const contentWidth = content!.offsetWidth / 3.5;
  const contentHeight = content!.offsetHeight / 3.5;

  if (process.client) {
    //@ts-ignore
    import("html2pdf.js").then((html2pdf) => {
      const options = {
        margin: 10,
        filename: address + ".pdf",
        jsPDF: {
          unit: "mm",
          format: [contentWidth, contentHeight],
          orientation: "portrait",
        },
      };

      html2pdf.default(content, options);
    });
  }
  isLoading.value = false;
};
</script>

<template>
  <BaseButton name="atsisiūsti PDF" @click="downloadAsPDF" width="w-56 sm:w-96" :isLoading="isLoading" />
  <div class="flex flex-col gap-8" ref="pdfSection">
    <PreviewClient :offer="offer" />

    <div class="text-2xl font-semibold text-black text-center">Medžiagos</div>
    <div class="flex flex-col">
      <div class="border-y border-black font-semibold gap-10 px-2 py-2 flex">
        <div class="w-6 text-center">Nr</div>
        <div class="flex-1">Pavadinimas</div>
        <div class="w-20">Kiekis</div>
      </div>
      <div class="border-dark-full">
        <OfferResult v-for="(result, index) in offer?.results" :key="result.id" :result="result" :index="index"
          :hidePrices="true" />
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
        <OfferWork v-for="(work, index) in offer?.works" :key="work.id" :work="work" :index="index"
          :hidePrices="true" />
      </div>
    </div>
    <div class="flex-col gap-8">
      <PreviewGamybai v-for="(fence, index) in offer?.fenceMeasures" :key="fence.id" :fence="fence" :index="index"
        :showFull="true" />
    </div>
  </div>
</template>
<style scoped></style>
