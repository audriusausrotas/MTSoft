import type { Version } from "~/data/interfaces";

export async function deleteVersions(versions: Version[]) {
  if (versions.length > 0) {
    const deletePromises = versions.map((version) =>
      versionsSchema.findByIdAndDelete(version.id)
    );

    const results = await Promise.all(deletePromises);

    const success = results.every((result) => result !== null);

    return { success };
  } else return { success: true };
}
