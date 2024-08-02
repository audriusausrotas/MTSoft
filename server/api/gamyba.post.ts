import type {
  Gamyba,
  GamybaFence,
  Project,
  Bindings,
  BindingItem,
} from "~/data/interfaces";
import { v4 } from "uuid";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: Project | null = await projectSchema.findById({ _id });

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const gamybaList: Gamyba[] = await gamybaSchema.find();

  const gamybaExist = gamybaList.some(
    (item) => item._id.toString() === project._id.toString()
  );

  if (gamybaExist) {
    return { success: false, data: null, message: "Objektas jau gaminamas" };
  } else {
    //main bindings array
    const bindings: Bindings[] = [];
    //fence sides with bindings
    const front: BindingItem[] = [];
    const left: BindingItem[] = [];
    const back: BindingItem[] = [];
    const right: BindingItem[] = [];

    ////////////////////////////////////////////////////////////////

    //adds bindings as new or update quantity of existing
    const addBindings = (
      color: string,
      height: number,
      type: string,
      quantity: number
    ) => {
      let found = false;
      type.includes("Koja") && console.log(height + " - " + quantity);
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
      const bindingItem: BindingItem = {
        bindings: item.bindings === "Taip" ? true : false,
        color: item.color,
        firstHeight: item.measures[0].height,
        lastHeight: item.measures[item.measures.length - 1].height,
      };

      // adds existing fences for corner calculation
      if (item.side === "Priekis") front.push(bindingItem);
      else if (item.side === "Kairė") left.push(bindingItem);
      else if (item.side === "Galas") back.push(bindingItem);
      else if (item.side === "Dešinė") right.push(bindingItem);

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

        if (index === 0 && notSpecial) {
          lastHeight = measure.height;
          addBindings(
            color,
            measure.height,
            isBindings
              ? "Koja vienguba " + legWidth
              : "Koja dviguba " + legWidth,
            1
          );
          return;
        }

        if (index === item.measures.length - 1 && notSpecial) {
          addBindings(
            color,
            measure.height,
            isBindings
              ? "Koja vienguba " + legWidth
              : "Koja dviguba " + legWidth,
            1
          );
        }

        // PASITIKRINT SITA
        if (index === item.measures.length - 1 && measure.gates.exist) {
          const maxHeight = Math.max(lastHeight, measure.height);

          addBindings(
            color,
            maxHeight,
            isBindings
              ? "Koja vienguba " + legWidth
              : "Koja dviguba " + legWidth,
            1
          );

          isBindings && addBindings(color, maxHeight, "Elka", 2);
        }

        if (measure.gates.exist) {
          wasGates = true;
        } else if (measure.kampas.exist) {
          cornerRadius = measure.kampas.value;
          wasCorner = true;
        } else if (measure.laiptas.exist) {
          stepDirection = measure.laiptas.direction;
          stepHeight = measure.laiptas.value;
          wasStep = true;
        } else {
          if (wasGates) {
            // LIKO VARTAI
          } else if (wasCorner && wasStep) {
            const maxHeight =
              stepDirection === "Aukštyn"
                ? lastHeight + stepHeight - (lastHeight - measure.height)
                : measure.height + stepHeight - (measure.height - lastHeight);

            isBindings &&
              addBindings(color, maxHeight, "Kampas " + cornerRadius, 1);

            addBindings(
              color,
              maxHeight,
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
              1
            );
            addBindings(
              color,
              stepDirection === "Aukštyn" ? measure.height : lastHeight,
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
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
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
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

            addBindings(
              color,
              maxHeight,
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
              1
            );

            addBindings(
              color,
              stepDirection === "Aukštyn" ? measure.height : lastHeight,
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
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
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
              2
            );

            lastHeight = measure.height;
          }
        }
      });
    });
    ////////////////////////////////////////////////////////////////

    const newFences: GamybaFence[] = project.fenceMeasures.map((item) => {
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

    // const newGamyba = new gamybaSchema({
    //   _id: project._id.toString(),
    //   creator: { ...project.creator },
    //   client: { ...project.client },
    //   orderNumber: project.orderNumber,
    //   fences: [...newFences],
    //   aditional: [],
    //   bindings,
    // });

    ///////////////////////////// sita istrint /////////////////////
    const newGamyba = {
      _id: project._id.toString(),
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: [...newFences],
      aditional: [],
      status: "Negaminti",
      bindings,
    };
    /////////////////////////////////////////////////////////////
    // @ts-ignore
    // const data = await newGamyba.save();

    // if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    // project.status = "Gaminama";
    // @ts-ignore
    // await project.save();

    return { success: true, data: newGamyba, message: "Perduota gamybai" };
  }
});
