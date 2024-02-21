import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);
  console.log("22");

  if (!_id)
    return {
      success: false,
      data: null,
      message: "nera tokeno",
    };

  const data: User | null = await userSchema.findById({ _id });
  console.log("23");

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  console.log("24");
  data.password = "";

  return { success: true, data: data, message: "Vartotojas prijungtas" };
});
