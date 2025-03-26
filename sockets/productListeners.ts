import { Socket } from "socket.io-client";

export default function productListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("deleteProduct", () => {
    // get id
  });

  socket.on("newProduct", () => {
    // get product
  });

  socket.on("updateProduct", () => {
    // get product
  });
}
