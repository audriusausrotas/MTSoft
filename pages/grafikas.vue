<script setup lang="ts">
const userStore = useUserStore();

const calendarDates = ref<Date[]>([]);
const workers = computed(() =>
  userStore.users.filter((worker) => {
    if (
      userStore.user?.accountType === "Administratorius" ||
      userStore.user?.accountType === "Sandėlys"
    ) {
      return (
        worker.accountType === "Gamyba" || worker.accountType === "Montavimas"
      );
    } else {
      return worker._id === userStore.user?._id;
    }
  })
);

onMounted(() => {
  calendarDates.value = getCalendarRange();

  setTimeout(() => {
    scrollToToday();
  }, 500);
});

function scrollToToday() {
  const todayIndex = calendarDates.value.findIndex((date) => {
    const today = new Date();
    return today.toDateString() === new Date(date).toDateString();
  });

  if (todayIndex !== -1) {
    const scrollableContainer = document.querySelector(".overflow-y-auto");

    const todayElement =
      document.querySelectorAll(".calendar-item")[todayIndex];

    if (todayElement && scrollableContainer) {
      const rect = todayElement.getBoundingClientRect();
      const containerRect = scrollableContainer.getBoundingClientRect();
      const alt = userStore.user?.accountType === "Montavimas" ? 0 : 44;
      const y =
        rect.top - containerRect.top + scrollableContainer.scrollTop - alt;

      scrollableContainer.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }
}
</script>

<template>
  <div class="overflow-y-auto h-[75vh] w-full px-1 lg:pr-8">
    <div class="flex flex-col gap-1">
      <div
        v-if="
          userStore.user?.accountType === 'Administratorius' ||
          userStore.user?.accountType === 'Sandėlys'
        "
        class="flex gap-1 sticky top-0 left-0 z-40 bg-white text-white"
      >
        <p
          class="p-2 border rounded-md border-stone-500 w-32 h-10 bg-red-600 flex justify-center capitalize"
        >
          data
        </p>
        <p
          v-for="worker in workers"
          :key="worker._id"
          class="border flex-1 border-stone-500 flex items-center bg-red-600 justify-center rounded-md h-10"
        >
          {{ worker.lastName || worker.username }}
        </p>
      </div>
      <ScheduleDay
        v-for="date in calendarDates"
        :key="date.toISOString()"
        :date="date"
        :workers="workers"
      />
    </div>
  </div>
</template>

<style scoped></style>
