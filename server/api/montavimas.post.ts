import type { Montavimas, MontavimasFence, Project } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: Project | null = await projectSchema.findById({ _id });

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const montavimasList: Montavimas[] = await montavimasSchema.find();

  const montavimasExist = montavimasList.some(
    (item) => item._id.toString() === project._id.toString()
  );

  const newFences: MontavimasFence[] = project.fenceMeasures.map((item) => {
    return {
      ...item,
      measures: item.measures.map((measure) => ({
        ...measure,
        done: undefined,
        postone: measure.gates.exist ? true : false,
      })),
    };
  });

  if (montavimasExist) {
    return { success: false, data: null, message: "Objektas jau montuojamas" };
  } else {
    const newMontavimas = new montavimasSchema({
      _id: project._id.toString(),
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: [...newFences],
      aditional: [],
    });

    // @ts-ignore
    const data = await newMontavimas.save();

    if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    project.status = "Montuojama";
    // @ts-ignore
    await project.save();

    return {
      success: true,
      data: newMontavimas,
      message: "Perduota montavimui",
    };
  }
});
