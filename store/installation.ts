import type { Installation, Comment } from "~/data/interfaces";

export const useInstallationStore = defineStore("installation", {
  state: () => ({
    installation: [] as Installation[],
  }),

  actions: {
    addAll(data: Installation[]) {
      this.installation = [...data];
    },

    addOne(data: Installation) {
      this.installation.push(data);
    },

    addInstallation(data: Installation) {
      this.installation.push(data);
    },

    deleteInstallationOrder(id: string) {
      this.installation = this.installation.filter((item) => item._id !== id);
    },

    deleteInstallationWorker(id: string, worker: string) {
      this.installation = this.installation.map((installation) => {
        if (installation._id === id) {
          installation.workers = installation.workers.filter((item) => item !== worker);
          return installation;
        } else return installation;
      });
    },

    updatePartsDelivered(_id: string, measureIndex: number, value: boolean) {
      this.installation = this.installation.map((item) => {
        if (item._id === _id) {
          item.results[measureIndex].delivered = value;
          return item;
        } else return item;
      });
    },

    updatePostone(_id: string, index: number, measureIndex: number, value: boolean) {
      this.installation = this.installation.map((item) => {
        if (item._id === _id) {
          item.fences[index].measures[measureIndex].postone = value;
          return item;
        } else return item;
      });
    },

    updateDone(_id: string, index: number, measureIndex: number, value: boolean) {
      this.installation = this.installation.map((item) => {
        if (item._id === _id) {
          item.fences[index].measures[measureIndex].done = value;
          return item;
        } else return item;
      });
    },

    updateStatus(_id: string, status: string) {
      this.installation = this.installation.map((item) =>
        item._id === _id ? { ...item, status } : item
      );
    },

    addComment(_id: string, comment: Comment): void {
      this.installation = this.installation.map((item) => {
        if (item._id === _id) {
          item.comments.unshift(comment);
          return item;
        } else return item;
      });
    },
    deleteComments(_id: string, comment: Comment): void {
      this.installation = this.installation.map((item) => {
        if (item._id === _id) {
          item.comments.unshift(comment);
          return item;
        } else return item;
      });
    },

    updatePhoto(id: string, photo: string[]) {
      this.installation = this.installation.map((item) => {
        if (item._id === id) {
          item.files = [...photo];
          return item;
        } else return item;
      });
    },
  },
});
