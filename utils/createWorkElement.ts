import getPriceItem from "~/utils/getPriceItem";
import type { Works, Product } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";

export default function createWorkElement(item: any) {
  const works = useResultsStore();
  const product: Product = getPriceItem(item.name);

  const totalPrice = product.price * item.quantity;
  const totalCost = product.cost * item.quantity;
  const profit = totalPrice - totalCost;
  const margin = (Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);

  const resultData: Works = {
    id: uuidv4(),
    name: item.name,
    quantity: item.quantity,
    price: product.price || 0,
    totalPrice: totalPrice,
    cost: product.cost || 0,
    totalCost: totalCost,
    profit: profit,
    margin: +margin,
    isNew: false,
  };

  works.addWork(resultData);
}
