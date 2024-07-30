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
      let lastHeight = 0;
      let stepHeight = 0;
      let stepDirection = "";
      let cornerRadius = 0;
      let wasGates = false;
      let wasCorner = false;
      let wasStep = false;

      item.measures.forEach((measure, index) => {
        if (index === 0) {
          lastHeight = measure.height;
          addBindings(
            color,
            measure.height,
            isBindings ? "Koja vienguba" : "Koja dviguba",
            1
          );
          return;
        }

        if (index === item.measures.length - 1) {
          addBindings(
            color,
            measure.height,
            isBindings ? "Koja vienguba" : "Koja dviguba",
            1
          );
        }

        if (measure.gates.exist) {
          addBindings(color, measure.height, "Koja dviguba", 2);
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
          } else if (wasCorner) {
          } else if (wasStep) {
          } else {
            if (lastHeight === measure.height) {
              isBindings && addBindings(color, lastHeight, "Centrinis", 2);
              addBindings(
                color,
                measure.height,
                isBindings ? "Koja vienguba" : "Koja dviguba",
                2
              );
            } else if (lastHeight > measure.height) {
              isBindings && addBindings(color, lastHeight, "Centrinis", 2);

              addBindings(
                color,
                lastHeight,
                isBindings ? "Koja vienguba" : "Koja dviguba",
                2
              );
            } else if (lastHeight < measure.height) {
              isBindings && addBindings(color, measure.height, "Centrinis", 2);

              addBindings(
                color,
                measure.height,
                isBindings ? "Koja vienguba" : "Koja dviguba",
                2
              );
            }

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

    const newGamyba = {
      _id: project._id.toString(),
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: [...newFences],
      aditional: [],
      bindings,
    };
    // @ts-ignore
    // const data = await newGamyba.save();

    // if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    // project.status = "Gaminama";
    // @ts-ignore
    // await project.save();

    return { success: true, data: newGamyba, message: "Perduota gamybai" };
  }
});
