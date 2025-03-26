import { Socket } from "socket.io-client";

export default function scheduleListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("newSchedule", (userId) => {
    // get schedule object
  });
  socket.on("updateSchedule", (userId) => {
    // get schedule object
  });
  socket.on("deleteSchedule", (userId) => {
    // get date and worker
  });
}
