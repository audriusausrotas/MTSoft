<script setup lang="ts">
const props = defineProps(["date"]);

const useUser = useUserStore();
const workers = computed(() =>
  useUser.users.filter((worker) => worker.accountType === "Montavimas")
);

function formatMonthDay(date: Date) {
  return date.toLocaleDateString("lt-LT", { month: "long", day: "numeric" });
}

function formatWeekday(date: Date) {
  return date.toLocaleDateString("lt-LT", { weekday: "long" });
}

function isToday(date: Date) {
  const today = new Date();
  return today.toDateString() === date.toDateString();
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}
</script>

<template>
  <div
    :class="[
      isToday(props.date) ? 'bg-green-400' : isWeekend(props.date) ? 'bg-red-300' : 'bg-stone-100',
      'p-2 border rounded-md  border-stone-500 ',
    ]"
  >
    <div>{{ formatMonthDay(props.date) }} {{ formatWeekday(props.date) }}</div>
  </div>

  <div
    :class="[
      'p-1 border border-stone-500 rounded-md h-14',
      isToday(props.date) ? 'bg-green-400' : isWeekend(props.date) ? 'bg-red-300' : 'bg-stone-100',
    ]"
    v-for="worker in workers"
    :key="worker._id"
  >
    <span>{{ worker.lastName }}</span>
  </div>
</template>

<style scoped></style>
