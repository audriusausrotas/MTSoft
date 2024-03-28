import type { Gamyba, Project, Bindings } from "~/data/interfaces";
import { verticals } from "~/data/selectFieldData";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: Project | null = await projectSchema.findById({ _id });

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const gamybaList: Gamyba[] = await gamybaSchema.find();

  const gatesExist = gamybaList.some(
    (item) => item._id.toString() === project._id.toString()
  );

  if (gatesExist) {
    return { success: false, data: null, message: "Objektas jau gaminamas" };
  } else {
    const bindings: Bindings[] = [];

    project.fenceMeasures.forEach((item) => {
      if (item.bindings) {
        let lastHeight = 0;
        let step = false;
        item.measures.forEach((measure, index) => {
          if (measure.laiptas.exist) {
            //jei laiptas i virsu, nepridedam nieko,
            // if (laiptas aukstyn) lastHeight = lastHeight
            // if (laiptas zemyn) darom kas apacioj
            lastHeight += measure.laiptas.value;
            step = true;
            return;
          }

          const color = item.color;
          let height = measure.height;
          let type = "centrinis";

          if (measure.kampas.exist) {
            type = "kampinis" + measure.kampas.value;
          }

          if (step) {
            height = lastHeight;
            lastHeight = measure.height;
            step = false;
          } else {
            lastHeight = height;
          }

          if (index !== 0) {
            let found = false;
            for (const binding of bindings) {
              if (
                binding.color === color &&
                binding.height === height &&
                binding.type === type
              ) {
                binding.quantity += type === "centrinis" ? 2 : 1;
                found = true;
                break;
              }
            }

            if (!found) {
              bindings.push({
                color,
                height,
                type,
                quantity: type === "centrinis" ? 2 : 1,
              });
            }
          }
        });
      }
    });

    console.log(bindings);
    const newGamyba = {
      _id: project._id,
      creator: { ...project.creator },
      client: { ...project.client },
      fences: [...project.fenceMeasures],
      aditional: [],
      bindings,
    };
    //@ts-ignore
    // const data = await newGamyba.save();

    // if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    // project.status = "Gaminama";
    // //@ts-ignore
    // await project.save();

    return { success: true, data: newGamyba, message: "Perduota gamybai" };
  }
});
