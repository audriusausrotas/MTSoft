<script setup lang="ts">
import type { User, Montavimas } from "~/data/interfaces";
const useMontavimas = useMontavimasStore();
const useUser = useUserStore();
const filteredUser = ref<string>("Visi");

const workers = useUser.users
  .filter((user: User) => user.accountType === "Montavimas")
  .map((user: User) => user.lastName);

const filteredMontavimas = computed(() => {
  if (
    useUser.user?.accountType === "Administratorius" ||
    useUser.user?.accountType === "Sandėlys"
  ) {
    if (filteredUser.value === "Visi")
      return useMontavimas.filteredMontavimasList;
    else
      return useMontavimas.filteredMontavimasList.filter((item: Montavimas) =>
        item.workers.includes(filteredUser.value)
      );
  } else
    return useMontavimas.filteredMontavimasList.filter((item: Montavimas) =>
      item.workers.includes(useUser.user?.lastName!)
    );
});

const changeFilter = (value: string) => {
  filteredUser.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <BaseSelectField
        v-if="useUser.user?.accountType === 'Administratorius'"
        label="Montuotojas"
        :values="['Visi', ...workers]"
        id="userFilter"
        defaultValue="Visi"
        width="w-60"
        @onChange="(value: string) => changeFilter(value)
      "
      />
      <BaseInput
        placeholder="Paieška"
        width="max-w-[910px] w-full"
        variant="light"
        label="Paieška"
        @onChange="
          (value: string): void => useMontavimas.searchMontavimas(value)
        "
      >
        <NuxtImg
          src="/icons/search.svg"
          width="14"
          height="14"
          alt="search icon"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </BaseInput>
    </div>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="(order, index) in filteredMontavimas"
        :key="order._id"
        :dataIndex="index"
      >
        <MontavimasOrder :order="order" :index="index" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
