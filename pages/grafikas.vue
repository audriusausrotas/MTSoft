<script setup lang="ts">
const userStore = useUserStore();
const scheduleStore = useScheduleStore();

const calendarDates = ref<Date[]>([]);
const workers = computed(() =>
  userStore.users.filter((worker) => {
    if (
      userStore.user?.accountType === "Administratorius" ||
      userStore.user?.accountType === "Sandėlys" ||
      userStore.user?.accountType === "Vadybininkas"
    ) {
      return worker.accountType === "Gamyba" || worker.accountType === "Montavimas";
    } else {
      return worker._id === userStore.user?._id;
    }
  }),
);

const datesToDisplay = () => {
  calendarDates.value = getCalendarRange();
  if (scheduleStore.selectedToday) {
    calendarDates.value = calendarDates.value.filter((date) => {
      const today = new Date();
      return today.toDateString() === new Date(date).toDateString();
    });
  }
  setTimeout(() => {
    scrollToToday();
  }, 500);
};

onMounted(() => {
  datesToDisplay();
});

const scrollToToday = () => {
  const todayIndex = calendarDates.value.findIndex((date) => {
    const today = new Date();
    return today.toDateString() === new Date(date).toDateString();
  });

  if (todayIndex !== -1) {
    const scrollableContainer = document.querySelector(".overflow-y-auto");

    const todayElement = document.querySelectorAll(".calendar-item")[todayIndex];

    if (todayElement && scrollableContainer) {
      const rect = todayElement.getBoundingClientRect();
      const containerRect = scrollableContainer.getBoundingClientRect();
      const alt = userStore.user?.accountType === "Montavimas" ? 0 : 44;
      const y = rect.top - containerRect.top + scrollableContainer.scrollTop - alt;

      scrollableContainer.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }
};

watch(
  () => scheduleStore.selectedToday,
  () => {
    datesToDisplay();
  },
);
</script>

<template>
  <div class="overflow-y-auto h-[85dvh] w-full lg:pr-8">
    <div class="flex flex-col divide-y-2 gap-2 divide-black border-2 border-t-0 border-black">
      <div
        v-if="
          userStore.user?.accountType === 'Administratorius' ||
          userStore.user?.accountType === 'Sandėlys' ||
          userStore.user?.accountType === 'Vadybininkas'
        "
        class="flex sticky top-0 left-0 z-40 text-white divide-x-2 divide-black overflow-hidden border-t-2 border-black"
      >
        <p class="p-2 w-32 bg-red-600 flex justify-center capitalize">data</p>
        <p
          v-for="worker in workers"
          :key="worker._id"
          class="flex-1 flex items-center bg-red-600 justify-center"
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
