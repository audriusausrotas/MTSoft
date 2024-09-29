export function getCalendarRange() {
  const today = new Date();

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(today.getMonth() + 1);

  const dates = [];
  let currentDate = new Date(twoWeeksAgo);

  while (currentDate <= oneMonthAhead) {
    const dateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    dates.push(dateOnly);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
