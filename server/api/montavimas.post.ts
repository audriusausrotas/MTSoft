import { processJob } from "~/utils/montavimasHelper";

export default defineEventHandler(async (event) => {
  const { _id, worker } = await readBody(event);

  const result = await processJob(_id, worker);

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return {
    success: true,
    data: result.data,
    message: result.message,
  };
});
