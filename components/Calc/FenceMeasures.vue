<script setup>
const props = defineProps(["index"]);
const useProject = useProjectStore();

const open = ref(false);
const totalLength = ref("");

const cancelHandler = () => {
  open.value = false;
  totalLength.value = "";
};

const calculateLengthHandler = () => {
  const totalMeasures = [];
  if (totalLength.value > 0) {
    const measures = Math.floor(+totalLength.value / 250);
    const modula = +totalLength.value % 250;
    for (let i = 0; i < measures; i++) {
      totalMeasures.push(250);
    }
    if (modula > 0) totalMeasures.push(modula);
  } else return;

  const checkCalculations = () => {
    const lastElement = totalMeasures.length - 1;
    const isShort = totalMeasures.some((item) => item === 250);
    if (totalMeasures[lastElement] < 200 && isShort) {
      totalMeasures[lastElement] += 50;
      for (let i = lastElement - 1; i >= 0; i--) {
        if (totalMeasures[i] === 250) {
          totalMeasures[i] -= 50;
          break;
        }
      }
      if (totalMeasures[lastElement] < 200 && isShort) checkCalculations();
    }
  };
  checkCalculations();

  totalMeasures.forEach((item) => {
    let lastElement =
      useProject.fences[props.index].measures[
        useProject.fences[props.index].measures.length - 1
      ];

    if (!lastElement) {
      useProject.addMeasure(props.index);
      lastElement = 0;
    }

    if (
      (lastElement.length !== null && lastElement.length !== "") ||
      lastElement.kampas.exist ||
      lastElement.laiptas.exist
    ) {
      useProject.addMeasure(props.index);
    }
    useProject.updateMeasureLength({
      index: props.index,
      value: item,
      measureIndex: useProject.fences[props.index].measures.length - 1,
    });
  });

  open.value = false;
  totalLength.value = "";
};

watch(
  () => useProject.fences[props.index].measures,
  (newMeasures, oldMeasures) => {
    let totalM = 0;
    let totalSQ = 0;
    newMeasures.forEach((item) => {
      totalM += +item.length;
      totalSQ += item.length * item.height;
    });
    useProject.updateTotalLength({ index: props.index, value: totalM / 100 });
    useProject.updateTotalSQ({ index: props.index, value: totalSQ / 10000 });
  },
  { deep: true }
);
</script>
<template>
  <div class="flex flex-col justify-center gap-4">
    <div class="flex flex-wrap justify-center gap-4">
      <BaseButton
        name="prideti nauja"
        @click="useProject.addMeasure(props.index)"
      />
      <BaseButton
        name="nukopijuoti paskutinį"
        @click="useProject.copyLast(props.index)"
      />
      <BaseButton
        v-if="!open"
        name="išskaičiuoti pagal ilgį"
        @click="open = !open"
      />

      <div v-else="open" class="flex overflow-hidden border rounded-lg">
        <input
          placeholder="Bendras Ilgis"
          type="number"
          class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
          v-model="totalLength"
          :autofocus="open"
          @keydown.enter="calculateLengthHandler"
        />
        <button
          class="w-12 text-white bg-dark-full hover:bg-red-full hover:cursor-pointer"
          @click="calculateLengthHandler"
        >
          OK
        </button>
        <button
          class="w-12 text-white border-l bg-dark-full hover:bg-red-full hover:cursor-pointer"
          @click="cancelHandler"
        >
          X
        </button>
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-4">
      <BaseButton
        name="įterpti kampą"
        @click="useProject.addKampas(props.index)"
      />
      <BaseButton
        name="įterpti laiptą"
        @click="useProject.addLaiptas(props.index)"
      />
      <BaseButton
        name="išvalyti visus"
        @click="useProject.deleteMeasures(props.index)"
      />
    </div>
  </div>
  <div class="flex flex-wrap justify-center gap-4">
    <p>Bendras Ilgis: {{ useProject.fences[props.index].totalLength }} m</p>
    <p class="flex">
      Kvadratiniai metrai: {{ useProject.fences[props.index].totalSQ }} m<span
        class="text-[10px] font-semibold"
        >2</span
      >
    </p>
  </div>

  <div class="flex flex-col gap-4">
    <div
      v-if="useProject.fences[props.index].measures.length > 0"
      class="grid gap-2 py-3 rounded-t-xl custom-grid bg-gray-ultra-light"
    >
      <p class="m-auto">Nr</p>
      <p class="m-auto">ilgis</p>
      <p class="m-auto">aukštis</p>
      <p class="m-auto">vartai</p>
      <p class="m-auto">veiksmai</p>
    </div>

    <div
      v-for="(measure, measureIndex) in useProject.fences[props.index].measures"
    >
      <div
        v-if="!measure.kampas.exist && !measure.laiptas.exist"
        class="grid items-center gap-2 custom-grid"
      >
        <p class="m-auto">{{ measureIndex + 1 }}</p>

        <BaseInput
          width="w-24"
          placeholder="Ilgis"
          type="number"
          variant="light"
          :name="measure.length"
          @EnterPressed="useProject.addMeasure(props.index)"
          @onChange="
            (value) =>
              useProject.updateMeasureLength({
                index: props.index,
                value,
                measureIndex,
              })
          "
          :active="true"
        />

        <BaseInput
          width="w-24"
          placeholder="Aukštis"
          type="number"
          variant="light"
          :name="measure.height"
          @EnterPressed="useProject.addMeasure(props.index)"
          @onChange="
            (value) =>
              useProject.updateMeasureHeight({
                index: props.index,
                value,
                measureIndex,
              })
          "
        />

        <BaseCheckField
          class="m-auto"
          @onChange="
            (value) =>
              useProject.updateMeasureGate({
                index: props.index,
                value,
                measureIndex,
              })
          "
        />

        <div
          @click="
            useProject.deleteMeasure({ index: props.index, measureIndex })
          "
          class="flex items-center justify-center gap-2 px-2 py-1 border rounded-md hover:cursor-pointer"
        >
          <NuxtImg src="/icons/delete.svg" width="20" />
          delete
        </div>
      </div>

      <div
        v-else-if="measure.kampas.exist"
        class="grid items-center gap-2 custom-grid"
      >
        <p class="m-auto">{{ measureIndex + 1 }}</p>
        <p>Kampas</p>
        <BaseInput
          width="w-24"
          placeholder="Laipsnis"
          type="number"
          :name="measure.kampas.value"
          @onChange="
            (value) =>
              useProject.updateMeasureKampas({
                index: props.index,
                value,
                measureIndex,
              })
          "
        />
        <div></div>
        <div
          @click="
            useProject.deleteMeasure({ index: props.index, measureIndex })
          "
          class="flex items-center justify-center gap-2 px-2 py-1 border rounded-md hover:cursor-pointer"
        >
          <NuxtImg src="/icons/delete.svg" width="20" />
          delete
        </div>
      </div>

      <div
        v-else-if="measure.laiptas.exist"
        class="grid items-center gap-2 custom-grid"
      >
        <p class="m-auto">{{ measureIndex + 1 }}</p>
        <p>Laiptas</p>
        <BaseInput
          width="w-24"
          placeholder="Aukštis"
          type="number"
          :name="measure.laiptas.value"
          @onChange="
            (value) =>
              useProject.updateMeasureLaiptas({
                index: props.index,
                value,
                measureIndex,
              })
          "
        />
        <div></div>
        <div
          @click="
            useProject.deleteMeasure({ index: props.index, measureIndex })
          "
          class="flex items-center justify-center gap-2 px-2 py-1 border rounded-md hover:cursor-pointer"
        >
          <NuxtImg src="/icons/delete.svg" width="20" />
          delete
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-grid {
  grid-template-columns: 50px 100px 100px 90px 90px 90px;

  @media (max-width: 600px) {
    grid-template-columns: 50px 100px 100px;
  }
}
</style>
