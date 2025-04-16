import { Socket } from "socket.io-client";

export default function projectListeners(socket: Socket) {
  const useProject = useProjectsStore();
  const useArchives = useArchivesStore();

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

  socket.on("updateProjectFiles", ({ _id, files }) => {
    useProject.updateProjectField(_id, "files", files);
  });

  socket.on("finishProject", ({ _id, data }) => {
    useArchivesStore().addArchive("archive", data);
    useProductionStore().deleteProductionOrder(_id);
    useInstallationStore().deleteInstallationOrder(_id);
    useProject.deleteProject(_id);
    navigateTo("/");
  });

  socket.on("updateProject", (project) => {
    useProject.updateProject(project);
  });

  socket.on("newProject", (project) => {
    useProject.addProject(project);
  });

  socket.on("newProjectComment", ({ _id, comment }) => {
    useProject.addComment(_id, comment);
  });
  socket.on("deleteProjectComment", ({ _id, comment }) => {
    useProject.deleteComment(_id, comment);
  });
}
