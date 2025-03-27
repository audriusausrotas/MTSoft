<script setup lang="ts">
import type { User, Montavimas } from "~/data/interfaces";
const useMontavimas = useMontavimasStore();
const useUser = useUserStore();
const filteredUser = ref<string>("Visi");
const searchQuery = ref<string>("");

const workers = useUser.users
  .filter((user: User) => user.accountType === "Montavimas")
  .map((user: User) => user.lastName);

const filteredMontavimas = computed(() => {
  let filtered = [...useMontavimas.montavimasList];

  if (searchQuery.value.length > 2) {
    return filtered.filter(
      (project) =>
        project.client.address
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.client.email
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.client.phone
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.client.username
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        project.orderNumber
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (
    useUser.user?.accountType === "Administratorius" ||
    useUser.user?.accountType === "Sandėlys"
  ) {
    if (filteredUser.value !== "Visi")
      filtered = filtered.filter((item: Montavimas) =>
        item.workers.includes(filteredUser.value)
      );
  } else
    filtered = filtered.filter((item: Montavimas) =>
      item.workers.includes(useUser.user?.lastName!)
    );

  return filtered;
});

const changeFilter = (value: string) => {
  filteredUser.value = value;
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
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
        width="w-full"
        variant="light"
        label="Paieška"
        @onChange="
          (value: string)=> searchQuery = value
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
    <div class="flex flex-wrap gap-4 justify-center">
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
