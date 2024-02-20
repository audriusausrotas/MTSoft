import getPriceItem from "~/utils/getPriceItem";
import type { Works, Product } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";

export default function createWorkElement(item: {
  name: string;
  quantity: number;
}) {
  const works = useResultsStore();
  const product: Product = getPriceItem(item.name);

  const totalPrice = +(product.price * item.quantity).toFixed(2);
  const totalCost = +(product.cost * item.quantity).toFixed(2);
  const profit = +(totalPrice - totalCost).toFixed(2);
  const margin = +(Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);
  const roundedQuantity = +item.quantity.toFixed(2);

  const resultData: Works = {
    id: uuidv4(),
    name: item.name,
    quantity: roundedQuantity,
    price: product.price,
    totalPrice: totalPrice,
    cost: product.cost,
    totalCost: totalCost,
    profit: profit,
    margin: margin,
    isNew: false,
  };

  works.addWork(resultData);
}
