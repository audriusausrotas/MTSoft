import type { Version } from "~/data/interfaces";

export async function deleteVersions(versions: Version[]) {
  if (versions.length > 0) {
    const deletePromises = versions.map((version) => versionsSchema.findByIdAndDelete(version.id));
    await Promise.all(deletePromises);
  }
}
