import { Socket } from "socket.io-client";
import archiveListeners from "./archiveListeners";
import clientListeners from "./clientListeners";
import gateListeners from "./gateListeners";
import InstallationListeners from "./installationListeners";
import potentialClientListeners from "./potentialClientListeners";
import productionListeners from "./productionListeners";
import projectListeners from "./projectListeners";
import scheduleListeners from "./scheduleListeners";
import settingsListeners from "./settingsListeners";
import userListeners from "./userListeners";
import productListeners from "./productListeners";
import SupplierListeners from "./supplierListeners";

export default (socket: Socket) => {
  archiveListeners(socket);
  clientListeners(socket);
  gateListeners(socket);
  InstallationListeners(socket);
  potentialClientListeners(socket);
  productionListeners(socket);
  productListeners(socket);
  projectListeners(socket);
  scheduleListeners(socket);
  settingsListeners(socket);
  userListeners(socket);
  SupplierListeners(socket);
};
