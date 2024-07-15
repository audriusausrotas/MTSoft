export default defineEventHandler(async (event) => {
  try {
    const { list } = await readBody(event);

    const data = await gamybaSchema.find();
    if (!data) {
      return { success: false, data: null, message: "Projektai nerastas" };
    }

    const found = list.map((id: string) => {
      return data.find((item) => item._id.toString() === id);
    });

    await gamybaSchema.deleteMany({});

    const newList = await gamybaSchema.insertMany(found);

    return { success: true, data: newList, message: "Išsaugota" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, data: null, message: "Klaida saugant duomenis" };
  }
});
