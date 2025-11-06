import type { Works } from "~/data/interfaces";
import { v4 as uuidv4 } from "uuid";
import getProductPrice from "~/utils/calculations/getProductPrice";

export default function createWorkElement(item: {
  name: string;
  quantity: number;
}) {
  const product: any = getProductPrice(item.name);
  const retail = useCalculationsStore().retail;
  const backupStore = useBackupStore();
  const works = useResultsStore();
  const backupExist = backupStore.backupExist;
  const backup = backupStore.works.find(
    (i) =>
      i.name.toLowerCase().trim() === item.name.toLowerCase().trim()
  );

  let cost = 0;
  let price = 0;

  if (!product) return;

  if (backupExist && backup && backup.retail === retail) {
    cost = backup.cost;
    price = backup.price;
  } else {
    cost = product.prices.cost;
    price = retail ? product.prices.priceRetail : product.prices.wholesale;
  }

  const totalPrice = +(price * item.quantity).toFixed(2);
  const totalCost = +(cost * item.quantity).toFixed(2);
  const profit = +(totalPrice - totalCost).toFixed(2);
  const margin = +(Math.round((profit / totalPrice) * 10000) / 100).toFixed(2);
  const roundedQuantity = +item.quantity.toFixed(2);

  const resultData: Works = {
    id: uuidv4(),
    name: item.name,
    quantity: roundedQuantity,
    price,
    totalPrice: totalPrice,
    cost,
    totalCost: totalCost,
    profit: profit,
    margin: margin,
    done: false,
    retail,
  };

  works.addWork(resultData);
}
