import { defineStore } from "pinia";

export const useAllProjectsStore = defineStore("allProjects", {
  state: (): ProjectsState => ({
    allProjects: [],
  }),

  actions: {
    async fetchProjects(): Promise<void> {
      const response: Response = await $fetch("/api/getProjects");
      if (response.success) {
        this.allProjects = [...response.data];
      }
    },
    async deleteProject(id: String) {
      this.allProjects = this.allProjects.filter((item) => item._id !== id);
    },
  },
});

// interfaces
interface Project {
  _id: string;
  client: Client;
  fenceMeasures: Fence[];
  results: Result[];
  calculatedParts: Parts[];
}

interface Parts {
  fences: Fences[];
  poles: number;
  gatePoles: number;
  borders: number;
  borderHolders: number;
  rivets: number;
  crossbars: number;
  crossbarHolders: number;
  totalElements: number;
  bindingsLength: number;
  segments: number;
  segmentHolders: number;
  gates: Gate[];
  totalPrice: number;
  totalCost: number;
  totalProfit: number;
  totalMargin: number;
}

interface Gate {
  client: string;
  phone: string;
  address: string;
  type: string;
  auto: boolean;
  width: number;
  height: number;
  color: string;
  filling: string;
  ready: boolean;
  aditional?: String[];
  smallGates?: String[];
}

interface Client {
  address: string;
  username: string;
  phone: string;
  email: string;
}

interface Fences {
  name: string;
  color: string;
  length: number;
  sq: number;
  material: string;
  space: number;
  twoSided: boolean;
}

interface Measure {
  length: number | null;
  height: number | null;
  MeasureSpace: number | null;
  gates: boolean;
  kampas: {
    exist: boolean;
    value: string;
  };
  laiptas: {
    exist: boolean;
    value: string;
  };
}

interface Fence {
  id: string;
  side: string;
  type: string;
  color: string;
  material: string;
  montavimas: boolean;
  borteliai: boolean;
  stulpai: boolean;
  tikMontavimas: boolean;
  twoSided: boolean;
  space: number;
  elements: number;
  totalLength: number;
  totalSQ: number;
  measures: Measure[];
}

interface Result {
  id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  quantity: number;
  space: number;
  color: string;
  totalPrice: number;
  totalCost: number;
  profit: number;
  margin: number;
  isNew: boolean;
}

interface Response {
  success: boolean;
  data: Project[];
  message: string;
}

interface ProjectsState {
  allProjects: Project[];
}
