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
  auto: boolean;
  width: number;
  height: number;
  color: string;
  filling: string;
  ready: boolean;
  aditional?: String[];
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
  name: string;
  color: string;
  length: number;
  sq: number;
  material: string;
  space: number;
  twoSided: boolean;
}

export interface Measure {
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

export interface Result {
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
