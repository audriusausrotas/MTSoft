import type {
  Gamyba,
  GamybaFence,
  Project,
  Bindings,
  BindingItem,
  Measure,
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
    let front: BindingItem | null = null;
    let left: BindingItem | null = null;
    let back: BindingItem | null = null;
    let right: BindingItem | null = null;
    const fenceSequence: string[] = [];

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
        firstHeight: item.measures[0],
        lastHeight: item.measures[item.measures.length - 1],
      };

      // adds existing fences for corner calculation
      fenceSequence.push(item.side);
      if (item.side === "Priekis") front = bindingItem;
      else if (item.side === "Kairė") left = bindingItem;
      else if (item.side === "Galas") back = bindingItem;
      else if (item.side === "Dešinė") right = bindingItem;

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

        if (measure.gates.exist) {
          if (index !== 0 && !wasGates) {
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

            addBindings(
              color,
              maxHeight,
              isBindings
                ? "Koja vienguba " + legWidth
                : "Koja dviguba " + legWidth,
              1
            );

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

    // calculate corner bindings
    const calculateCorners = (first: BindingItem, last: BindingItem) => {
      if (first.bindings && last.bindings) {
        if (first.lastHeight.gates.exist) {
          addBindings(last.color, last.firstHeight.height, "Elka", 2);
        } else if (last.firstHeight.gates.exist) {
          addBindings(first.color, first.lastHeight.height, "Elka", 2);
        } else {
          const maxHeight = Math.max(
            first.lastHeight.height,
            last.firstHeight.height
          );
          addBindings(first.color, maxHeight, "Kampas 90", 1);
        }
      } else if (first.bindings) {
        addBindings(first.color, first.lastHeight.height, "Elka", 2);
      } else if (last.bindings) {
        addBindings(last.color, last.firstHeight.height, "Elka", 2);
      }
    };

    let lastCorner = "";

    fenceSequence.forEach((item, index) => {
      if (index === 0) {
        lastCorner = item;
      } else {
        if (item === "Priekis" && lastCorner === "Kairė") {
          calculateCorners(front!, left!);
        }
        if (item === "Priekis" && lastCorner === "Dešinė") {
          calculateCorners(front!, right!);
          lastCorner = item;
        }
        if (item === "Kairė" && lastCorner === "Priekis") {
          calculateCorners(left!, front!);
          lastCorner = item;
        }
        if (item === "Kairė" && lastCorner === "Galas") {
          calculateCorners(left!, back!);
          lastCorner = item;
        }
        if (item === "Dešinė" && lastCorner === "Priekis") {
          calculateCorners(right!, front!);
          lastCorner = item;
        }
        if (item === "Dešinė" && lastCorner === "Galas") {
          calculateCorners(right!, back!);
          lastCorner = item;
        }
        if (item === "Galas" && lastCorner === "Kairė") {
          calculateCorners(back!, left!);
          lastCorner = item;
        }
        if (item === "Galas" && lastCorner === "Dešinė") {
          calculateCorners(back!, right!);
          lastCorner = item;
        } else if (index === fenceSequence.length - 1) {
          const firstFence = fenceSequence[0];
          const lastFence = fenceSequence[fenceSequence.length - 1];

          const first =
            firstFence === "Priekis"
              ? front
              : firstFence === "Kairė"
              ? left
              : firstFence === "Galas"
              ? back
              : right;
          const last =
            lastFence === "Priekis"
              ? front
              : lastFence === "Kairė"
              ? left
              : lastFence === "Galas"
              ? back
              : right;

          calculateCorners(first!, last!);
        }
      }
    });

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

    const newGamyba = new gamybaSchema({
      _id: project._id.toString(),
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: [...newFences],
      aditional: [],
      bindings,
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
