import { archiveSchema } from "~/server/models/archiveSchema";

export default defineEventHandler(async (event) => {
  const data = await archiveSchema.find();

  if (!data)
    return {
      success: false,
      data: null,
      message: "Archyvuotų projektų nerasta",
    };

  data.reverse();

  return {
    success: true,
    data: data,
    message: "Archyvuoti projektai rasti",
  };
});
