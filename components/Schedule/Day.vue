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
  <div class="text-center flex relative divide-x-2 calendar-item divide-black">
    <div
      :class="[
        isToday(props.date)
          ? 'bg-green-400'
          : isWeekend(props.date)
            ? 'bg-red-300'
            : 'bg-gray-600 text-white',
        'w-32 min-h-20 flex flex-col justify-center capitalize ',
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
