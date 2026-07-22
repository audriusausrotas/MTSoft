export const useScreenStore = defineStore("screen", {
  state: () => ({
    shift: 0,
    cut: { target: 0, current: 0 },
    holes: { target: 0, current: 0 },
    M1: { target: 0, current: 0 },
    M2: { target: 0, current: 0 },
  }),

  actions: {
    setData(cut: number, holes: number, M1: number, M2: number) {
      this.cut.current = cut / 100;
      this.holes.current = holes;
      this.M1.current = M1;
      this.M2.current = M2;
    },

    setTargets(cut: number, holes: number, M1: number, M2: number) {
      this.cut.target = cut;
      this.holes.target = holes;
      this.M1.target = M1;
      this.M2.target = M2;
    },

    setShift(shift: number) {
      this.shift = shift;
      this.cut.current = 0;
      this.holes.current = 0;
      this.M1.current = 0;
      this.M2.current = 0;
    },

    addData(data: any) {
      if (data.operation === "cut") this.cut.current += data.quantity / 100;

      if (data.operation === "done") {
        if (data.machine === "Lenkimo staklės 1") this.M1.current += data.quantity;
        if (data.machine === "Lenkimo staklės 2") this.M2.current += data.quantity;
      }
      if (data.operation === "holes") {
        if (data.machine === "Lenkimo staklės 1") this.M1.current += +data.quantity.toFixed(1);
        else if (data.machine === "Lenkimo staklės 2") this.M2.current += +data.quantity.toFixed(1);
        else this.holes.current += +data.quantity;
      }
    },
  },

  getters: {},
});
