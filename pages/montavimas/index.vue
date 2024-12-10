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
    if (filteredUser.value === "Visi") return useMontavimas.montavimasList;
    else
      return useMontavimas.montavimasList.filter((item: Montavimas) =>
        item.workers.includes(filteredUser.value)
      );
  } else
    return useMontavimas.montavimasList.filter((item: Montavimas) =>
      item.workers.includes(useUser.user?.lastName!)
    );
});

const changeFilter = (value: string) => {
  filteredUser.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4">
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
