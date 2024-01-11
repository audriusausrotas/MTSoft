<script setup lang="ts">
import { verticals } from '~/data/selectFieldData';
const props = defineProps(['index']);
const useProject = useProjectStore();



const isDouble = ref<boolean>(
  verticals.includes(useProject.fences[props.index].type)
);

watch(
  () => useProject.fences[props.index].type,
  (newType) => {
    isDouble.value = verticals.includes(newType);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 xl:justify-normal">
    <BaseCheckField v-if="isDouble" label="Dvipusė" @onChange="(value: boolean) =>
      useProject.updateMeasureTwoSided({ index: props.index, value })
      " />

    <BaseCheckField label="montavimas" name="montavimas" :checked="useProject.fences[props.index].montavimas" :onChange="(e: boolean) =>
      useProject.updateMontavimas({
        value: e,
        index: props.index,
      })
      " />

    <BaseCheckField label="borteliai" name="borteliai" :checked="useProject.fences[props.index].borteliai" :onChange="(e: boolean) =>
      useProject.updateBorteliai({
        value: e,
        index: props.index,
      })
      " />

    <BaseCheckField label="stulpai" name="stulpai" :checked="useProject.fences[props.index].stulpai" :onChange="(e: boolean) =>
      useProject.updateStulpai({
        value: e,
        index: props.index,
      })
      " />

    <BaseCheckField label="tik montavimas" name="tik montavimas" :checked="useProject.fences[props.index].tikMontavimas"
      :onChange="(e: boolean) =>
        useProject.updateTikMontavimas({
          value: e,
          index: props.index,
        })
        " />
  </div>
</template>
<style scoped></style>
