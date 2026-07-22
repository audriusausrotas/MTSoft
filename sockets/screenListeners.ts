import { Socket } from "socket.io-client";
import { useScreenStore } from "~/store/screen";

export default function screenListeners(socket: Socket) {
  const useScreen = useScreenStore();

  socket.on("addData", (data) => {
    useScreen.addData(data);
  });
}
