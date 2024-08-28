import { defineStore } from "pinia";
import type { ProjectsState, Project } from "~/data/interfaces";

export const useProjectsStore = defineStore("Projects", {
  state: (): ProjectsState => ({
    projects: [],
    archive: [],
    filteredProjects: [],
    selectedProject: null,
    selectedFilter: "Visi",
    selectedStatusFilter: "Visi",
  }),

  actions: {
    addProjects(data: any) {
      this.projects = [...data];
    },

    addProject(project: Project): void {
      let projectExist = false;
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) {
          projectExist = true;
          return project;
        } else {
          return item;
        }
      });
      if (!projectExist) {
        this.projects.unshift(project);
      }
      this.filterProjects();
    },
    deleteProject(id: String): void {
      this.projects = this.projects.filter((item) => item._id !== id);
      this.filterProjects();
    },
    deleteArchive(id: String): void {
      this.archive = this.archive.filter((item) => item._id !== id);
    },
    setSelectedProject(data: string) {
      this.selectedProject = data;
    },
    clearSelected() {
      this.selectedProject = null;
    },
    updateStatus(project: Project) {
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) return project;
        else return item;
      });
    },
    moveToArchive(data: Project) {
      this.archive.unshift(data);
      this.deleteProject(data._id);
    },

    moveToProjects(data: Project) {
      this.projects.unshift(data);
      this.deleteArchive(data._id);
    },

    addArchives(data: Project[]) {
      this.archive = [...data];
    },

    changeFilter(data: string) {
      this.selectedFilter = data;
      this.filterProjects();
    },
    changeStatusFilter(data: string) {
      this.selectedStatusFilter = data;
      this.filterProjects();
    },
    changeCreator(data: Project) {
      this.projects = this.projects.map((item) => {
        if (item._id === data._id) return data;
        else return item;
      });
      this.filterProjects();
    },

    changeAdvance(project: Project) {
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) return project;
        else return item;
      });
    },

    addPhoto(id: string, photo: { url: string; id: string }) {
      this.projects = this.projects.map((item) => {
        if (item._id === id) {
          item.files = [...item.files, photo];
          return item;
        } else return item;
      });
    },

    deletePhoto(id: string, photoID: string) {
      this.projects = this.projects.map((item) => {
        if (item._id === id) {
          item.files = item.files.filter((item) => item.id !== photoID);
          return item;
        } else return item;
      });
    },

    filterProjects() {
      if (this.selectedFilter === "Visi") {
        if (this.selectedStatusFilter === "Visi") {
          this.filteredProjects = [...this.projects];
        } else {
          const filteredByStatus = this.projects.filter(
            (item) => item.status === this.selectedStatusFilter
          );
          this.filteredProjects = [...filteredByStatus];
        }
      } else {
        if (this.selectedStatusFilter === "Visi") {
          this.filteredProjects = this.projects.filter((item) =>
            item.creator.username
              .toLowerCase()
              .startsWith(this.selectedFilter.toLowerCase())
          );
        } else {
          this.filteredProjects = this.projects.filter(
            (item) =>
              item.creator.username
                .toLowerCase()
                .startsWith(this.selectedFilter.toLowerCase()) &&
              item.status === this.selectedStatusFilter
          );
        }
      }
    },

    searchProjects(value: string) {
      if (value.length > 2) {
        const foundProjects = this.projects.filter(
          (project) =>
            project.client.address
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            project.client.email.toLowerCase().includes(value.toLowerCase()) ||
            project.client.phone.toLowerCase().includes(value.toLowerCase()) ||
            project.client.username
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            project.orderNumber.toLowerCase().includes(value.toLowerCase())
        );

        this.filteredProjects = [...foundProjects];
      } else {
        this.filterProjects();
      }
    },
  },
});
