import type { Client, Measure, Result, MenuLinks } from "~/data/interfaces";

export const clientInitialValue: Client = {
  username: "",
  address: "",
  phone: "",
  email: "",
};

export const initialMeasure: Measure = {
  length: 0,
  height: 0,
  MeasureSpace: 0,
  gates: false,
  kampas: {
    exist: false,
    value: "",
  },
  laiptas: {
    exist: false,
    value: "",
  },
};

export const initialResultData: Result = {
  id: "",
  name: "",
  quantity: 0,
  color: "",
  space: 0,
  price: 0,
  totalPrice: 0,
  cost: 0,
  totalCost: 0,
  profit: 0,
  margin: 0,
  isNew: false,
  category: "",
};

export const menuLinks: MenuLinks[] = [
  { name: "Projektai", link: "/", iconPath: "/icons/projects.svg" },
  {
    name: "Skaičiuoklė",
    link: "/skaiciuokle",
    iconPath: "/icons/calculations.svg",
  },
  { name: "Sąmata", link: "/samata", iconPath: "/icons/projects.svg" },
  { name: "Kainos", link: "/kainos", iconPath: "/icons/prices.svg" },
];
