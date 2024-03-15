export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  if (project.gates.length === 0)
    return { success: false, data: null, message: "Projektas vartų neturi" };

  const gatesVartonas = await gateSchemaVartonas.find();
  const gatesGigasta = await gateSchemaGigasta.find();

  const gates = [...gatesVartonas, ...gatesGigasta];

  const gatesExist = gates.some(
    (item) => item._id.toString() === project._id.toString()
  );

  if (gatesExist) {
    return { success: false, data: null, message: "Vartai jau užsakyti" };
  } else {
    const currentDate = new Date();
    const dateCreated = currentDate.toISOString();

    const gateData = {
      _id: project._id,
      creator: { ...project.creator },
      client: { ...project.client },
      gates: [...project.gates],
      dateCreated,
    };

    let newGates;

    if (value === "vartonas") {
      newGates = new gateSchemaVartonas(gateData);
    } else if (value === "gigasta") {
      newGates = new gateSchemaGigasta(gateData);
    }
    const data = await newGates?.save();

    return { success: true, data, message: "Vartai užsakyti" };
  }
});
