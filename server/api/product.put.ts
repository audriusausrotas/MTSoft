export default defineEventHandler(async (event) => {
  const { _id, width, height, isFenceBoard, defaultDirection, seeThrough } = await readBody(event);

  const updatedData = {
    width,
    height,
    isFenceBoard,
    defaultDirection,
    seeThrough,
  };

  const data = await productSchema.findOneAndUpdate({ _id }, updatedData, {
    new: true,
  });

  if (!data) {
    return { success: false, data: null, message: "Produktas neegzistuoja" };
  }

  return { success: true, data, message: "Pakeitimai atlikti" };
});
