export interface Response {
  success: boolean;
  data: Project[];
  message: string;
}

export interface Calculations {
  client: Client;
  fences: Fence[];
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

export interface Client {
  address: string;
  username: string;
  phone: string;
  email: string;
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
  bindings: string;
  space: number;
  elements: number;
  totalLength: number;
  totalQuantity: number;
  measures: Measure[];
}

export interface Measure {
  length: number;
  height: number;
  MeasureSpace: number;
  elements: number;
  gates: GateInfo;
  kampas: {
    exist: boolean;
    value: string;
  };
  laiptas: {
    exist: boolean;
    value: string;
  };
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

export interface CalculatedParts {
  fences: Fences[];
  poles: OtherParts[];
  gatePoles: OtherParts[];
  borders: number;
  borderHolders: OtherParts[];
  rivets: OtherParts[];
  crossbars: OtherParts[];
  crossbarHolders: OtherParts[];
  totalElements: number;
  bindingsLength: OtherParts[];
  segments: OtherParts[];
  segmentHolders: OtherParts[];
  gates: Gate[];
  totalPrice: number;
  totalCost: number;
  totalProfit: number;
  totalMargin: number;
}

export interface OtherParts {
  color: string;
  quantity: number;
  height: number;
}

export interface Fences {
  type: string;
  color: string;
  length: number;
  height: number;
  quantity: number;
  elements: number;
  material: string;
  space: number;
  seeThrough: string;
  direction: string;
  twoSided: string;
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

export interface Works {
  id: string;
  name: string;
  quantity: number;
  price: number;
  cost: number;
  totalCost: number;
  totalPrice: number;
  margin: number;
  profit: number;
  isNew: boolean;
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

export interface FenceMeasure {
  name: string;
  height: number;
  width: number;
  seeThrough: number[];
}
