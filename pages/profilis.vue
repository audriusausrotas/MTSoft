<script setup lang="ts">
import type { ResponseUser } from "~/data/interfaces";

const { setError, setIsError } = useError();
const useUser = useUserStore();
const initials = computed(() => useUser.user?.username.slice(0, 2));
const url = ref<string>("");
const newPassword = ref<string>("");
const password = ref<string>("");
const lastName = ref<string>("");
const phone = ref<string>("");
const isLoading = ref<boolean>(false);


const saveHandler = async () => {
  isLoading.value = true;
  const reqData = {
    url: url.value,
    newPassword: newPassword.value,
    password: password.value,
    lastName: lastName.value,
    phone: phone.value,
  };

  const response: ResponseUser = await $fetch("/api/profile", {
    method: "post",
    body: reqData,
  });

  if (response.success) {
    useUser.setUser(response.data);
    password.value = "";
    newPassword.value = "";
    url.value = "";
    lastName.value = "";
    phone.value = "";
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex border-b py-8 gap-14">
      <div class="flex items-center justify-center overflow-hidden bg-gray-light rounded-xl h-60 w-60">
        <NuxtImg v-if="useUser.user?.photo" :src="useUser.user?.photo" alt="Vartotojo nuotrauka"
          class="object-cover object-center w-full h-full" width="48" height="48" decoding="auto" loading="lazy"
          :ismap="true" />
        <h3 v-else class="text-3xl uppercase">{{ initials }}</h3>
      </div>

      <div class="flex flex-col justify-between capitalize">
        <h3 class="text-4xl font-semibold">
          {{ useUser.user?.username }} {{ useUser.user?.lastName }}
        </h3>
        <div>
          {{ useUser.user?.accountType }}

          <h5 class="font-semibold"></h5>
        </div>

        <h5 class="font-semibold normal-case">{{ useUser.user?.email }}</h5>

        <h5 class="font-semibold normal-case">{{ useUser.user?.phone }}</h5>

      </div>
    </div>



    <div class="flex py-8 border-b gap-14">
      <BaseInput :name="lastName" @onChange="(v) => (lastName = v)" placeholder="Pavardė" label="Pavardė"
        width="w-64" />
      <BaseInput :name="phone" @onChange="(v) => (phone = v)" placeholder="Telefono numeris" label="Telefono numeris"
        width="w-64" />
    </div>
    <div class="flex py-8 border-b gap-14">
      <BaseInput :name="newPassword" type="password" @onChange="(v) => (newPassword = v)"
        placeholder="Naujas slaptažodis" label="Naujas Slaptažodis" width="w-64" />
      <BaseInput :name="password" type="password" @onChange="(v) => (password = v)" placeholder="Pakartoti slaptažodį"
        label="Pakartoti slaptažodį" width="w-64" />
    </div>
    <BaseButton name="išsaugoti pakeitimus" @click="saveHandler" class="my-8" :isLoading="isLoading" />
  </div>
</template>

<style scoped></style>
