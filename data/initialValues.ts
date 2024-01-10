export const clientInitialValue: {
  username: string;
  address: string;
  phone: string;
  email: string;
} = {
  username: "",
  address: "",
  phone: "",
  email: "",
};

export const initialMeasure: {
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
} = {
  length: null,
  height: null,
  MeasureSpace: null,
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

export const initialResultData: {
  id: string;
  name: string;
  quantity: number;
  color: string;
  space: number;
  price: number;
  totalPrice: number;
  cost: number;
  totalCost: number;
  profit: number;
  margin: number;
  isNew: boolean;
  category: string;
} = {
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
