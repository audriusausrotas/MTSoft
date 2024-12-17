import type { Version } from "~/data/interfaces";

export async function deleteVersions(versions: Version[]) {
  const deletePromises = versions.map((version) =>
    versionsSchema.findByIdAndDelete(version.id)
  );

  const results = await Promise.all(deletePromises);

  const success = results.every((result) => result !== null);

  return { success };
}
