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
          color,
          height,
          type,
          quantity: quantity,
        });
      }
      found = false;
    };

    const front: any = [];
    const left: any = [];
    const back: any = [];
    const right: any = [];

    project.fenceMeasures.forEach((item) => {
      const bindingItem = {
        bindings: item.bindings === "Taip" ? true : false,
        color: item.color,
        firstHeight: item.measures[0].height,
        lastHeight: item.measures[item.measures.length - 1].height,
      };

      if (item.direction === "Priekis") front.push(bindingItem);
      if (item.direction === "Kairė") left.push(bindingItem);
      if (item.direction === "Galas") back.push(bindingItem);
      if (item.direction === "Dešinė") right.push(bindingItem);

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
            ? "Kampinis" + measure.kampas.value
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

    //istestuot
    const calculateMiddle = (array: any) => {
      if (array.length > 1) {
        let lastElement: any;

        for (const item of array) {
          if (lastElement) {
            if (lastElement.bingings) {
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

    //  const front = [];
    // const left = [];
    // const back = [];
    // const right = [];

    // project.fenceMeasures.forEach((item) => {
    //   const bindingItem = {
    //     bindings: item.bindings,
    //     color: item.color,
    //     firstHeight: item.measures[0].height,
    //     lastHeight: item.measures[item.measures.length - 1].height,
    //   };

    const calculateCorners = () => {};

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
