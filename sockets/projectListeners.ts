import { Socket } from "socket.io-client";

export default function projectListeners(socket: Socket) {
  const projectsStore = useProjectsStore();

  socket.on("deleteProject", ({ _id }) => {
    projectsStore.deleteProject(_id);
  });

  socket.on("changeProjectStatus", ({ _id, status }) => {
    projectsStore.updateProjectField(_id, "status", status);
  });

  socket.on("deleteProjectVersion", ({ _id, projectId }) => {
    projectsStore.deleteVersion(_id, projectId);
  });

  socket.on("updateProjectAdvance", ({ _id, value }) => {
    projectsStore.updateProjectField(_id, "advance", value);
    projectsStore.updateProjectField(_id, "status", "Patvirtintas");
  });

  socket.on("updateProjectManager", ({ _id, user }) => {
    projectsStore.updateProjectField(_id, "creator", user);
  });

  socket.on("updateProjectExparationDate", ({ _id, dateExparation }) => {
    projectsStore.updateProjectDates(_id, "dateExparation", dateExparation);
  });

  socket.on("updateProjectFiles", ({ _id, files }) => {
    projectsStore.updateProjectField(_id, "files", files);
  });

  socket.on("finishProject", ({ _id, data }) => {
    useArchiveStore().addArchive("archive", data);
    useProductionStore().deleteProductionOrder(_id);
    useInstallationStore().deleteInstallationOrder(_id);
    projectsStore.deleteProject(_id);
    navigateTo("/");
  });

  socket.on("updateProject", (project) => {
    projectsStore.updateProject(project);
  });

  socket.on("newProject", (project) => {
    projectsStore.addProject(project);
  });

  socket.on("newProjectComment", ({ _id, comment }) => {
    projectsStore.addComment(_id, comment);
  });
  socket.on("deleteProjectComment", ({ _id, comment }) => {
    projectsStore.deleteComment(_id, comment);
  });
}
