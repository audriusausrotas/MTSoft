export interface CalculatedParts {
  fences: Fences[];
  poles: Poles[];
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

export interface Gate {
  client: string;
  phone: string;
  address: string;
  type: string;
  auto: string;
  width: number;
  height: number;
  color: string;
  filling: string;
  ready: boolean;
  aditional: string;
}

export interface Client {
  address: string;
  username: string;
  phone: string;
  email: string;
}

export interface Calculations {
  client: Client;
  fences: Fence[];
}

export interface Fences {
  type: string;
  color: string;
  length: number;
  height: number;
  quantity: number;
  material: string;
  space: number;
  seeThrough: string;
  direction: string;
  twoSided: string;
}

export interface Measure {
  length: number;
  height: number;
  MeasureSpace: number;
  gates: GateInfo;
  elements: number;
  kampas: {
    exist: boolean;
    value: string;
  };
  laiptas: {
    exist: boolean;
    value: string;
  };
}

export interface GateInfo {
  exist: boolean;
  type: string;
  automatics: string;
  aditional: string;
  direction: string;
  lock: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  verified: boolean;
  admin: boolean;
  photo: string;
}

export interface Fence {
  id: string;
  side: string;
  type: string;
  color: string;
  material: string;
  services: string;
  seeThrough: string;
  direction: string;
  parts: string;
  aditional: string;
  twoSided: string;
  space: number;
  elements: number;
  totalLength: number;
  totalQuantity: number;
  measures: Measure[];
}

export interface Result {
  id: string;
  type: string;
  price: number;
  cost: number;
  category: string;
  quantity: number;
  height: number;
  twoSided: string;
  direction: string;
  seeThrough: string;
  space: number;
  color: string;
  totalPrice: number;
  totalCost: number;
  profit: number;
  margin: number;
  isNew: boolean;
}

export interface Response {
  success: boolean;
  data: Project[];
  message: string;
}

export interface ResponseUser {
  success: boolean;
  data: User;
  message: string;
}
export interface ResponseUsers {
  success: boolean;
  data: User[];
  message: string;
}

export interface ProjectsState {
  projects: Project[];
}

export interface ProductsState {
  products: Product[];
  fences: Product[];
  poles: Product[];
  borders: Product[];
  crossbars: Product[];
  holders: Product[];
  gates: Product[];
  other: Product[];
  searchValue: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  image: string;
}

export interface ResponseProducts {
  success: boolean;
  data: Product[];
  message: string;
}
export interface ResponseProduct {
  success: boolean;
  data: Product;
  message: string;
}

export interface Project {
  _id: string;
  client: Client;
  fenceMeasures: Fence[];
  results: Result[];
  calculatedParts: CalculatedParts;
  confirmed: boolean;
  advance: boolean;
  payed: boolean;
  status: string;
  creator: string;
  orderNumber: string;
}

export interface ResponseProject {
  success: boolean;
  data: Project;
  message: string;
}

export interface MenuLinks {
  name: string;
  link: string;
  iconPath: string;
}

export interface Poles {
  height: number;
  thickness: number;
  color: string;
  quantity: number;
}

export interface FenceMeasure {
  height: number;
  width: number;
}

export interface FenceMeasures {
  Daimond60: FenceMeasure;
  Daimond40: FenceMeasure;
  Plank: FenceMeasure;
  Žaliuzi: FenceMeasure;
  Dija: FenceMeasure;
  Dilė: FenceMeasure;
  Eglė: FenceMeasure;
  Alba: FenceMeasure;
  Standard: FenceMeasure;
  Sigma: FenceMeasure;
  Astra: FenceMeasure;
  Polo: FenceMeasure;
  Eva: FenceMeasure;
  Eva3: FenceMeasure;
  Estetic: FenceMeasure;
  Emka: FenceMeasure;
}
