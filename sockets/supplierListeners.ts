import { Socket } from "socket.io-client";

export default function SupplierListeners(socket: Socket) {
  const suppliersStore = useSuppliersStore();

  socket.on("deleteSupplier", ({ _id }) => {
    suppliersStore.deleteSupplier(_id);
  });

  socket.on("newSupplier", (supplier) => {
    suppliersStore.addSupplier(supplier);
  });
}
