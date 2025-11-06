export default function getPriceItem(name: string) {
  const products = useProductsStore();

  return (
    products.products.find(
      (product) =>
        product.name.toLowerCase().trim() === name.toLowerCase().trim()
    ) || null
  );
}
