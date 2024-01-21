<script setup lang="ts">
const props = defineProps(["index"]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <CalcFenceSelets :index="props.index" />
    <CalcFenceMeasures :index="props.index" />
  </div>
</template>
