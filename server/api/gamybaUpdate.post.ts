import type { Gamyba } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  try {
    const { list } = await readBody(event);

    const data = await gamybaSchema.find();
    if (!data) {
      return { success: false, data: null, message: "Projektai nerastas" };
    }

    const notFound: Gamyba[] = [];
    const found: Gamyba[] = [];

    list.forEach((id: string) => {
      const foundData = data.find((item) => item._id.toString() === id);
      if (foundData) {
        found.push(foundData);
      }
    });

    data.forEach((item: Gamyba) => {
      if (!list.includes(item._id.toString())) {
        notFound.push(item);
      }
    });

    const finalList = [...found, ...notFound];

    await gamybaSchema.deleteMany({});

    const newList = await gamybaSchema.insertMany(finalList);

    return { success: true, data: newList, message: "Išsaugota" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, data: null, message: "Klaida saugant duomenis" };
  }
});
