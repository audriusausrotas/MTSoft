<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  data: {
    type: Number,
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
});

const progressWidth = computed(() => {
  return `${(props?.percentage * 1000).toFixed(2)}%`;
});
</script>

<template>
  <div
    class="flex flex-col bg-gray-50 justify-between border rounded-lg p-4 max-w-80 w-full gap-2 shadow-lg"
  >
    <div class="flex justify-between items-center gap-2">
      <div
        class="bg-white rounded-lg w-8 h-8 border border-dark-ultralight flex items-center justify-center p-1.5"
      >
        <img :src="`/icons/${icon}.svg`" alt="icon" />
      </div>

      <div
        class="flex items-center gap-1 px-2 rounded-xl text-sm font-medium"
        :class="[percentage < 0.1 ? ' bg-green-100 text-green-600' : 'bg-red-100 text-red-600']"
      >
        <div
          class="w-3 h-3 rounded-full"
          :class="[percentage < 0.1 ? ' bg-green-500' : ' bg-red-600']"
        ></div>
        {{ percentage < 0.1 ? "norma" : "viršytas" }}
      </div>
    </div>
    <div class="text-xs text-gray-600">{{ name }}</div>
    <div class="font-bold text-3xl">{{ data?.toFixed(0) }} vnt</div>
    <div
      class="flex gap-2 bg-white border-dark-light border px-2 py-1 rounded-md font-medium text-xs"
    >
      <div class="w-4 h-4">
        <img src="/icons/target.svg" alt="icon" />
      </div>
      <span class="text-gray-400">Tikslas </span> {{ "< 0.1" }} %
    </div>
    <div class="text-lg font-bold" :class="percentage < 0.1 ? 'text-green-600' : 'text-red-600'">
      {{ percentage?.toFixed(3) }}%
    </div>

    <div class="h-2 rounded-full w-full border bg-white overflow-hidden">
      <div
        :class="[percentage < 0.1 ? 'bg-green-600' : 'bg-red-600', 'h-full rounded-full']"
        :style="{ width: progressWidth }"
      ></div>
    </div>
    <div class="flex justify-between text-xs text-gray-400 border-t-2 border-dotted pt-1">
      <div>Šiuo metu</div>
      <div>{{ percentage > 0.1 ? "Viršytas" : "stabilus" }}</div>
    </div>
  </div>
</template>

<style scoped></style>
