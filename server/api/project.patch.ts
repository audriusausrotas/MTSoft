export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  if (project.gates.length > 0) {
    if (value === "Nepatvirtintas") {
      await gateSchema.findOneAndDelete({ address: project.client.address });
    }

    if (value === "Patvirtintas") {
      const allGates = await gateSchema.find();
      const gateExist = allGates.some(
        (item) => item.address === project.client.address
      );

      if (!gateExist) {
        const newGates = new gateSchema({
          creator: { ...project.creator },
          client: project.client.username,
          phone: project.client.phone,
          address: project.client.address,
          gates: project.gates,
        });
        await newGates.save();
      }
    }
  }

  project.status = value;
  const data = project.save();

  return { success: true, data: data, message: "Būsena atnaujinta" };
});
