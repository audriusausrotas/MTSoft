<script setup>
const props = defineProps(["index"]);
</script>

<template>
  <div class="flex flex-col gap-8">
    <CalcFenceSelets :index="props.index" />
    <CalcFenceChecks :index="props.index" class="pb-8 border-b" />
    <CalcFenceMeasures :index="props.index" />
  </div>
</template>
