export default function getPriceItem(name) {
  const products = useProductsStore().products;
  return products.filter((productItem) => productItem.name.includes(name));
}
