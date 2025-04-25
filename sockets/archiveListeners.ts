import { Socket } from "socket.io-client";

export default function archiveListeners(socket: Socket) {
  const archiveStore = useArchiveStore();
  const projectsStore = useProjectsStore();

  socket.on("archiveDeleted", ({ _id, location }) => {
    archiveStore.deleteArchive(_id, location);
  });

  socket.on("restoreArchive", ({ data, location }) => {
    projectsStore.addProject(data);
    archiveStore.deleteArchive(data._id, location);
  });

  socket.on("addArchive", (data) => {
    archiveStore.addArchive("archive", data);
    projectsStore.deleteProject(data._id);
  });

  socket.on("addUnconfirmed", (data) => {
    archiveStore.addArchive("unconfirmed", data);
    projectsStore.deleteProject(data._id);
  });

  socket.on("addDeleted", (data) => {
    archiveStore.addArchive("deleted", data);
    projectsStore.deleteProject(data._id);
  });
}
