import type { Bindings, Production, ProductionMeasure, Comment } from "~/data/interfaces";

export const useProductionStore = defineStore("production", {
  state: () => ({
    production: [] as Production[],
  }),

  actions: {
    addAll(data: Production[]) {
      this.production = [...data];
    },

    addOne(data: Production) {
      this.production = this.production.map((item) => (item._id === data._id ? data : item));
    },

    addProduction(data: Production) {
      this.production.push(data);
    },

    addNewBinding(_id: string, binding: Bindings) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.bindings?.push(binding);
          return item;
        } else return item;
      });
    },

    addNewMeasure(_id: string, index: number, newMeasure: ProductionMeasure) {
      this.production = this.production.map((item: Production) => {
        if (item._id === _id) {
          item.fences[index].measures.push(newMeasure);
          return item;
        } else return item;
      });
    },

    deleteProductionOrder(id: string) {
      this.production = this.production.filter((item) => item._id !== id);
    },

    deleteFence(_id: string, index: number) {
      this.production = this.production.filter((item) => {
        if (item._id === _id) {
          item.fences = item.fences.filter((item, i) => i !== index);
          return item;
        } else return item;
      });
    },

    deleteBinding(_id: string, bindingId: string) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.bindings = item.bindings!.filter((binding) => binding.id !== bindingId);
          return item;
        } else return item;
      });
    },

    deleteMeasure(_id: string, index: number, measureIndex: number) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.fences[index].measures = item.fences[index].measures.filter(
            (measure, i) => i !== measureIndex
          );
          return item;
        } else return item;
      });
    },

    updateMeasure(
      _id: string,
      index: number,
      measureIndex: number | null,
      value: boolean | number | string,
      field: string,
      option: string
    ) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          option === "bindings"
            ? ((item.bindings as any)[index][field] = value)
            : ((item.fences as any)[index].measures[measureIndex!][field] = value);
        }
        return item;
      });
    },

    updateStatus(_id: string, status: string) {
      this.production = this.production.map((item) =>
        item._id === _id ? { ...item, status } : item
      );
    },

    updatePhoto(id: string, photo: string[]) {
      this.production = this.production.map((item) =>
        item._id === id ? { ...item, files: [...photo] } : item
      );
    },

    clearProduction() {
      this.production = [];
    },

    addComment(_id: string, comment: Comment): void {
      this.production = this.production.map((project) => {
        if (project._id === _id) {
          project.comments = [...project.comments, comment];
          return project;
        } else return project;
      });
    },

    deleteComment(_id: string, comment: Comment) {
      this.production = this.production.map((project) => {
        if (project._id === _id) {
          project.comments = project.comments.filter(
            (item) =>
              !(
                item.date === comment.date &&
                item.creator === comment.creator &&
                item.comment === comment.comment
              )
          );
        }
        return project;
      });
    },

    updateFiles(_id: string, files: string[]) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.files = [...files];
          return item;
        } else return item;
      });
    },
  },
});
