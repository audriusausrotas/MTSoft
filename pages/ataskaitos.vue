<script setup lang="ts">
import { statusFilters } from "~/data/selectFieldData";

fetchFinished();

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

const FILTERBY = ["Sukūrimo data", "Patvirtinimo data", "Užbaigimo data"];

const STATUS = ["Visi", "Aktyvus", "Baigtas"];

const projectsStore = useProjectsStore();
const archiveStore = useArchiveStore();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const filters = reactive({
  manager: "Visi",
  year: currentYear.toString(),
  month: MONTHS[currentDate.getMonth() + 1],
  status: "Visi",
  filterBy: "Sukūrimo data",
  search: "",
});

const users = [
  "Visi",
  ...new Set(projectsStore.projects?.map((item) => item.creator.username).filter(Boolean)),
];

const allProjects = computed(() => {
  const filteredProjects = projectsStore.projects.filter(
    (project) =>
      project.status !== "Nepatvirtintas" &&
      project.status !== "Netinkamas" &&
      project.status !== "Tinkamas" &&
      project.status !== "Matavimas",
  );
  return [...filteredProjects, ...archiveStore.data.finished];
});

const filteredProjects = computed(() => {
  let filteredTemp = allProjects.value;

  if (filters.search.length >= 3) {
    return filteredTemp.filter(
      (project) =>
        project.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.client.username.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.client.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.client.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.client.phone.toLowerCase().includes(filters.search.toLowerCase()),
    );
  }

  if (filters.manager.toLowerCase() !== "visi") {
    filteredTemp = filteredTemp.filter((project) => project.creator.username === filters.manager);
  }

  if (filters.status.toLowerCase() === "baigtas") {
    filteredTemp = filteredTemp.filter((project) => project.status.toLowerCase() === "baigtas");
  } else if (filters.status.toLowerCase() === "aktyvus") {
    filteredTemp = filteredTemp.filter((project) => project.status.toLowerCase() !== "baigtas");
  } else if (filters.status.toLowerCase() === "visi") {
  }

  if (filters.year !== "Visi") {
    filteredTemp = filteredTemp.filter((project) => {
      const year =
        filters.filterBy === "Sukūrimo data"
          ? project.dates.dateCreated
          : filters.filterBy === "Patvirtinimo data"
            ? project.dates.dateConfirmed
            : project.dates.dateArchieved;

      return new Date(year).getFullYear() === +filters.year;
    });
  }

  if (filters.month !== "Visi") {
    filteredTemp = filteredTemp.filter((project) => {
      const month =
        filters.filterBy === "Sukūrimo data"
          ? project.dates.dateCreated
          : filters.filterBy === "Patvirtinimo data"
            ? project.dates.dateConfirmed
            : project.dates.dateArchieved;

      return new Date(month).getMonth() + 1 === MONTHS.indexOf(filters.month);
    });
  }

  return filteredTemp;
});

const getYears = computed(() => {
  const years = new Set<string>();

  allProjects.value.forEach((obj) => {
    const year = new Date(obj?.dates?.dateCreated).getFullYear();
    if (!isNaN(year)) years.add(year.toString());
  });

  const allYears = Array.from(years);
  allYears.sort((a: string, b: string) => parseInt(b) - parseInt(a));
  allYears.unshift("Visi");
  return allYears;
});

const financialFiltered = computed(() => {
  const items = filteredProjects.value;

  let revenue = 0;
  let profit = 0;
  let moneyLeft = 0;
  let margin = 0;
  let badInfo = 0;

  for (const item of items) {
    revenue += item.totalPrice || 0;
    profit += item.totalPrice - item.totalCost || 0;
    margin += item.totalMargin || 0;
    moneyLeft += item.status === "Baigtas" ? 0 : item.totalPrice - item.advance;

    if (!item.totalPrice || !item.totalCost) badInfo++;
  }

  return {
    revenue,
    profit,
    moneyLeft,
    margin: margin / (items.length - badInfo) || 0,
  };
});

const financialTotal = computed(() => {
  const items = allProjects.value.filter(
    (p) => new Date(p.dates.dateCreated).getFullYear() === currentYear,
  );
  let revenue = 0;
  let profit = 0;
  let moneyLeft = 0;
  let margin = 0;
  let badInfo = 0;

  for (const item of items) {
    revenue += item.totalPrice || 0;
    profit += item.totalPrice - item.totalCost || 0;
    margin += item.totalMargin || 0;
    moneyLeft += item.status === "Baigtas" ? 0 : item.totalPrice - item.advance;

    if (!item.totalPrice || !item.totalCost) badInfo++;
  }

  return {
    revenue,
    profit,
    moneyLeft,
    margin: margin / (items.length - badInfo) || 0,
  };
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full rounded-lg">
    <div class="flex gap-8">
      <ReportsInfoCard
        name="Apyvarta"
        :filtered="financialFiltered.revenue"
        :total="financialTotal.revenue"
        :extra="`${currentYear} metų apyvarta`"
      />
      <ReportsInfoCard
        name="Pelnas"
        :filtered="financialFiltered.profit"
        :total="financialTotal.profit"
        :extra="`${currentYear} metų pelnas`"
      />
      <ReportsInfoCard
        name="Marža"
        :filtered="financialFiltered.margin"
        :total="financialTotal.margin"
        :extra="`${currentYear} metų marža`"
        sign="%"
      />
      <ReportsInfoCard
        name="Likę atsiskaityti"
        :filtered="financialFiltered.moneyLeft"
        :total="financialTotal.moneyLeft"
        :extra="`${currentYear} metų likutis`"
      />
    </div>

    <div class="flex gap-4 p-4 border rounded-lg shadow-lg">
      <BaseInput
        placeholder="Paieška"
        label="Paieška"
        width="flex-1"
        variant="light"
        @onChange="(value: string) => (filters.search = value)"
      />

      <BaseSelectField
        label="Statusas"
        :values="STATUS"
        id="statusFilter"
        :defaultValue="filters.status"
        width="w-40"
        @onChange="(value: string) => (filters.status = value)"
      />

      <BaseSelectField
        label="Vadybininkas"
        :values="users"
        id="userFilter"
        :defaultValue="filters.manager"
        width="w-40"
        @onChange="(value: string) => (filters.manager = value)"
      />

      <BaseSelectField
        label="Metai"
        :values="FILTERBY"
        id="filterby"
        :defaultValue="filters.filterBy"
        width="w-44"
        @onChange="(value: string) => (filters.filterBy = value)"
      />

      <BaseSelectField
        label="Metai"
        :values="getYears"
        id="years"
        :defaultValue="filters.year"
        width="w-40"
        @onChange="(value: string) => (filters.year = value)"
      />

      <BaseSelectField
        label="Mėnesiai"
        :values="MONTHS"
        id="months"
        :defaultValue="filters.month"
        width="w-40"
        @onChange="(value: string) => (filters.month = value)"
      />
    </div>
    <div class="flex flex-col overflow-y-scroll max-h-[60dvh] border rounded-lg shadow-lg">
      <div class="flex p-4 sticky top-0 z-10 bg-slate-100 font-semibold gap-4">
        <div class="w-8 flex-shrink-0">Nr</div>
        <div class="w-28 flex-shrink-0">Užsakymo Nr</div>
        <div class="w-72 flex-shrink-0">Objekto adresas</div>
        <div class="w-32 flex-shrink-0">Vadybininkas</div>
        <div class="w-32 flex-shrink-0">{{ filters.filterBy }}</div>
        <div class="w-24 flex-shrink-0">Avansas</div>
        <div class="w-24 flex-shrink-0">Likusi suma</div>
        <div class="w-24 flex-shrink-0">Savikaina</div>
        <div class="w-24 flex-shrink-0">Kaina</div>
        <div class="w-24 flex-shrink-0">Pelnas</div>
        <div class="w-16 flex-shrink-0">Marža</div>
      </div>
      <div class="flex flex-col divide-y">
        <ReportsProject
          v-for="(project, index) in filteredProjects"
          :key="project._id"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
