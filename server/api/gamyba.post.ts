import type { Gamyba, Project, Bindings, BindingItem } from "~/data/interfaces";
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
    const bindings: Bindings[] = [];

    const addBindings = (color: string, height: number, type: string) => {
      let found = false;
      const quantity = type === "Centrinis" || type === "Elka" ? 2 : 1;

      for (const binding of bindings) {
        if (
          binding.color === color &&
          binding.height === height &&
          binding.type === type
        ) {
          binding.quantity += quantity;
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
          quantity: quantity,
        });
      }
      found = false;
    };

    const front: BindingItem[] = [];
    const left: BindingItem[] = [];
    const back: BindingItem[] = [];
    const right: BindingItem[] = [];

    project.fenceMeasures.forEach((item) => {
      const bindingItem: BindingItem = {
        bindings: item.bindings === "Taip" ? true : false,
        color: item.color,
        firstHeight: item.measures[0].height,
        lastHeight: item.measures[item.measures.length - 1].height,
      };

      if (item.side === "Priekis") front.push(bindingItem);
      if (item.side === "Kairė") left.push(bindingItem);
      if (item.side === "Galas") back.push(bindingItem);
      if (item.side === "Dešinė") right.push(bindingItem);

      if (item.bindings === "Taip") {
        let lastHeight = 0;
        let stepHeight = 0;
        let stepDirection = "";

        item.measures.forEach((measure, index) => {
          if (measure.laiptas.exist) {
            stepDirection = measure.laiptas.direction;
            stepHeight = measure.laiptas.value;
            return;
          }

          const color = item.color;
          let height = measure.height;
          const type = measure.kampas.exist
            ? "Kampinis " + measure.kampas.value
            : measure.gates.exist
            ? "Elka"
            : "Centrinis";

          if (lastHeight > height) {
            height = lastHeight;
            if (stepDirection === "Žemyn") height += stepHeight;
          } else if (lastHeight < height) {
            if (stepDirection === "Aukštyn") height += stepHeight;
          } else {
            height += stepHeight;
          }

          stepHeight = 0;
          stepDirection = "";
          lastHeight = measure.height;

          if (index !== 0) {
            addBindings(color, height, type);
          }
        });
      }
    });

    const calculateMiddle = (array: BindingItem[]) => {
      if (array.length > 1) {
        let lastElement: BindingItem | null = null;

        for (const item of array) {
          if (lastElement) {
            if (lastElement.bindings && item.bindings) {
              if (item.bindings) {
                if (
                  lastElement.lastHeight === item.firstHeight ||
                  lastElement.lastHeight > item.firstHeight
                ) {
                  addBindings(
                    lastElement.color,
                    lastElement.lastHeight,
                    "Centrinis"
                  );
                } else {
                  addBindings(item.color, item.firstHeight, "Centrinis");
                }
              } else {
                addBindings(lastElement.color, lastElement.lastHeight, "Elka");
              }
            } else {
              if (item.bindings) {
                addBindings(item.color, item.firstHeight, "Elka");
              }
            }
            lastElement = item;
          } else {
            lastElement = item;
          }
        }
      }
    };

    calculateMiddle(front);
    calculateMiddle(left);
    calculateMiddle(back);
    calculateMiddle(right);

    const calculateCorners = (a: BindingItem[], b: BindingItem[]) => {
      const firstElement = a[a.length - 1];
      const secondElement = b[0];
      if (a.length > 0 && b.length > 0) {
        if (firstElement.bindings && secondElement.bindings) {
          let length = 0;
          let color = "";
          if (firstElement.lastHeight > secondElement.firstHeight) {
            length = firstElement.lastHeight;
            color = firstElement.color;
          } else {
            length = secondElement.firstHeight;
            color = secondElement.color;
          }
          addBindings(color, length, "Kampinis");
        } else {
          if (firstElement.bindings) {
            addBindings(firstElement.color, firstElement.lastHeight, "Elka");
          }
          if (secondElement.bindings) {
            addBindings(secondElement.color, secondElement.firstHeight, "Elka");
          }
        }
      } else {
        if (a.length > 0 && firstElement.bindings) {
          addBindings(firstElement.color, firstElement.lastHeight, "Elka");
        }

        if (b.length > 0 && secondElement.bindings) {
          addBindings(secondElement.color, secondElement.firstHeight, "Elka");
        }
      }
    };

    calculateCorners(front, left);
    calculateCorners(left, back);
    calculateCorners(back, right);
    calculateCorners(right, front);

    const newGamyba = new gamybaSchema({
      _id: project._id,
      creator: { ...project.creator },
      client: { ...project.client },
      orderNumber: project.orderNumber,
      fences: [...project.fenceMeasures],
      aditional: [],
      bindings,
    });
    //@ts-ignore
    const data = await newGamyba.save();

    if (!data) return { success: false, data: null, message: "Įvyko klaida" };

    project.status = "Gaminama";
    //@ts-ignore
    await project.save();

    return { success: true, data: newGamyba, message: "Perduota gamybai" };
  }
});
