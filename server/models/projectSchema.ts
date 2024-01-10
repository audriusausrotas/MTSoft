import { defineMongooseModel } from "#nuxt/mongoose";

interface Client {
  address: string;
  username: string;
  phone: string;
  email: string;
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

interface CalculatedParts {
  fences: Fences[];
  poles: Number;
  gatePoles: Number;
  borders: Number;
  borderHolders: Number;
  rivets: Number;
  crossbars: Number;
  crossbarHolders: Number;
  totalElements: Number;
  bindingsLength: Number;
  segments: Number;
  segmentHolders: Number;
  gates: Gate[];
  totalPrice: Number;
  totalCost: Number;
  totalProfit: Number;
  totalMargin: Number;
}

interface Project {
  client: Client;
  fenceMeasures?: Fence[];
  results?: Result[];
  calculatedParts: CalculatedParts;
  confirmed: boolean;
  advance: boolean;
  payed: boolean;
  status: string;
  creator: string;
  orderNumber: string;
}

interface Fences {
  name: String;
  color: String;
  length: Number;
  sq: Number;
  material: String;
  space: Number;
  twoSided: Boolean;
}

export const projectSchema = defineMongooseModel<Project>(
  "projectSchema",
  {
    client: {
      type: Object,
      required: false,
      default: {},
    },
    fenceMeasures: {
      type: Array,
      required: false,
      default: [],
    },
    results: {
      type: Array,
      required: false,
      default: [],
    },
    calculatedParts: {
      type: Object,
      required: false,
      default: {},
    },
    confirmed: {
      type: Boolean,
      required: false,
      default: false,
    },
    advance: {
      type: Boolean,
      required: false,
      default: false,
    },
    payed: {
      type: Boolean,
      required: false,
      default: false,
    },
    status: {
      type: String,
      required: false,
      default: "Nepatvirtintas",
    },
    creator: String,
    orderNumber: String,
  },
  { collection: "projects" }
);
