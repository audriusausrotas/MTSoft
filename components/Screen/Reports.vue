<script setup lang="ts">
import { useScreenStore } from "~/store/screen";

const { setError } = useCustomError();
const useScreen = useScreenStore();
const useSettings = useSettingsStore();

const getData = async () => {
  const currentDate = new Date();

  const requestData = {
    user: "Visi",
    machine: "Visi",
    year: currentDate.getFullYear().toString(),
    month: (currentDate.getMonth() + 1).toString(),
    day: currentDate.getDate().toString(),
    search: "",
    weekStart: "",
    weekEnd: "",
  };

  const response: any = await request.post("getProductionReport", requestData);
  if (response.success) {
    const shiftKey = `shift${useScreen.shift}` as "shift1" | "shift2";

    useScreen.setData(
      response.data?.totalData?.cut?.shifts?.[shiftKey]?.meters || 0,
      response.data?.totalData?.holes?.shifts?.[shiftKey]?.count || 0,
      response.data?.totalData?.kpi?.M1?.shifts?.[shiftKey] || 0,
      response.data?.totalData?.kpi?.M2?.shifts?.[shiftKey] || 0,
    );
  } else {
    setError(response.message);
  }
};

const getShift = () => {
  const now = new Date();
  return now.getHours() < 15 ? 1 : 2;
};

const setTargets = (shift: number) => {
  if (shift === 1) {
    useScreen.setTargets(
      useSettings.reportsGeneral.cutGoal1,
      useSettings.reportsGeneral.holesGoal1,
      useSettings.reportsGeneral.bendGoal1M1,
      useSettings.reportsGeneral.bendGoal1M2,
    );
  } else if (shift === 2) {
    useScreen.setTargets(
      useSettings.reportsGeneral.cutGoal2,
      useSettings.reportsGeneral.holesGoal2,
      useSettings.reportsGeneral.bendGoal2M1,
      useSettings.reportsGeneral.bendGoal2M2,
    );
  } else {
    useScreen.setTargets(0, 0, 0, 0);
  }
};

const changeShift = () => {
  const shift = getShift();
  useScreen.setShift(shift);
};

changeShift();
getData();

watch(
  () => useScreen.shift,
  () => {
    setTargets(useScreen.shift);
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex gap-4 w-full h-full justify-center">
    <ReportsInfoCardProduction
      name="Staklių 2 KPI"
      :data="useScreen.M2.current"
      :target="useScreen.M2.target"
      icon="kpi"
    />
    <ReportsInfoCardProduction
      name="Pjovimo staklės"
      :data="useScreen.cut.current"
      :target="useScreen.cut.target"
      icon="scissors"
      sign="m"
    />
    <ReportsInfoCardProduction
      name="Skylučių staklės"
      :data="useScreen.holes.current"
      :target="useScreen.holes.target"
      icon="hole"
    />
    <ReportsInfoCardProduction
      name="Staklių 1 KPI"
      :data="useScreen.M1.current"
      :target="useScreen.M1.target"
      icon="kpi"
    />
  </div>
</template>
<style scoped></style>
