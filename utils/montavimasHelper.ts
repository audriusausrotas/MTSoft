import type { MontavimasFence, Project } from "~/data/interfaces";

export async function processJob(_id: string, worker: string) {
  const project: Project | null = await projectSchema.findById(_id);

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const montavimas = await montavimasSchema.findOne({ _id: project._id });

  const newFences: MontavimasFence[] = project.fenceMeasures.map((item) => {
    return {
      ...item,
      measures: item.measures.map((measure) => ({
        ...measure,
        done: undefined,
        postone: false,
      })),
    };
  });

  if (montavimas) {
    if (montavimas.workers.includes(worker)) {
      return {
        success: false,
        data: null,
        message: "Objektas jau montuojamas",
      };
    } else {
      montavimas.workers.push(worker);
      const data = await montavimas.save();
      return { success: true, data: data, message: "Montavimas priskirtas" };
    }
  } else {
    const newResults = project.results.map((item) => {
      return {
        type: item.type,
        quantity: item.quantity,
        height: item.height,
        width: item.width,
        color: item.color,
        category: item.category,
      };
    });

    const newWorks = project.works.map((item) => {
      return {
        name: item.name,
        quantity: item.quantity,
      };
    });

    const newMontavimas = new montavimasSchema({
      _id: project._id?.toString(),
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: newFences,
      results: newResults,
      works: newWorks,
      aditional: [],
      workers: [worker],
    });

    const data = await newMontavimas.save();
    if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    project.status = "Montuojama";
    //@ts-ignore
    await project.save();
    return {
      success: true,
      data: newMontavimas,
      message: "Perduota montavimui",
    };
  }
}
