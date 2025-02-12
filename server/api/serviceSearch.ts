export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.q as string;

  if (!search || search.length < 3) return { results: [] };

  const results = await archiveSchema
    .find(
      {
        $and: [
          {
            $or: [
              { "client.address": { $regex: search, $options: "i" } },
              { "client.username": { $regex: search, $options: "i" } },
              { "client.phone": { $regex: search, $options: "i" } },
              { "client.email": { $regex: search, $options: "i" } },
            ],
          },
          { gates: { $exists: true, $ne: [] } },
          { status: "Baigtas" },
        ],
      },
      {
        "client.address": 1,
        dateExparation: 1,
      }
    )
    .limit(10)
    .lean();

  return { success: true, data: results, message: "" };
});
