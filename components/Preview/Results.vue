<script setup lang="ts">
import { verticals } from "~/data/selectFieldData";
const props = defineProps(["data"]);
</script>

<template>
  <div
    v-for="(result, index) in props.data"
    :key="result.id"
    class="flex gap-4"
  >
    <p>{{ index + 1 }}</p>
    <div class="flex gap-4">
      <p>{{ result?.type }}</p>
      <p v-if="result.height">{{ result.height }}</p>
      <p
        v-if="
          verticals.includes(result?.type) && result?.direction === 'Vertikali'
        "
      >
        {{ result.space }}
      </p>
      <p v-if="result?.seeThrough">{{ result.seeThrough }}</p>
    </div>

    <p>{{ result?.color }}</p>
    <p>{{ result?.quantity }}</p>
    <p>{{ result?.price }}</p>
    <p>{{ result?.cost }}</p>
    <p>{{ result?.totalPrice }}</p>
    <p>{{ result?.totalCost }}</p>
    <p>{{ result?.profit }}</p>
    <p>{{ result?.margin }} %</p>
  </div>
</template>
<style scoped></style>
