export function getCalendarRange() {
  const today = new Date();

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(today.getMonth() + 1);

  const dates = [];
  let currentDate = new Date(twoWeeksAgo);

  while (currentDate <= oneMonthAhead) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
