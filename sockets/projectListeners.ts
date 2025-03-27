import { Socket } from "socket.io-client";

export default function projectListeners(socket: Socket) {
  const useProject = useProjectsStore();

  socket.on("deleteProject", ({ _id }) => {
    useProject.deleteProject(_id);
  });

  socket.on("changeProjectStatus", ({ _id, status }) => {
    useProject.updateProjectField(_id, "status", status);
  });

  socket.on("deleteProjectVersion", ({ _id, projectId }) => {
    useProject.deleteVersion(_id, projectId);
  });

  socket.on("updateProjectAdvance", ({ _id, value }) => {
    useProject.updateProjectField(_id, "advance", value);
  });
  socket.on("updateProjectManager", ({ _id, user }) => {
    useProject.updateProjectField(_id, "creator", user);
  });
  socket.on("updateProjectExparationDate", ({ _id, dateExparation }) => {
    useProject.updateProjectField(_id, "dateExparation", dateExparation);
  });
  socket.on("updateProjectAddFiles", ({ _id, files }) => {
    useProject.updateProjectField(_id, "files", files);
  });

  socket.on("updateProjectAddFiles", () => {
    // get _id and files as an array i think
  });
  socket.on("finishProject", () => {
    // get _id , need to handle everything in store like delete project and add to archive
  });

  socket.on("updateProject", () => {
    // get project
  });
  socket.on("newProject", () => {
    // get project
  });
  socket.on("newProjectComment", () => {
    // get id and comment
  });
  socket.on("deleteProjectComment", () => {
    // get get id and comment
  });

  socket.on("uploadFilesProject", () => {
    // get _id and files as an array with links need to replace in store
  });
  socket.on("deleteFilesProject", () => {
    // get _id and files as an array with links need to replace in store
  });
}
