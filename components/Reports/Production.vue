<script setup lang="ts">
const MONTHS = [
  "Visi",
  "Sausis",
  "Vasaris",
  "Kovas",
  "Balandis",
  "Gegužė",
  "Birželis",
  "Liepa",
  "Rugpjūtis",
  "Rugsėjis",
  "Spalis",
  "Lapkritis",
  "Gruodis",
];

const MACHINES = [
  "Visi",
  "Pjovimo staklės",
  "Lenkimo staklės 1",
  "Lenkimo staklės 2",
  "Skylučių mušimo staklės",
];

const { setError, setSuccess } = useCustomError();
const userStore = useUserStore();

const data = ref<any[]>([]);
const totalData = ref<any>({});
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const range = ref();
const calendarOpen = ref(false);

const filters = reactive({
  user: "Visi",
  machine: "Visi",
  year: currentYear.toString(),
  month: MONTHS[currentDate.getMonth() + 1],
  day: currentDate.getDate().toString(),
  search: "",
  weekStart: "",
  weekEnd: "",
});

let timeout: any;

const YEARS = computed(() => {
  const years = ["Visi"];
  for (let i = 0; i < 5; i++) years.push((currentYear - i).toString());
  return years;
});

const DAYS = computed(() => {
  if (filters.month === "Visi")
    return ["Visi", ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())];

  const monthIndex = MONTHS.indexOf(filters.month);
  const year = Number(filters.year) || currentYear;
  const daysInMonth = new Date(year, monthIndex, 0).getDate();

  return ["Visi", ...Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString())];
});

const users = computed(() => [
  {
    label: "Visi",
    email: "Visi",
  },
  ...userStore.users
    .filter((user) => user.accountType === "Gamyba")
    .map((user) => ({
      label: `${user.username} ${user.lastName}`.trim(),
      email: user.email,
    })),
]);

const formatDate = (date: Date) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const selectWeek = () => {
  if (!range.value?.start || !range.value?.end) return;

  filters.weekStart = formatDate(range.value.start);
  filters.weekEnd = formatDate(range.value.end);

  filters.year = "Visi";
  filters.month = "Visi";
  filters.day = "Visi";

  calendarOpen.value = false;
  filterHandler();
};

const filterHandler = async () => {
  const monthIndex = MONTHS.indexOf(filters.month);

  const requestData = {
    user: filters.user,
    machine: filters.machine,
    year: filters.year,
    month: monthIndex === 0 ? "Visi" : monthIndex.toString(),
    day: filters.day,
    search: filters.search,
    weekStart: filters.weekStart,
    weekEnd: filters.weekEnd,
  };

  const response: any = await request.post("getProductionReport", requestData);

  if (response.success) {
    data.value = response.data.data;
    totalData.value = response.data.totalData;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const onUserChange = (label: string) => {
  const selected = users.value.find((user) => user.label === label);
  filters.user = selected?.email ?? "Visi";
  filterHandler();
};

const onMachineChange = (value: string) => {
  filters.machine = value;
  filterHandler();
};

const onYearChange = (value: string) => {
  clearRange();
  filters.year = value;
  filterHandler();
};

const onMonthChange = (value: string) => {
  clearRange();
  filters.month = value;
  if (filters.day !== "Visi") filters.day = "Visi";
  filterHandler();
};

const onDayChange = (value: string) => {
  clearRange();
  filters.day = value;
  filterHandler();
};

const closeHandler = () => {
  calendarOpen.value = false;
  clearRange();
};

const clearRange = () => {
  filters.weekStart = "";
  filters.weekEnd = "";
  range.value = null;
};

watch(
  () => filters.search,
  () => {
    clearTimeout(timeout);
    timeout = setTimeout(filterHandler, 400);
  },
);
</script>

<template>
  <div class="flex flex-col gap-8 w-full rounded-lg">
    <div class="flex gap-4 flex-wrap justify-between">
      <ReportsInfoCardProduction
        name="Lenkimas 1 staklės"
        :data="totalData?.bend?.M1?.bends"
        :target="totalData?.bend?.M1?.goal"
        icon="ruler"
      />
      <ReportsInfoCardProduction
        name="Lenkimas 2 staklės"
        :data="totalData?.bend?.M2?.bends"
        :target="totalData?.bend?.M2?.goal"
        icon="ruler"
      />
      <ReportsInfoCardProduction
        name="Pjovimas"
        :data="totalData?.cut?.meters"
        :target="totalData?.cut?.goal"
        sign="m"
        icon="scissors"
      />
      <ReportsInfoCardProduction
        name="Skylučių Mušimas"
        :data="totalData?.holes?.count"
        :target="totalData?.holes?.goal"
        icon="hole"
      />
      <ReportsInfoCardProduction
        name="Staklių 1 KPI"
        :data="totalData?.kpi?.M1"
        :target="totalData?.bend?.M1?.goal || 0"
        icon="kpi"
      />
      <ReportsInfoCardProduction
        name="Staklių 2 KPI"
        :data="totalData?.kpi?.M2"
        :target="totalData?.bend?.M2?.goal || 0"
        icon="kpi"
      />
      <ReportsDefectCardProduction
        name="Brokas"
        :data="totalData?.defects?.quantity"
        :percentage="totalData?.defects?.percentage"
        :target="totalData?.defects?.target"
        icon="cross"
      />
      <ReportsInfoCardProduction
        name="Gamybos savikaina"
        :data="totalData?.selfCost?.value"
        :target="totalData?.selfCost?.target"
        sign="€"
        icon="cost"
      />
    </div>
    <div class="flex gap-4 p-4 border border-dark-light rounded-lg shadow-lg">
      <BaseInput
        placeholder="Paieška"
        label="Paieška"
        width="flex-1"
        variant="light"
        @onChange="(value: string) => (filters.search = value)"
      />

      <BaseSelectField
        label="Operatorius"
        :values="users.map((user) => user.label)"
        id="userFilter"
        :defaultValue="users.find((user) => user.email === filters.user)?.label ?? 'Visi'"
        width="w-60 "
        @onChange="onUserChange"
      />

      <BaseSelectField
        label="Staklės"
        :values="MACHINES"
        id="machineFilter"
        :defaultValue="filters.machine"
        width="w-60"
        @onChange="onMachineChange"
      />

      <BaseSelectField
        label="Metai"
        :values="YEARS"
        id="years"
        :defaultValue="filters.year"
        width="w-40"
        @onChange="onYearChange"
      />

      <BaseSelectField
        label="Mėnesis"
        :values="MONTHS"
        id="months"
        :defaultValue="filters.month"
        width="w-40"
        @onChange="onMonthChange"
      />

      <BaseSelectField
        label="Diena"
        :values="DAYS"
        id="days"
        :defaultValue="filters.day"
        width="w-40"
        @onChange="onDayChange"
      />

      <div class="relative self-end pb-1 hover:cursor-pointer">
        <div
          @click="calendarOpen = !calendarOpen"
          class="w-8 h-8 hover:scale-125 transition-transform"
        >
          <img src="/icons/calendar.svg" alt="calendar icon" />
        </div>
        <div
          v-if="calendarOpen"
          class="absolute top-8 right-0 z-50 bg-white border border-gray-500 rounded-lg shadow-lg"
        >
          <div class="flex justify-between items-center p-2">
            <img
              @click="selectWeek"
              src="/icons/confirm.svg"
              alt="confirm icon"
              class="hover:scale-125 transition-transform w-6 h-6"
            />
            <img
              @click="closeHandler"
              src="/icons/close.svg"
              alt="close icon"
              class="hover:scale-125 transition-transform"
            />
          </div>
          <VDatePicker v-model.range="range" />
        </div>
      </div>
    </div>

    <div
      class="flex flex-col font-semibold rounded-lg overflow-hidden border border-dark-light shadow-lg"
    >
      <div class="flex gap-4 bg-gray-300 py-2 px-4 items-center">
        <div class="w-8 flex-shrink-0"></div>
        <div class="w-28 flex-shrink-0"></div>
        <div class="w-60 flex-shrink-0 text-center text-lg">Pasirinktos datos:</div>
        <div class="w-60 flex-shrink-0"></div>
        <div class="w-24 flex-shrink-0 text-lg">Viso:</div>
        <div class="w-14 flex-shrink-0">Kiekis</div>
        <div class="w-14 flex-shrink-0">Ilgis</div>
        <div class="w-20 flex-shrink-0">Lenkimai</div>
        <div class="w-28 flex-shrink-0">Išlenkta metrų</div>
        <div class="w-20 flex-shrink-0">Skylutės</div>
      </div>

      <div class="flex gap-4 py-2 px-4 items-center">
        <div class="w-8 flex-shrink-0"></div>
        <div class="w-28 flex-shrink-0"></div>
        <div class="w-60 flex-shrink-0 text-center">
          <div v-if="filters.weekStart && filters.weekEnd">
            {{ filters.weekStart }} = {{ filters.weekEnd }}
          </div>
          <div v-else>{{ filters.year }}-{{ filters.month }}-{{ filters.day }}</div>
        </div>
        <div class="w-60 flex-shrink-0"></div>
        <div class="w-24 flex-shrink-0"></div>
        <div class="w-14 flex-shrink-0">
          {{ totalData?.bend?.total?.quantity }}
        </div>
        <div class="w-14 flex-shrink-0">
          {{
            (totalData?.cut?.meters + +totalData.bend?.total?.meters)?.toFixed(0) === "NaN"
              ? ""
              : (totalData?.cut?.meters + +totalData.bend?.total?.meters)?.toFixed(0)
          }}
        </div>
        <div class="w-20 flex-shrink-0">
          {{ totalData?.bend?.total?.bends }}
        </div>
        <div class="w-28 flex-shrink-0">
          {{ totalData?.bend?.total?.meters?.toFixed(0) }}
        </div>
        <div class="w-20 flex-shrink-0">{{ totalData?.holes?.count }}</div>
      </div>
    </div>

    <div class="flex flex-col overflow-y-scroll h-[70dvh] border rounded-t-lg shadow-lg">
      <div class="flex flex-col">
        <div class="flex p-4 sticky top-0 z-10 bg-gray-300 font-semibold gap-4">
          <div class="w-8 flex-shrink-0">Nr</div>
          <div class="w-28 flex-shrink-0">Užsakymo Nr</div>
          <div class="w-60 flex-shrink-0">Darbuotojas</div>
          <div class="w-60 flex-shrink-0">Staklės</div>
          <div class="w-24 flex-shrink-0">Veiksmas</div>
          <div class="w-14 flex-shrink-0">Kiekis</div>
          <div class="w-14 flex-shrink-0">Ilgis</div>
          <div class="w-20 flex-shrink-0">Lenkimai</div>
          <div class="w-28 flex-shrink-0">Išlenkta metrų</div>
          <div class="w-20 flex-shrink-0">Skylutės</div>
        </div>

        <ReportsProductionResult
          v-for="(item, index) in data"
          :key="`${item.orderNumber}_${item.user.email}_${item.machine}_${item.operation}`"
          :item="item"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
