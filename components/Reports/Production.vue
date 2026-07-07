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
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

let timeout: any;

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

const filters = reactive({
  user: "Visi",
  machine: "Visi",
  year: currentYear.toString(),
  month: MONTHS[currentDate.getMonth() + 1],
  day: currentDate.getDate().toString(),
  search: "",
});

const YEARS = computed(() => {
  const years = ["Visi"];

  for (let i = 0; i < 5; i++) {
    years.push((currentYear - i).toString());
  }

  return years;
});

const DAYS = computed(() => {
  if (filters.month === "Visi") {
    return ["Visi", ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())];
  }

  const monthIndex = MONTHS.indexOf(filters.month);
  const year = Number(filters.year) || currentYear;
  const daysInMonth = new Date(year, monthIndex, 0).getDate();

  return ["Visi", ...Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString())];
});

const onUserChange = (label: string) => {
  const selected = users.value.find((user) => user.label === label);

  filters.user = selected?.email ?? "Visi";
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
  };

  const response: any = await request.post("getProductionReport", requestData);

  if (response.success) {
    data.value = response.data;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

onMounted(filterHandler);

watch(
  filters,
  () => {
    if (filters.month === "Visi" && filters.day !== "Visi") {
      filters.day = "Visi";
      return;
    }

    if (filters.year === "Visi") {
      if (filters.month !== "Visi" || filters.day !== "Visi") {
        filters.month = "Visi";
        filters.day = "Visi";
        return;
      }
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      filterHandler();
    }, 400);
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<template>
  <div class="flex flex-col gap-4 w-full rounded-lg">
    <div class="flex gap-4 p-4 border rounded-lg shadow-lg">
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
        width="w-60"
        @onChange="onUserChange"
      />

      <BaseSelectField
        label="Staklės"
        :values="MACHINES"
        id="machineFilter"
        :defaultValue="filters.machine"
        width="w-60"
        @onChange="(value: string) => (filters.machine = value)"
      />

      <BaseSelectField
        label="Metai"
        :values="YEARS"
        id="years"
        :defaultValue="filters.year"
        width="w-40"
        @onChange="(value: string) => (filters.year = value)"
      />

      <BaseSelectField
        label="Mėnesis"
        :values="MONTHS"
        id="months"
        :defaultValue="filters.month"
        width="w-40"
        @onChange="(value: string) => (filters.month = value)"
      />

      <BaseSelectField
        label="Diena"
        :values="DAYS"
        id="days"
        :defaultValue="filters.day"
        width="w-40"
        @onChange="(value: string) => (filters.day = value)"
      />
    </div>

    <div class="flex flex-col overflow-y-scroll max-h-[60dvh] border rounded-lg shadow-lg">
      <div class="flex p-4 sticky top-0 z-10 bg-slate-100 font-semibold gap-4">
        <div class="w-8 flex-shrink-0">Nr</div>
        <div class="w-28 flex-shrink-0">Užsakymo Nr</div>
        <div class="w-60 flex-shrink-0">Darbuotojas</div>
        <div class="w-60 flex-shrink-0">Staklės</div>
        <div class="w-24 flex-shrink-0">Veiksmas</div>
        <div class="w-24 flex-shrink-0">Pjovimai</div>
        <div class="w-24 flex-shrink-0">Lenkimai</div>
        <div class="w-24 flex-shrink-0">Skylutės</div>
        <div class="w-24 flex-shrink-0">Ilgis</div>
      </div>

      <ReportsProductionResult
        v-for="(item, index) in data"
        :key="`${item.orderNumber}_${item.user.email}_${item.machine}_${item.operation}`"
        :item="item"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped></style>
