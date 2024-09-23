// calendar.js
export function getCalendarRange() {
  const today = new Date();

  // Get the date for 2 weeks ago
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  // Get the date for 1 month ahead
  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(today.getMonth() + 1);

  // Generate dates between twoWeeksAgo and oneMonthAhead
  const dates = [];
  let currentDate = new Date(twoWeeksAgo);

  while (currentDate <= oneMonthAhead) {
    dates.push(new Date(currentDate)); // Push a copy of the current date
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
  }

  return dates;
}
