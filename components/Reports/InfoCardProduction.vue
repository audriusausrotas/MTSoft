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
  target: {
    type: Number,
    default: 0,
  },
  sign: {
    type: String,
    default: "vnt",
  },
});

const targetPercentage = computed(() => {
  if (props.target <= 0) return 0;
  const result = (props.data / props.target) * 100;
  return result > 100 ? 100 : result;
});

const progressWidth = computed(() => {
  return `${Math.min(targetPercentage.value, 100)}%`;
});
</script>

<template>
  <div
    class="flex flex-col bg-gray-50 justify-between border rounded-lg p-4 max-w-[340px] w-full h-60 gap-2 shadow-lg"
  >
    <div class="flex justify-between items-center gap-2">
      <div class="flex items-center gap-2">
        <div
          class="bg-white rounded-lg w-8 h-8 border border-dark-ultralight p-1.5"
        >
          <img :src="`/icons/${icon}.svg`" alt="icon" />
        </div>
        <div class="font-medium">{{ name }}</div>
      </div>

      <div
        class="flex items-center gap-1 px-2 rounded-xl text-sm font-medium"
        :class="[
          targetPercentage < 100
            ? 'bg-amber-100 text-amber-700'
            : 'bg-green-100 text-green-600',
        ]"
      >
        <div
          class="w-3 h-3 rounded-full"
          :class="[targetPercentage < 100 ? ' bg-yellow-400' : ' bg-green-500']"
        ></div>
        {{ targetPercentage < 100 ? "atsilieka" : "norma" }}
      </div>
    </div>

    <div class="font-bold text-3xl">{{ data.toFixed(0) }} {{ sign }}</div>
    <div
      class="flex gap-2 bg-white border-dark-light border px-2 py-1 rounded-md font-medium text-xs"
    >
      <div class="w-4 h-4">
        <img src="/icons/target.svg" alt="icon" />
      </div>
      <span class="text-gray-400">{{ "Tikslas:" }}</span
      >{{ target }} {{ sign }}
    </div>

    <div
      class="text-lg font-bold"
      :class="targetPercentage < 100 ? 'text-amber-600' : 'text-green-500'"
    >
      {{ targetPercentage.toFixed(2) }}%
    </div>
    <div class="h-2 rounded-full w-full border bg-white overflow-hidden">
      <div
        :class="[
          targetPercentage < 100 ? 'bg-amber-600' : 'bg-green-500',
          'h-full rounded-full',
        ]"
        :style="{ width: progressWidth }"
      ></div>
    </div>
    <div
      class="flex justify-between text-xs text-gray-400 border-t-2 border-dotted pt-1"
    >
      <div>{{ "Liko iki tikslo" }}</div>
      <div>
        {{ target - data < 0 ? 0 : (target - data).toFixed(2) }} {{ sign }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
