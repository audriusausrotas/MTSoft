<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { getCalendarRange } from "../utils/calendar"; // Calendar logic

const calendarDates = ref([]);

onMounted(async () => {
  // Populate the calendar with dates
  calendarDates.value = getCalendarRange();

  // Wait until the DOM is fully updated before scrolling
  await nextTick();

  // Call the function to scroll to today's date
  scrollToToday();
});

function scrollToToday() {
  // Find the element with the 'today' class
  const todayElement = document.querySelector(".today");

  if (todayElement) {
    // Scroll the element into view, centered in the scroll area
    todayElement.scrollIntoView({
      behavior: "smooth", // Smooth scrolling
      inline: "center", // Center horizontally in the container
    });
  }
}

function formatMonthDay(date) {
  // Lithuanian format: "2024 m. rugsėjo 23 d."
  return date.toLocaleDateString("lt-LT", { month: "long", day: "numeric" });
}

function formatWeekday(date) {
  // Lithuanian format for weekday: "Pirmadienis" (Monday)
  return date.toLocaleDateString("lt-LT", { weekday: "long" });
}

function isToday(date) {
  const today = new Date();
  return today.toDateString() === date.toDateString();
}

function isWeekend(date) {
  // Check if the date is a weekend (Saturday or Sunday)
  const day = date.getDay();
  return day === 0 || day === 6;
}
</script>

<template>
  <div>
    <div class="calendar-container">
      <!-- Container for dates with horizontal scrolling -->
      <div class="calendar-row">
        <div
          v-for="date in calendarDates"
          :key="date"
          :class="[
            'calendar-column',
            isToday(date) ? 'highlight' : '',
            isWeekend(date) ? 'weekend' : '',
          ]"
        >
          <!-- Date Item -->
          <div :class="['calendar-item', isToday(date) ? 'today' : '']">
            <div>{{ formatMonthDay(date) }}</div>
            <div>{{ formatWeekday(date) }}</div>
          </div>
          <!-- Event rows below each date -->
          <div class="event-row" v-for="n in 3" :key="n">
            <span>Add Event {{ n }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container for the calendar row */
.calendar-container {
  overflow-x: auto; /* Horizontal scrolling */
  white-space: nowrap; /* Prevent line wrapping */
  padding: 10px;
  border: 1px solid #ddd;
}

/* Horizontal row of dates */
.calendar-row {
  display: flex; /* Horizontal layout */
  gap: 10px;
}

/* Each column contains the date and event rows */
.calendar-column {
  min-width: 120px; /* Same width for each date and its events */
  text-align: center;
}

/* Individual date item */
.calendar-item {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  border-radius: 5px;
  margin-bottom: 5px;
}

/* Highlight today's entire column */
.highlight .calendar-item,
.highlight .event-row {
  background-color: lightgreen;
  border-color: green;
}

/* Highlight weekends with a red background */
.weekend .calendar-item,
.weekend .event-row {
  background-color: #ffe5e5;
  border-color: red;
}

/* Rows for events under each date */
.event-row {
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 3px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

/* Style the Add Event placeholder */
.event-row span {
  color: #888;
  font-size: 0.9em;
}
</style>
