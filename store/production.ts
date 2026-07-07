import type { Bindings, Production, ProductionMeasure, Comment } from "~/data/interfaces";

export const useProductionStore = defineStore("production", {
  state: () => ({
    production: [] as Production[],
    selectedMachine: "" as string,
    selectedHolesInfo: "" as string,
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

    selectMachine(machine: string) {
      this.selectedMachine = machine;
    },

    selectHolesInfo(holesInfo: string) {
      this.selectedHolesInfo = holesInfo;
    },

    aditionalOrderedProduction(projectOrderNr: string, message: string, data: any) {
      const userStore = useUserStore();
      const index = this.production.findIndex((p) => p._id === projectOrderNr);

      if (index === -1) return;

      if (message)
        this.production[index].comments.push({
          date: new Date().toISOString(),
          creator: userStore.user?.username || "Sistema",
          comment: message,
        });

      if (data[0].fences[0].measures.length > 0)
        this.production[index].fences.push(data[0].fences[0]);

      if (data[0].bindings.length > 0) {
        this.production[index].bindings?.push({
          id: new Date().getTime().toString(),
          color: "",
          height: 0,
          name: "------- Papildomai -------",
          quantity: 0,
          cut: 0,
          done: 0,
          postone: true,
          files: [],
        });

        for (const binding of data[0].bindings) {
          this.production[index].bindings?.push(binding);
        }
      }
    },

    deleteProductionOrder(id: string) {
      this.production = this.production.filter((item) => item._id !== id);
    },

    deleteFence(_id: string, fenceId: string) {
      this.production = this.production.filter((item) => {
        if (item._id === _id) {
          item.fences = item.fences.filter((item) => item.id !== fenceId);
          return item;
        } else return item;
      });
    },

    updateFence(
      _id: string,
      index: number,
      side: string,
      color: string,
      name: string,
      manufacturer: string,
      material: string,
      holes: string,
      step: number,
    ) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          const fence = item.fences[index];

          if (!fence) return item;

          item.fences[index] = {
            ...fence,
            side,
            color,
            name,
            manufacturer,
            material,
            holes,
            step,
          };
        }

        return item;
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
            (measure, i) => i !== measureIndex,
          );
          return item;
        } else return item;
      });
    },

    updateHoles(_id: string, index: number, value: number) {
      this.production = this.production.map((item: Production) => {
        if (item._id === _id) {
          item.fences[index].holesDone = value;
        }
        return item;
      });
    },

    updateMeasure(
      _id: string,
      index: number,
      measureIndex: number | null,
      value: boolean | number | string,
      field: string,
      option: string,
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

    updateGate(_id: string, index: number, measureIndex: number, value: boolean) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.fences[index].measures[measureIndex].gates.exist = value;
        }
        return item;
      });
    },

    updateStatus(_id: string, status: string) {
      this.production = this.production.map((item) =>
        item._id === _id ? { ...item, status } : item,
      );
    },

    clearProduction() {
      this.production = [];
    },

    addComment(_id: string, comment: Comment): void {
      this.production = this.production.map((project) => {
        if (project._id === _id) {
          project.comments = [comment, ...project.comments];
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
              ),
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

    updateFenceFiles(_id: string, id: string, files: string[]) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.fences = item.fences.map((fence) => {
            if (fence.id === id) {
              fence.files = [...files];
            }
            return fence;
          });
          return item;
        } else return item;
      });
    },

    updateBindingFiles(_id: string, id: string, files: string[]) {
      this.production = this.production.map((item) => {
        if (item._id === _id) {
          item.bindings = item.bindings?.map((binding) => {
            if (binding.id === id) {
              binding.files = [...files];
            }
            return binding;
          });
          return item;
        } else return item;
      });
    },
  },
});
