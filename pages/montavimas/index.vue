<script setup lang="ts">
const useMontavimas = useMontavimasStore();
const useUser = useUserStore();
const filteredUser = ref<string>("Visi");

const workers = useUser.users
  .filter((user) => user.accountType === "Montavimas")
  .map((user) => user.lastName);

const filteredMontavimas = computed(() => {
  if (useUser.user?.accountType === "Administratorius") {
    if (filteredUser.value === "Visi") return useMontavimas.montavimasList;
    else
      return useMontavimas.montavimasList.filter((item) =>
        item.workers.includes(filteredUser.value)
      );
  } else {
    return useMontavimas.montavimasList.filter((item) =>
      item.workers.includes(useUser.user?.lastName!)
    );
  }
});

const changeFilter = (value: string) => {
  filteredUser.value = value;
};
</script>

<template>
  <div class="flex flex-wrap flex-col max-w-96 m-auto gap-4">
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
    <div
      v-for="(order, index) in filteredMontavimas"
      :key="order._id"
      :dataIndex="index"
    >
      <MontavimasOrder :order="order" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
