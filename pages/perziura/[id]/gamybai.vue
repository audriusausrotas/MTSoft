<script setup lang="ts">
definePageMeta({
  layout: "preview",
});
const route = useRoute();
const useProjects = useProjectsStore();
const pdfSection = ref<HTMLElement | null>(null);
const offer = useProjects.projects.find((item) => item._id === route.params.id);

const downloadAsPDF = async () => {
  const content = pdfSection.value;
  const address = offer?.client.address + "gamyba";
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
};
</script>

<template>
  <div class="flex-col gap-8" ref="pdfSection">
    <PreviewClient :client="offer?.client" />
    <PreviewGamybai
      v-for="(fence, index) in offer?.fenceMeasures"
      :key="fence.id"
      :fence="fence"
      :index="index"
    />
  </div>
  <BaseButton
    name="atsisiūsti PDF"
    @click="downloadAsPDF"
    width="w-56 sm:w-96"
  />
</template>
<style scoped></style>
