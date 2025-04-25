import { Socket } from "socket.io-client";

export default function productListeners(socket: Socket) {
  const productsStore = useProductsStore();

  socket.on("deleteProduct", ({ _id }) => {
    productsStore.deleteProduct(_id);
  });

  socket.on("newProduct", (product) => {
    productsStore.newProduct(product);
  });

  socket.on("updateProduct", (product) => {
    productsStore.updateProduct(product);
  });
}
