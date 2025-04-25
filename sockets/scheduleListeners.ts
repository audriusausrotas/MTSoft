import { Socket } from "socket.io-client";

export default function scheduleListeners(socket: Socket) {
  const scheduleStore = useScheduleStore();

  socket.on("newSchedule", (schedule) => {
    scheduleStore.addSchedule(schedule);
  });

  socket.on("updateSchedule", (schedule) => {
    scheduleStore.updateSchedule(schedule);
  });

  socket.on("deleteSchedule", ({ date, worker }) => {
    scheduleStore.deleteSchedule(date, worker);
  });
}
