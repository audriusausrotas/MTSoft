<script setup lang="ts">
import type { Bonus } from "~/data/interfaces";
const { setError, setIsError } = useError();
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
const currentDate = new Date();

const bonuses = ref<Bonus[]>([]);
const filteredBonuses = ref<Bonus[]>([]);
const existingYears = ref();
const filterYear = ref<string>("Visi");
const filterMonth = ref<string>(MONTHS[currentDate.getMonth()]);
const bonusSum = ref<number>(0);

const getBonuses = async () => {
  const response = await request.get("getBonus");

  if (response.success) {
    bonuses.value = [...response.data];
    getYears(response.data);
    filterBonuses();
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
getBonuses();

const monthsFilterHandler = (value: string) => {
  filterMonth.value = value;
  filterBonuses();
};

const yearFilterHandler = (value: string) => {
  filterYear.value = value;
  filterBonuses();
};

const getYears = (data: Bonus[]) => {
  const years = new Set();
  data.forEach((obj) => {
    const year = new Date(obj.dateFinished).getFullYear();
    years.add(year);
  });
  const allYears = Array.from(years);
  allYears.unshift("Visi");
  existingYears.value = allYears;
};

const filterBonuses = () => {
  if (filterYear.value === "Visi") {
    if (filterMonth.value === "Visi") {
      filteredBonuses.value = [...bonuses.value];
    } else {
      filteredBonuses.value = bonuses.value.filter(
        (item) => MONTHS[+item.dateFinished.slice(5, 7)] === filterMonth.value
      );
    }
  } else {
    if (filterMonth.value === "Visi") {
      filteredBonuses.value = bonuses.value.filter(
        (item) => +item.dateFinished.slice(0, 4) === +filterYear.value
      );
    } else {
      filteredBonuses.value = bonuses.value.filter(
        (item) =>
          MONTHS[+item.dateFinished.slice(5, 7)] === filterMonth.value &&
          +item.dateFinished.slice(0, 4) === +filterYear.value
      );
    }
  }
  calculateBonuses();
};

const calculateBonuses = () => {
  let sum = 0;

  filteredBonuses.value.forEach((item) => (sum += item.bonus));

  bonusSum.value = sum;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-8 items-end">
      <BaseSelectField
        label="Metai"
        :values="existingYears"
        id="years"
        defaultValue="Visi"
        width="w-60"
        @onChange="(value: string) => yearFilterHandler(value)"
      />

      <BaseSelectField
        label="Mėnesiai"
        :values="MONTHS"
        id="months"
        :defaultValue="filterMonth"
        width="w-60"
        @onChange="(value: string) => monthsFilterHandler(value)"
      />

      <BaseInput label="Viso bonusų:" :name="bonusSum + ' €'" width="w-24" />
    </div>
    <div>
      <div class="flex gap-4 font-medium border-b p-2 rounded-t-xl bg-gray-ultra-light">
        <p class="w-8">Nr</p>
        <p class="flex-1">Adresas</p>
        <p class="w-28">Data</p>
        <p class="w-28">Kaina</p>
        <p class="w-28">Savikaina</p>
        <p class="w-28">Pelnas</p>
        <p class="w-28">Marža</p>
        <p class="w-28">Bonusas</p>
      </div>
      <div
        v-for="(bonus, index) in filteredBonuses"
        :key="index + bonus.price"
        class="flex gap-4 border-b py-1 px-2"
      >
        <p class="w-8">{{ index + 1 }}</p>
        <p class="flex-1">{{ bonus.address }}</p>
        <p class="w-28">{{ bonus.dateFinished.slice(0, 10) }}</p>
        <p class="w-28">{{ bonus.price }} €</p>
        <p class="w-28">{{ bonus.cost }} €</p>
        <p class="w-28">{{ bonus.profit }} €</p>
        <p class="w-28">{{ bonus.margin }} %</p>
        <p class="w-28">{{ bonus.bonus }} €</p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
