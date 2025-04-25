<script setup lang="ts">
import type { User, Installation } from "~/data/interfaces";
const installationStore = useInstallationStore();
const userStore = useUserStore();
const filteredUser = ref<string>("Visi");
const searchQuery = ref<string>("");

const workers = userStore.users
  .filter((user: User) => user.accountType === "Montavimas")
  .map((user: User) => user.lastName);

const filteredInstallation = computed(() => {
  let filtered = [...installationStore.installation];

  if (searchQuery.value.length > 2) {
    return filtered.filter(
      (project) =>
        project.client.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.client.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.client.phone.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.client.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (
    userStore.user?.accountType === "Administratorius" ||
    userStore.user?.accountType === "Sandėlys"
  ) {
    if (filteredUser.value !== "Visi")
      filtered = filtered.filter((item: Installation) => item.workers.includes(filteredUser.value));
  } else
    filtered = filtered.filter((item: Installation) =>
      item.workers.includes(userStore.user?.lastName!)
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
        v-if="userStore.user?.accountType === 'Administratorius'"
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
      <div v-for="(order, index) in filteredInstallation" :key="order._id" :dataIndex="index">
        <InstallationOrder :order="order" :index="index" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
