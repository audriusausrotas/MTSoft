// done

export default defineEventHandler(async (event) => {
  try {
    const { _id, location } = await readBody(event);

    if (location === "archive") {
      await archiveSchema.findOneAndDelete({ _id });
    } else if (location === "unconfirmed") {
      await unconfirmedSchema.findOneAndDelete({ _id });
    } else if (location === "deleted") {
      await deletedSchema.findOneAndDelete({ _id });
    } else if (location === "backup") {
      await deletedSchema.findOneAndDelete({ _id });
    }

    return { success: true, data: null, message: "Projektas ištrintas" };
  } catch (error) {
    console.error("Klaida trinant projektą:", error);
    return { success: false, data: null, message: error };
  }
});
