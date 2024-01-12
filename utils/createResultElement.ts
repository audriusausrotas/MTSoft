import getPriceItem from "~/utils/getPriceItem";
import { v4 as uuidv4 } from "uuid";

export default function createResultElement(item: any) {
  const results = useResultsStore().results;
  const product: Product = getPriceItem(item.name);

  const totalPrice = product.price * item.sq;
  const totalCost = product.cost * item.sq;
  const profit = totalPrice - totalCost;
  const margin = (Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);

  const resultData: Result = {
    id: uuidv4(),
    name: item.name,
    quantity: item.sq,
    color: item.color || "",
    space: item.space || 0,
    price: product.price || 0,
    totalPrice: totalPrice,
    cost: product.cost || 0,
    totalCost: totalCost,
    profit: profit,
    margin: +margin,
    isNew: false,
    category: "",
  };

  results.push(resultData);
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

interface Product {
  _id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  image: string;
}
