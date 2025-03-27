import { Socket } from "socket.io-client";

export default function archiveListeners(socket: Socket) {
  const useArchive = useArchivesStore();
  const useProject = useProjectsStore();

  socket.on("archiveDeleted", ({ _id, location }) => {
    useArchive.deleteArchive(_id, location);
  });

  socket.on(
    "restoreArchive",
    ({
      _id,
      location,
    }: {
      _id: string;
      location: keyof typeof useArchive.data;
    }) => {
      const project = useArchive.data[location].find(
        (item) => item._id === _id
      );

      if (project) {
        useProject.addProject(project);
        useArchive.deleteArchive(_id, location);
      }
    }
  );

  socket.on("addArchive", (data) => {
    useArchive.addArchive("archive", data);
    useProject.deleteProject(data._id);
  });

  socket.on("addUnconfirmed", (data) => {
    useArchive.addArchive("unconfirmed", data);
    useProject.deleteProject(data._id);
  });

  // socket.on("addDeleted", (data) => {
  //   useArchive.addArchive("deleted", data);
  //   useProject.deleteProject(data._id);
  // });
}
