import { SelectValues } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { field, index } = await readBody(event);
  const data = await selectSchema.findOne();

  if (!data) {
    return { success: false, message: "klaida" };
  }

  data[field as keyof SelectValues].splice(index, 1);
  await data.save();

  return { success: true, data, message: "Išsaugota" };
});
