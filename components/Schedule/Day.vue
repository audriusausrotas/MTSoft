<script setup lang="ts">
const props = defineProps(["date", "workers"]);

const formatMonthDay = (date: Date) => {
  return date.toLocaleDateString("lt-LT", { month: "long", day: "numeric" });
};

const formatWeekday = (date: Date) => {
  return date.toLocaleDateString("lt-LT", { weekday: "long" });
};

const isToday = (date: Date) => {
  const today = new Date();
  return today.toDateString() === date.toDateString();
};

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
</script>

<template>
  <div class="text-center flex gap-1 calendar-item relative">
    <div
      :class="[
        isToday(props.date)
          ? 'bg-green-400'
          : isWeekend(props.date)
          ? 'bg-red-300'
          : 'bg-gray-600 text-white',
        'p-2 border rounded-md  border-stone-500 w-32 h-24 flex flex-col justify-center capitalize',
      ]"
    >
      <p>{{ formatMonthDay(props.date) }}</p>
      <p>{{ formatWeekday(props.date) }}</p>
    </div>

    <ScheduleDayWorker
      v-for="worker in props.workers"
      :key="worker._id"
      :worker="worker"
      :date="props.date"
      :isToday="isToday"
      :isWeekend="isWeekend"
    />
  </div>
</template>

<style scoped></style>
