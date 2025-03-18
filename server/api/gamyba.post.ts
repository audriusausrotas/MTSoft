//done

import type { Gamyba, GamybaFence, Project, Bindings } from "~/data/interfaces";
import { v4 } from "uuid";
import { fenceBoards } from "~/data/selectFieldData";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: Project | null = await projectSchema.findById({ _id });

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const gamybaList: Gamyba[] = await gamybaSchema.find();

  const gamybaExist = gamybaList.some(
    (item) => item._id.toString() === project._id!.toString()
  );

  if (gamybaExist) {
    return { success: false, data: null, message: "Objektas jau gaminamas" };
  } else {
    //main bindings array
    const bindings: Bindings[] = [];

    //adds bindings as new or update quantity of existing
    const addBindings = (
      color: string,
      height: number,
      type: string,
      quantity: number
    ) => {
      let found = false;
      for (const binding of bindings) {
        if (
          binding.color === color &&
          binding.height === height &&
          binding.type === type
        ) {
          binding.quantity = binding.quantity! + quantity;
          found = true;
          break;
        }
      }

      if (!found) {
        bindings.push({
          id: v4(),
          color,
          height,
          type,
          quantity,
          cut: undefined,
          done: undefined,
          postone: false,
        });
      }
      found = false;
    };

    //loops via fences
    project.fenceMeasures.forEach((item) => {
      if (item.type === "Segmentas" || fenceBoards.includes(item.type)) return;

      const color = item.color;
      const isBindings = item.bindings === "Taip" ? true : false;
      const legWidth = item.type.includes("Dilė")
        ? "20 mm"
        : item.type.includes("40/105")
        ? "40 mm"
        : "55 mm";
      let lastHeight = 0;
      let stepHeight = 0;
      let stepDirection = "";
      let cornerRadius = 0;
      let wasGates = false;
      let wasCorner = false;
      let wasStep = false;

      item.measures.forEach((measure, index) => {
        const notSpecial =
          !measure.laiptas.exist &&
          !measure.kampas.exist &&
          !measure.gates.exist;

        if (!isBindings) {
          if (notSpecial)
            addBindings(color, measure.height, "Koja Dviguba " + legWidth, 2);
        } else {
          // if first element is fence, adds one leg
          if (index === 0) {
            if (notSpecial) {
              lastHeight = measure.height;
              addBindings(
                color,
                measure.height,
                "Koja vienguba " + legWidth,
                1
              );
            } else {
              if (measure.laiptas.exist) wasStep = true;
              if (measure.kampas.exist) wasCorner = true;
              if (measure.gates.exist) wasGates = true;
            }
            return;
          }

          if (index === item.measures.length - 1) {
            if (notSpecial)
              addBindings(
                color,
                measure.height,
                "Koja vienguba " + legWidth,
                1
              );
          }

          if (measure.gates.exist) {
            if (index !== 0 && !wasGates) {
              const maxHeight = Math.max(lastHeight, measure.height);

              addBindings(color, maxHeight, "Koja vienguba " + legWidth, 1);
              isBindings && addBindings(color, maxHeight, "Elka", 2);
            }
            wasGates = true;
            if (index === 0) lastHeight = measure.height;
          } else if (measure.kampas.exist) {
            cornerRadius = measure.kampas.value;
            wasCorner = true;
          } else if (measure.laiptas.exist) {
            stepDirection = measure.laiptas.direction;
            stepHeight = measure.laiptas.value;
            wasStep = true;
          } else {
            if (wasGates) {
              const maxHeight = Math.max(lastHeight, measure.height);

              addBindings(color, maxHeight, "Koja vienguba " + legWidth, 1);

              isBindings && addBindings(color, maxHeight, "Elka", 2);

              wasGates = false;
              lastHeight = measure.height;
            } else if (wasCorner && wasStep) {
              const maxHeight =
                stepDirection === "Aukštyn"
                  ? lastHeight + stepHeight - (lastHeight - measure.height)
                  : measure.height + stepHeight - (measure.height - lastHeight);

              isBindings &&
                addBindings(color, maxHeight, "Kampas " + cornerRadius, 1);

              addBindings(color, maxHeight, "Koja vienguba " + legWidth, 1);
              addBindings(
                color,
                stepDirection === "Aukštyn" ? measure.height : lastHeight,
                "Koja vienguba " + legWidth,
                1
              );

              wasCorner = false;
              wasStep = false;
              lastHeight = measure.height;
            } else if (wasCorner) {
              const maxHeight = Math.max(lastHeight, measure.height);
              isBindings &&
                addBindings(color, maxHeight, "Kampas " + cornerRadius, 1);

              addBindings(
                color,
                maxHeight,
                "Koja vienguba " + legWidth,

                2
              );

              wasCorner = false;
              lastHeight = measure.height;
            } else if (wasStep) {
              const maxHeight =
                stepDirection === "Aukštyn"
                  ? lastHeight + stepHeight - (lastHeight - measure.height)
                  : measure.height + stepHeight - (measure.height - lastHeight);

              isBindings && addBindings(color, maxHeight, "Centrinis", 2);

              addBindings(color, maxHeight, "Koja vienguba " + legWidth, 1);

              addBindings(
                color,
                stepDirection === "Aukštyn" ? measure.height : lastHeight,
                "Koja vienguba " + legWidth,
                1
              );
              wasStep = false;
              lastHeight = measure.height;
            } else {
              const maxHeight = Math.max(lastHeight, measure.height);

              isBindings && addBindings(color, maxHeight, "Centrinis", 2);

              addBindings(
                color,
                maxHeight,
                "Koja vienguba " + legWidth,

                2
              );

              lastHeight = measure.height;
            }
          }
        }
      });
    });

    const newFences: GamybaFence[] = project.fenceMeasures
      .filter(
        (item) => item.type !== "Segmentas" && !fenceBoards.includes(item.type)
      )
      .map((item) => {
        return {
          ...item,
          measures: item.measures.map((measure) => ({
            ...measure,
            cut: undefined,
            done: undefined,
            postone: measure.gates.exist ? true : false,
          })),
        };
      });

    const newGamyba = new gamybaSchema({
      _id: project._id!.toString(),
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: [...newFences],
      aditional: [],
      bindings,
      status: "Negaminti",
    });

    // @ts-ignore
    const data = await newGamyba.save();

    if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    project.status = "Gaminama";
    // @ts-ignore
    await project.save();

    return { success: true, data: newGamyba, message: "Perduota gamybai" };
  }
});
