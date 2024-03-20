<script setup lang="ts">
definePageMeta({
  layout: "preview",
});

const route = useRoute();
const useProjects = useProjectsStore();
const offer = useProjects.projects.find((item) => item._id === route.params.id);
const isLoading = ref<boolean>(false);
const pdfSection = ref<HTMLElement | null>(null);

const downloadAsPDF = async () => {
  isLoading.value = true;

  window.print();

  // const content = pdfSection.value;
  // const address = offer!.client.address;
  // const contentWidth = content!.offsetWidth / 3.5;
  // const contentHeight = content!.offsetHeight / 3.5;

  // if (process.client) {
  //   //@ts-ignore
  //   import("html2pdf.js").then((html2pdf) => {
  //     const options = {
  //       margin: 10,
  //       filename: address + ".pdf",
  //       jsPDF: {
  //         unit: "mm",
  //         format: [contentWidth, contentHeight],
  //         orientation: "portrait",
  //       },
  //     };

  //     html2pdf.default(content, options);
  //   });
  // }
  isLoading.value = false;
};
</script>

<template>
  <BaseButton name="atsisiūsti PDF" @click="downloadAsPDF" width="w-56 sm:w-96" :isLoading="isLoading"
    class="print:hidden" />
  <div class="flex flex-col gap-8" ref="pdfSection">
    <PreviewClient :offer="offer" />
    <previewTrello :offer="offer" :hidePrices="true" />
  </div>
</template>
<style scoped></style>
