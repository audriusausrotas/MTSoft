import { Socket } from "socket.io-client";

export default function productListeners(socket: Socket) {
  const useProduct = useProductsStore();

  socket.on("deleteProduct", (_id) => {
    useProduct.deleteProduct(_id);
  });

  socket.on("newProduct", (product) => {
    useProduct.newProduct(product);
  });

  socket.on("updateProduct", (product) => {
    useProduct.newProduct(product);
  });
}
