import { Socket } from "socket.io-client";

export default function scheduleListeners(socket: Socket) {
  const useSchedule = useScheduleStore();

  socket.on("newSchedule", (schedule) => {
    useSchedule.addSchedule(schedule);
  });

  socket.on("updateSchedule", (schedule) => {
    useSchedule.updateSchedule(schedule);
  });

  socket.on("deleteSchedule", ({ date, worker }) => {
    useSchedule.deleteSchedule(date, worker);
  });
}
