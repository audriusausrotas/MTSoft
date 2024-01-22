import createResultElement from "~/utils/createResultElement";

export default function generateResults() {
  const results = useResultsStore();
  // const initialFenceData = {
  //   type: item.type,
  //   color: item.color,
  //   length: item.totalLength,
  //   height: 0,
  //   quantity: item.totalQuantity,
  //   material: item.material,
  //   space: item.space,
  //   seeThrough: item.seeThrough,
  //   direction: item.direction,
  //   twoSided: item.twoSided,
  // };

  if (results.fences.length > 0) {
    results.fences.forEach((item) => createResultElement(item));
  }

  if (results.poles.length > 0) {
    results.poles.forEach((item) => {
      let pole = "";
      if (item.height === 3 && item.thickness === 2) {
        pole = "Stulpas tvorai 60X40 mm, h3.0 m., sienelė: 2.0 mm";
      } else {
        pole = "Stulpas tvorai 60X40 mm, h2.4 m., sienelė: 1.25 mm";
      }
      createResultElement({ ...item, type: pole });
    });
  }

  if (results.gatePoles > 0) {
    let pole = "";
    results.gates.some((item) => {
      if (item.type === "Varstomi") {
        pole = "Stulpas vartams 100x100 mm, h3.0 m., sienelė: 3.0 mm";
      } else {
        pole = "Stulpas vartams 80X80 mm, h3.0 m., sienelė: 2.0 mm";
      }
    });
    createResultElement({ type: pole, quantity: results.gatePoles });
  }

  console.log(results.borders);
  if (results.borders > 0) {
    createResultElement({
      type: "Tvoros pamatas tiesus LYGUS, betoninis 2500x200x50 mm",
      quantity: results.borders,
    });

    createResultElement({
      type: "Laikiklis pamato metalinis 200X50 mm",
      quantity: results.borderHolders,
    });
  }

  if (results.crossbars > 0) {
  }

  if (results.crossbarHolders > 0) {
  }

  if (results.rivets > 0) {
  }

  if (results.bindingsLength > 0) {
  }

  if (results.segments > 0) {
  }

  if (results.segmentHolders > 0) {
  }

  if (results.gates.length > 0) {
  }
}
