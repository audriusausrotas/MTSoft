import getPriceItem from "~/utils/getPriceItem";
import { v4 as uuidv4 } from "uuid";

export default function createResultElement(item) {
  const results = useResultsStore().results;
  const product = getPriceItem(item.name);

  const totalPrice = product.price * item.sq;
  const totalCost = product.cost * item.sq;
  const profit = totalPrice - totalCost;
  const margin = (Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);

  const resultData = {
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
    margin: margin,
  };

  results.push(resultData);
}
