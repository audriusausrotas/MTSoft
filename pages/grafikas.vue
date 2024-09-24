<script setup lang="ts">
const calendarDates = ref<Date[]>([]);

onMounted(() => {
  calendarDates.value = getCalendarRange();

  setTimeout(() => {
    scrollToToday();
  }, 100);
});

function scrollToToday() {
  const todayIndex = calendarDates.value.findIndex((date) => {
    const today = new Date();
    return today.toDateString() === new Date(date).toDateString();
  });

  if (todayIndex !== -1) {
    const todayElement = document.querySelectorAll(".calendar-item")[todayIndex];
    if (todayElement) {
      todayElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }
}
</script>

<template>
  <div>
    <div class="overflow-x-auto flex-nowrap">
      <div class="flex gap-2">
        <div
          v-for="date in calendarDates"
          :key="date.toString()"
          class="min-w-32 text-center flex flex-col gap-1 rounded-md bg-stone-100 calendar-item"
        >
          <ScheduleDay :date="date" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
