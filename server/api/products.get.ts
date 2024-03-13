import { productSchema } from "~/server/models/productSchema";
import type { Product } from "~/data/interfaces";

export default defineEventHandler(async () => {
  const data = await productSchema.find();

  if (!data)
    return { success: false, data: null, message: "Produktai nerasti" };

  const borteliai: Product[] = [];
  const darbai: Product[] = [];
  const kita: Product[] = [];
  const laikikliai: Product[] = [];
  const skersiniai: Product[] = [];
  const stulpai: Product[] = [];
  const tvoros: Product[] = [];
  const vartai: Product[] = [];

  data.forEach((item) => {
    if (item.category.toLowerCase() === "borteliai") borteliai.push(item);
    if (item.category.toLowerCase() === "darbai") darbai.push(item);
    if (item.category.toLowerCase() === "kita") kita.push(item);
    if (item.category.toLowerCase() === "laikikliai") laikikliai.push(item);
    if (item.category.toLowerCase() === "skersiniai") skersiniai.push(item);
    if (item.category.toLowerCase() === "stulpai") stulpai.push(item);
    if (item.category.toLowerCase() === "tvoros") tvoros.push(item);
    if (item.category.toLowerCase() === "vartai") vartai.push(item);
  });

  borteliai.sort(compare);
  darbai.sort(compare);
  kita.sort(compare);
  laikikliai.sort(compare);
  skersiniai.sort(compare);
  stulpai.sort(compare);
  tvoros.sort(compare);
  vartai.sort(compare);

  function compare(a: Product, b: Product) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  const sortedData = [
    ...borteliai,
    ...darbai,
    ...kita,
    ...laikikliai,
    ...skersiniai,
    ...stulpai,
    ...tvoros,
    ...vartai,
  ];

  return { success: true, data: sortedData, message: "" };
});
